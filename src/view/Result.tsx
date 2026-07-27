import { Button } from "../component/Button"
import { useExamStore } from "../component/StoreUtils"
import { useUtils } from "../component/useUtils";
import { useTranslation } from 'react-i18next';

export const Result = () => {
	const { t } = useTranslation()
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
		<h2>{t('results', 'Results')}</h2>
		<table class='result-table'>
			<thead>
				<tr><th>{t('exam', 'Exam')}</th><th>{t('rightResult', 'Right result')}</th><th>{t('yourEntry', 'Your entry')}</th><th>{t('result', 'Result')}</th><th>{t('time', 'Time')}</th></tr>
			</thead>
			<tbody>
				{exam.map(e => <tr><td>{e.firstOperand} {e.operator?.symbol} {e.secondOperand}</td><td>{e.rightResult}</td><td>{e.result}</td><td>{e.result === e.rightResult ? '✅️' : '❌'}</td><td>{millisToTimeString(e.time)}</td></tr>)}
			</tbody>
		</table>
		{/* { corr + ' - ✅️ :: ' + nocorr + ' - ❌ :: total time - ' + millisToTimeString(totalTime)} */}
		<div>✅️: {corr}</div>
		<div>❌: {nocorr}</div>
		<div>{t('totalTime', 'Total time')}: {millisToTimeString(totalTime)}</div>
		<div>{t('averageTime', 'Average time')}: {millisToTimeString(totalTime / exam.length)}</div>
		<div>&nbsp;</div>
		<h2>{t('slowest', 'Slowest')}</h2>
		<table class='result-table'>
			<thead>
				<tr><th>{t('time', 'Time')}</th><th>{t('order', 'Order')}</th><th>{t('exam', 'Exam')}</th></tr>
			</thead>
			<tbody>
				{sortedExamByTime.slice(sortedExamByTime.length - 3).reverse().map(e => <tr><td>{millisToTimeString(e.time)}</td><td>{e.order}</td><td>{e.firstOperand} {e.operator?.symbol} {e.secondOperand} = {e.result}</td></tr>)}
			</tbody>
		</table>
		<div>&nbsp;</div>
		<h2>{t('fastest', 'Fastest')}</h2>
		<table class='result-table'>
			<thead>
				<tr><th>{t('time', 'Time')}</th><th>{t('order', 'Order')}</th><th>{t('exam', 'Exam')}</th></tr>
			</thead>
			<tbody>
				{sortedExamByTime.slice(0, 3).map(e => <tr><td>{millisToTimeString(e.time)}</td><td>{e.order}</td><td>{e.firstOperand} {e.operator?.symbol} {e.secondOperand} = {e.result}</td></tr>)}
			</tbody>
		</table>
		<Button text={t('newExamination', 'New examination')} action={goToWelcome} />
	</>
}
