import { Button } from "../component/Button"
import { useExamStore } from "../component/StoreUtils"
import { useUtils } from "../component/useUtils";

export const Result = () => {
	const [exam] = useExamStore();
	const { millisToTimeString } = useUtils();

	let corr = 0;
	let nocorr = 0;
	let totalTime = 0;
	let i = 1;
	exam.forEach(e => {
		if (e.result === e.rightResult) {
			corr++
		} else {
			nocorr++;
		}
		totalTime += e.time;
		e.order = i++;
	})
	const sortedExamByTime = exam.toSorted((a, b) => a.time - b.time);

	const goToWelcome = () => {
		window.location.hash = '#welcome';
	}

	return <>
		<h2>Results</h2>
		<table class='result-table'>
			<tr><th>Exam</th><th>Result</th><th>Time</th></tr>
			{exam.map(e => <tr><td>{e.firstOperand} {e.operator?.symbol} {e.secondOperand} = {e.result} </td><td>{e.result === e.rightResult ? '✅️' : '❌ (' + e.rightResult + ')'}</td><td>{millisToTimeString(e.time)}</td></tr>)}
		</table>
		{/* { corr + ' - ✅️ :: ' + nocorr + ' - ❌ :: total time - ' + millisToTimeString(totalTime)} */}
		<div>✅️: {corr}</div>
		<div>❌: {nocorr}</div>
		<div>Total time: {millisToTimeString(totalTime)}</div>
		<div>Average time: {millisToTimeString(totalTime / exam.length)}</div>
		<div>&nbsp;</div>
		<h2>Slowest</h2>
		<table class='result-table'>
			<tr><th>Time</th><th>Order</th><th>Exam</th></tr>
			{sortedExamByTime.slice(sortedExamByTime.length - 3).reverse().map(e => <tr><td>{millisToTimeString(e.time)}</td><td>{e.order}</td><td>{e.firstOperand} {e.operator?.symbol} {e.secondOperand} = {e.result}</td></tr>)}
		</table>
		<div>&nbsp;</div>
		<h2>Fastest</h2>
		<table class='result-table'>
			<tr><th>Time</th><th>Order</th><th>Exam</th></tr>
			{sortedExamByTime.slice(0, 3).map(e => <tr><td>{millisToTimeString(e.time)}</td><td>{e.order}</td><td>{e.firstOperand} {e.operator?.symbol} {e.secondOperand} = {e.result}</td></tr>)}
		</table>
		<Button text="New examination" action={goToWelcome} />
	</>
}
