import { useEffect } from "preact/hooks";
import { Button } from "../component/Button"
import { useRouter } from "../component/ReactRouter";
import { useExamStore, useSelectedConfig } from "../component/StoreUtils"
import { useUtils } from "../component/useUtils";
import { TypingDirection } from "../Types";
import { useConfig } from "../component/ConfigUtils";
import { useTranslation, Trans } from 'react-i18next';

export const ExamStart = () => {
	const { t } = useTranslation()
	const [, setSelectedConfig] = useSelectedConfig();
	const [, setExamStore] = useExamStore();
	const { generateExam } = useUtils();
	const {getConfig} = useConfig();

	const { path } = useRouter();
	const hashPattern = /#start\/([0-9]+)/g;
	const match = hashPattern.exec(path);
	const config = getConfig();
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
		? <div>{t('noConfigurationProvided', 'No configuration provided')}</div>
		: <>
			<h2>{t('controls', 'Controls')}</h2>
			<table>
				<thead>
					<tr><th>{t('shortcut', 'Shortcut')}</th><th>{t('function', 'Function')}</th></tr>
				</thead>
				<tbody>
					<tr><td>0-9</td><td>{t('typeNumberToResult', 'Type number to result')}</td></tr>
					<tr><td>{t('pageUpArrowUp', 'Page Up, Arrow Up')}</td><td>{t('previousQuestion', 'Previous question')}</td></tr>
					<tr><td>{t('pageDownArrowDown', 'Page Down, Arrow Down')}</td><td>{t('nextQuestion', 'Next question')}</td></tr>
					<tr><td>{t('arrowLeft', 'Arrow left')}</td><td>{t('moveCursorLeft', 'Move cursor left')}</td></tr>
					<tr><td>{t('arrowRight', 'Arrow right')}</td><td>{t('moveCursorRight', 'Move cursor right')}</td></tr>
					<tr><td>e</td><td>{t('eraseResult', 'Erase result and start over')}</td></tr>
					<tr><td>{t('backspaceDel', 'Backspace, Del')}</td><td>{t('returnBackOnePlace', 'Return back one place')}</td></tr>
				</tbody>
			</table>
			<h2>{t('informations', 'Informations')}</h2>
			<div>
				<Trans i18nKey="excerciseConfig">Test with {{ excercises: selectedConfig.excercises }} question is prepared.<br />Type direction is</Trans>&nbsp;
				{selectedConfig.direction === TypingDirection.LtoR ? t('leftRight', 'Left -> Right') : t('rightLeft', 'Right -> Left (inverse, easy for calculation)')}.<br />
				{selectedConfig.limitTotalTime && selectedConfig.limitTotalTime !== '00:00'
					? <span>
						<Trans i18nKey="timeLimit">You have time limit {{ limitTotalTime: selectedConfig.limitTotalTime }} for solving all questions.</Trans><br/>
					</span>
					: <></>}
				{t('pressStart', 'Prepare, focus and press \'Start\' button. Good luck!')}
			</div>
			<div>
				<Button text={t('start', 'Start')} action={() => { window.location.hash = '#excercise' }} />
			</div>
		</>
}
