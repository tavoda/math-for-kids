import { Button } from "../component/Button"
import type { MathForKids } from "../Types";
import { useExamStore, useSelectedConfig } from "../component/StoreUtils";
import { useUtils } from "../component/useUtils";

export const ExamEnd = () => {
	const [exam] = useExamStore();
	const [selectedConfig, setSelectedConfig] = useSelectedConfig();
	const { millisToTimeString } = useUtils();

	if (selectedConfig === null) {
		window.location.hash = '#result'
		return <></>;
	}

	const goToResult = () => {
		setSelectedConfig(null as unknown as MathForKids.BasicMathSettings);
		window.location.hash = '#result';
	}

	return <>
		<h2>Results</h2>
		<table class='result-table'>
			<thead>
				<tr><th>Exam</th><th>Time</th></tr>
			</thead>
			<tbody>
				{exam.map(e => <tr><td>{e.firstOperand} {e.operator?.symbol} {e.secondOperand} = {e.result} </td><td>{millisToTimeString(e.time)}</td></tr>)}
			</tbody>
		</table>
		<Button text="◀️ Back to exam" action={() => { window.location.hash = '#excercise' }} />
		<Button text="End examination ▶️" action={goToResult} />
	</>
}
