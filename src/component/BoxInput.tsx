import { useEffect, useRef, useState } from 'preact/hooks';
import { TypingDirection } from '../Types';

export const BoxInput = (props: {
	value: number,
	setValue: (v: number) => void,
	excercise: number,
	direction: TypingDirection,
	positions: number,
	nextExcercise: () => void,
	prevExcercise: () => void
}) => {
	const [position, setPosition] = useState(props.direction === TypingDirection.LtoR ? 0 : props.positions - 1);
	const [_, setRefresh] = useState(0);
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
			} else if (e.key === 'PageDown' || e.key === 'ArrowDown') {
				props.nextExcercise();
			} else if (e.key === 'PageUp' || e.key === 'ArrowUp') {
				props.prevExcercise();
			} else if (e.key === 'x') {
				setPosition(_ => {
					numbers.current.fill(0);
					invokeSet();
					return props.direction === TypingDirection.LtoR ? 0 : props.positions - 1;
				});
			} else {
				console.log('Event key:' + e.key);
			}
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

	return <>
		{renderRow(props.positions)}
	</>
}