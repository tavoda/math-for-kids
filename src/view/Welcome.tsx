import { useEffect } from "preact/hooks";
import { Button } from "../component/Button"
import { useExamStore } from "../component/StoreUtils"
import { config } from "../config"

export const Welcome = () => {
	const [, setExam] = useExamStore();

	useEffect(() => {
		setExam([]);
	})

	const startExcercise = (i: number) => {
		window.location.hash = `#start/${i}`
	}

	return <>
		<h2>Welcome</h2>
		<div>Welcome to basic math testing application</div>
		{config.map((c, i) => {
			return <Button text={c.name} action={() => startExcercise(i)}/>
		})}
	</>
}
