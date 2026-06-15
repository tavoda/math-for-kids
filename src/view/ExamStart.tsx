import { useEffect } from "preact/hooks";
import { Button } from "../component/Button"
import { useHash } from "../component/HashRouter";
import { useConfigStore, useExamStore, useSelectedConfig } from "../component/StoreUtils"
import { useUtils } from "../component/useUtils";
import { TypingDirection } from "../Types";

export const ExamStart = () => {
	const [config] = useConfigStore();
	const [, setSelectedConfig] = useSelectedConfig();
	const [, setExamStore] = useExamStore();
	const { generateExam } = useUtils();

	const { hash } = useHash();
	const hashPattern = /#start\/([0-9]+)/g;
	const match = hashPattern.exec(hash);
	const selectedConfig = match && match[1] && config[Number(match[1])] || null;


	useEffect(() => {
		if (selectedConfig) {
			setSelectedConfig(selectedConfig)
			setExamStore(generateExam(selectedConfig));
		} else {
			console.warn('Error generating exam: no configuration provided match=', match);
		}
	}, []);

	return !selectedConfig
		? <div>No configuration provided</div>
		: <>
			<h2>Controls</h2>
			<table>
				<tr><th>Shortcut</th><th>Function</th></tr>
				<tr><td>0-9</td><td>Type number to result</td></tr>
				<tr><td>Page Up, Arrow Up</td><td>Previous question</td></tr>
				<tr><td>Page Down, Arrow Down</td><td>Next question</td></tr>
				<tr><td>Arrow left</td><td>Move cursor left</td></tr>
				<tr><td>Arrow right</td><td>Move cursor right</td></tr>
				<tr><td>e</td><td>Erase result and start over</td></tr>
				<tr><td>Backspace, Del</td><td>Return back one place</td></tr>
			</table>
			<h2>Informations</h2>
			<div>
				Test with {selectedConfig.excercises} question is prepared.<br />
				Type direction is {selectedConfig.direction === TypingDirection.LtoR ? 'Left -> Right' : 'Right -> Left (inverse)'}.<br />
				Prepare, focus and press 'Start' button. Good luck!
			</div>
			<div>
				<Button text="Start" action={() => { window.location.hash = '#excercise' }} />
			</div>
		</>
}
