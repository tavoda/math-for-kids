import { useEffect } from "preact/hooks";
import { Button } from "../component/Button"
import { useExamStore } from "../component/StoreUtils"
import { useConfig } from "../component/ConfigUtils";

export const Welcome = () => {
	const [, setExam] = useExamStore();
	const { getConfig } = useConfig();

	useEffect(() => {
		setExam([]);
	}, []);

	const startExcercise = (i: number) => {
		window.location.hash = `#start/${i}`
	}

	const manageExcercise = () => {
		window.location.hash = `#config-manage`
	}

	return <>
		<h1>Welcome</h1>
		<div>Basic math testing application. Choose exam level:</div>
		<div class='grid grid-cols-1 gap-4'>
			{getConfig().map((c, i) => {
				return <Button text={`${c.name} (${c.excercises}: ${c.firstOperandRangeMin}..${c.firstOperandRangeMax} ${c.operators} ${c.secondOperandRangeMin}..${c.secondOperandRangeMax})`} action={() => startExcercise(i)} />
			})}
		</div>
		<div class='absolute bottom-5'>
			<Button type='teal' action={() => manageExcercise()}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
					<path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
				</svg>

			</Button>
		</div>
	</>
}
