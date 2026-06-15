import { useEffect, useState } from 'preact/hooks';
import { BoxInput } from '../component/BoxInput';
import { Button } from '../component/Button';
import { type OperatorSpec } from '../Types';
import { useUtils } from '../component/useUtils';
import { useExamStore, useSelectedConfig } from '../component/StoreUtils';

export const Examination = () => {
	const [exam] = useExamStore();
	const [selectedConfig] = useSelectedConfig();
	const [excercise, setExcercise] = useState(0);
	const [, setStart] = useState(Date.now());
	const { millisToTimeString } = useUtils();
	const [time, setTime] = useState('00:00');
	const maxPlaces = (selectedConfig.firstOperandRangeMax + selectedConfig.secondOperandRangeMax).toString().length;

	useEffect(() => {
		const interval = setInterval(() => {
			setExcercise(ex => {
				const e = exam[ex];
				setStart(s => {
					e.time = Date.now() - s;
					const newTime = millisToTimeString(e.time);
					setTime(c => c !== newTime ? newTime : c);
					return s;
				})
				return ex;
			})
		}, 200)

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (exam.length > 0) {
			const newStart = Date.now() - exam[excercise].time;
			setStart(newStart);
		}
	}, [exam, excercise]);

	if (exam.length === 0) {
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
	const ex = exam[excercise];

	const next = () => {
		setExcercise(e => {
			if (e === exam.length - 1) {
				window.location.hash = '#end'
			}
			return e < exam.length - 1 ? e + 1 : e;
		})
	}

	const prev = () => {
		setExcercise(e => e > 0 ? e - 1 : e)
	}
	const setResult = (newValue: number) => {
		setExcercise(e => { exam[e].result = newValue; return e })
	}

	return exam && <>
		<div class='header' style={{ flexDirection: 'column' }}>
			{/* <Button text='< Prev' action={prev}/><Button text='Next >' action={next}/> */}
			<div>{excercise + 1} / {selectedConfig.excercises}</div>
			{selectedConfig.showTime && <div>{time}</div>}
		</div>
		<div class='formula'>
			{renderRow(maxPlaces, undefined, ex.firstOperand)}
			{renderRow(maxPlaces, ex.operator, ex.secondOperand)}
			<hr class='underscore' />
			<BoxInput value={ex.result} setValue={setResult} excercise={excercise} positions={maxPlaces} direction={selectedConfig.direction} nextExcercise={next} prevExcercise={prev} />
		</div>
		<div class='footer'>
			<Button text='< Prev' action={prev} /><Button text='Next >' action={next} />
		</div>
	</>
}