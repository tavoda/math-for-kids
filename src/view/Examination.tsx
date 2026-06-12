import { useEffect, useState } from 'preact/hooks';
import { BoxInput } from '../component/BoxInput';
import { Button } from '../component/Button';
import { OperatorDef, type MathForKids, type OperatorSpec } from '../Types';

export const Examination = (settings: MathForKids.BasicMathSettings) => {
	const maxPlaces = (settings.firstOperandRangeMax + settings.secondOperandRangeMax).toString().length;
	const [sums, setSums] = useState<Array<MathForKids.Excercise>>([]);
	const [excercise, setExcercise] = useState(0);
	const [_, setStart] = useState(Date.now());
	const [time, setTime] = useState('00:00');
	const numInRange = (fromInclusive: number, toInclusive: number) => {
		return Math.floor(Math.random() * (toInclusive - fromInclusive + 1) + fromInclusive);
	}

	const msToTime = (duration: number): string => {
		const seconds = Math.floor((duration / 1000) % 60);
		const minutes = Math.floor((duration / (1000 * 60)) % 60);
		return ((minutes < 10) ? "0" + minutes : minutes) + ":" + ((seconds < 10) ? "0" + seconds : seconds);
	}

	useEffect(() => {
		const pSums = new Array<MathForKids.Excercise>();
		// const operatorsKeys = Object.keys(settings.operators);
		for (let i = 0; i < settings.excercises; i++) {
			let newSum: MathForKids.Excercise = null;
			let repeat = false;
			let gen = 0;
			do {
				newSum = {
					firstOperand: numInRange(settings.firstOperandRangeMin, settings.firstOperandRangeMax),
					secondOperand: numInRange(settings.secondOperandRangeMin, settings.secondOperandRangeMax),
					operator: OperatorDef.get(settings.operators[Math.floor(Math.random() * settings.operators.length)]),
					rightResult: Number.NaN,
					result: 0,
					time: 0,
					correct: null
				};
				repeat = false;
				for (let o of pSums) {
					if (o.firstOperand === newSum.firstOperand
						&& o.secondOperand === newSum.secondOperand
						&& o.operator === newSum.operator
					|| o.firstOperand === newSum.secondOperand
						&& o.secondOperand === newSum.firstOperand
						&& o.operator === newSum.operator) {
							console.log("Same equation " + newSum.firstOperand + " " + newSum.operator.symbol + " " + newSum.secondOperand);
						repeat = true;
						break;
					}
				}
				gen++;
			} while (repeat && gen < 5);
			if (newSum.operator) {
				newSum.rightResult = newSum.operator.calc(newSum.firstOperand, newSum.secondOperand);
			}
			pSums.push(newSum);
		}
		setSums(pSums);

		const interval = setInterval(() => {
			setExcercise(ex => {
				const e = pSums[ex];
				setStart(s => {
					e.time = Date.now() - s;
					const newTime = msToTime(e.time);
					setTime(c => c !== newTime ? newTime : c);
					return s;
				})
				return ex;
			})
		}, 200)

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (sums.length > 0) {
			const newStart = Date.now() - sums[excercise].time;
			setStart(newStart);
		}
	}, [sums, excercise]);

	if (sums.length === 0) {
		return;
	}

	const renderRow = (places: number, operator: OperatorSpec | undefined, value: number) => {
		const strValue = value.toString();
		const subStart = places - strValue.length;
		return <div class='num-row'>
			<div class='operator'>{operator ? operator.symbol : ''}</div>
			{
				[...Array(places).keys()].map(n => {
					return <div key={n} class='num'>{n < subStart ? '' : strValue.substring(n - subStart, n - subStart + 1)}</div>
				})
			}
		</div>
	}
	const ex = sums[excercise];

	const next = () => {
		setExcercise(e => e < sums.length - 1 ? e + 1 : e)
	}

	const prev = () => {
		setExcercise(e => e > 0 ? e - 1 : e)
	}
	const setResult = (newValue: number) => {
		setExcercise(e => { sums[e].result = newValue; return e })
	}

	return sums && <>
		<div class='header' style={{ flexDirection: 'column' }}>
			{/* <Button text='< Prev' action={prev}/><Button text='Next >' action={next}/> */}
			<div>{excercise + 1} / {settings.excercises}</div>
			{settings.showTime && <div>{time}</div>}
		</div>
		<div class='formula'>
			{renderRow(maxPlaces, undefined, ex.firstOperand)}
			{renderRow(maxPlaces, ex.operator, ex.secondOperand)}
			<hr class='underscore' />
			<BoxInput value={ex.result} setValue={setResult} excercise={excercise} positions={maxPlaces} direction={settings.direction} nextExcercise={next} prevExcercise={prev} />
		</div>
		<div class='footer'>
			<Button text='< Prev' action={prev} /><Button text='Next >' action={next} />
		</div>
	</>
}