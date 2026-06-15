import { Button } from "../component/Button"
import { useExamStore } from "../component/StoreUtils"
import { useUtils } from "../component/useUtils";

export const Result = () => {
	const [exam] = useExamStore();
	const { millisToTimeString } = useUtils();

	let corr = 0;
	let nocorr = 0;
	let totalTime = 0;
	exam.forEach(e => {
		if (e.result === e.rightResult) {
			corr++
		} else {
			nocorr++;
		}
		totalTime += e.time;
	})
	const sortedExamByTime = exam.toSorted((a, b) => a.time - b.time);

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
		<h2>Statistics</h2>
		<h4>Slowest</h4>
		{sortedExamByTime.slice(sortedExamByTime.length - 3).reverse().map(e => <div>{millisToTimeString(e.time)}: {e.firstOperand} {e.operator?.symbol} {e.secondOperand} = {e.result}</div>)}
		<h4>Fastest</h4>
		{sortedExamByTime.slice(0, 3).map(e => <div>{millisToTimeString(e.time)}: {e.firstOperand} {e.operator?.symbol} {e.secondOperand} = {e.result}</div>)}
		<Button text="New examination" action={() => { window.location.hash = '#' }} />
	</>
}
