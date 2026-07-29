import { useEffect, useRef, useState } from 'preact/hooks';
import { TypingDirection } from '../Types';
import { Button } from './Button';

export const BoxInput = (props: {
	value: number,
	setValue: (v: number) => void,
	excercise: number,
	direction: TypingDirection,
	positions: number,
	automaticStepForward: boolean,
	nextExcercise: () => void,
	prevExcercise: () => void
}) => {
	const [position, setPosition] = useState(props.direction === TypingDirection.LtoR ? 0 : props.positions - 1);
	const [_, setRefresh] = useState(0);
	const [showKeypad, setShowKeypad] = useState(false);
	const numbers = useRef(new Array(props.positions).fill(0));

	const refresh = () => {
		setRefresh(r => r + 1)
	}

	useEffect(() => {
		if (Number.isInteger(props.value)) {
			numbers.current.fill(0);
			const strValue = props.value.toString();
			const startFrom = props.positions - strValue.length;
			for (let i = startFrom; i < props.positions; i++) {
				numbers.current[i] = strValue.substring(i - startFrom, i - startFrom + 1);
			}
			setPosition(props.direction === TypingDirection.LtoR ? 0 : props.positions - 1);
			refresh();
		}
	}, [props.excercise])

	const invokeSet = () => {
		const newValue = Number(numbers.current.join(""));
		props.setValue && props.setValue(newValue);
	}

	const moveCursor = (i: number, direction: TypingDirection) => {
		let newP = i + (direction === TypingDirection.LtoR ? 1 : -1);
		if (newP < 0) {
			newP = 0;
		} else if (newP >= props.positions - 1) {
			newP = props.positions - 1;
		}
		return newP;
	}

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			const n = e.key === 'Space' ? 0 : Number(e.key);
			if (Number.isInteger(n)) {
				setPosition(p => {
					numbers.current[p] = n;
					invokeSet();
					if (props.automaticStepForward && (props.direction === TypingDirection.LtoR && p + 1 === numbers.current.length || p === 0)) {
						props.nextExcercise();
					}
					return moveCursor(p, props.direction);
				});
			} else if (e.key === 'Backspace' || e.key === 'Delete') {
				setPosition(p => moveCursor(p, props.direction === TypingDirection.LtoR ? TypingDirection.RtoL : TypingDirection.LtoR));
			} else if (e.key === 'ArrowLeft') {
				setPosition(p => moveCursor(p, TypingDirection.RtoL));
			} else if (e.key === 'ArrowRight') {
				setPosition(p => moveCursor(p, TypingDirection.LtoR));
			} else if (e.key === 'Home') {
				setPosition(_ => props.direction === TypingDirection.LtoR ? 0 : props.positions - 1);
			} else if (e.key === 'End') {
				setPosition(_ => props.direction === TypingDirection.LtoR ? props.positions - 1 : 0);
			} else if (e.key === 'PageDown' || e.key === 'ArrowDown' || e.key === 'Enter' || (e.key === 'Tab' && !e.shiftKey)) {
				props.nextExcercise();
			} else if (e.key === 'PageUp' || e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
				props.prevExcercise();
			} else if (e.key === 'e' || e.key === 'x') {
				erase();
			} else if (e.key === 'k') {
				setShowKeypad(o => !o);
			} else {
				console.log('Event key:' + e.key);
			}
			e.preventDefault();
			refresh();
		};
		document.addEventListener('keydown', handleKey);

		// Cleanup event listener when the component unmounts
		return () => {
			document.removeEventListener('keydown', handleKey);
		};
	}, []);

	const renderRow = (positions: number, itemClass: string = 'result') => {
		return <div class='num-row'>
			<div class='operator'>&nbsp;</div>
			{
				[...Array(positions).keys()].map(n => {
					return <div key={n} class={itemClass + (n === position ? '-underscore' : '')}>{numbers.current[n]}</div>
				})
			}
		</div>
	}

	const press = (key: number) => {
		setPosition(p => {
			numbers.current[p] = key;
			invokeSet();
			if (props.automaticStepForward && (props.direction === TypingDirection.LtoR && p + 1 === numbers.current.length || p === 0)) {
				props.nextExcercise();
			}
			return moveCursor(p, props.direction);
		});
	}

	const erase = () => {
		setPosition(_ => {
			numbers.current.fill(0);
			invokeSet();
			return props.direction === TypingDirection.LtoR ? 0 : props.positions - 1;
		});
	}

	console.log('KEYPAD: ' + showKeypad);
	return <div>
		{renderRow(props.positions)}
			{'' + showKeypad}
		{showKeypad && <div class='keypad'>
			<div class='keypad-row'>
				<Button text='1' action={() => press(1)} />
				<Button text='2' action={() => press(2)} />
				<Button text='3' action={() => press(3)} />
			</div>
			<div class='keypad-row'>
				<Button text='4' action={() => press(4)} />
				<Button text='5' action={() => press(5)} />
				<Button text='6' action={() => press(6)} />
			</div>
			<div class='keypad-row'>
				<Button text='7' action={() => press(7)} />
				<Button text='8' action={() => press(8)} />
				<Button text='9' action={() => press(9)} />
			</div>
			<div class='keypad-row'>
				<Button text='C' classPostfix='grow' action={erase} />
				<Button text='0' action={() => press(0)} />
			</div>
		</div>
		}
	</div>
}