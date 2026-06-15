import { Button } from "../component/Button"
import { useExamStore } from "../component/StoreUtils";
import { useUtils } from "../component/useUtils";

export const ExamEnd = () => {
	const [exam] = useExamStore();
	const { millisToTimeString } = useUtils();

	return <>
		<h2>Results</h2>
		<table class='result-table'>
			<tr><th>Exam</th><th>Time</th></tr>
			{exam.map(e => <tr><td>{e.firstOperand} {e.operator?.symbol} {e.secondOperand} = {e.result} </td><td>{millisToTimeString(e.time)}</td></tr>)}
		</table>
		<Button text="Back to exam" action={() => { window.location.hash = '#excercise' }} />
		<Button text="End examination" action={() => { window.location.hash = '#result' }} />
	</>
}
