import { useEffect, useState } from "preact/hooks";
import { Button } from "../component/Button"
import { useExamStore } from "../component/StoreUtils"
import { useConfig } from "../component/ConfigUtils";
import { IconBack, IconPencil, IconPlus, IconReload, IconTrash } from "../component/Icon";
import { useTranslation } from 'react-i18next';

export const ConfigManager = () => {
	const { t } = useTranslation()
	const [, setExam] = useExamStore();
	const [, setRedraw] = useState(1);
	const { getConfig, setConfig, resetConfig } = useConfig();

	const redraw = () => {
		setRedraw(old => old + 1);
	}

	useEffect(() => {
		setExam([]);
	}, []);

	const editExam = (i: number) => {
		window.location.hash = `#config-edit/${i}`
	}

	const removeExam = (i: number) => {
		const config = getConfig();
		if (i < config.length) {
			config.splice(i, 1);
			setConfig(config);
		}
		redraw();
	}

	const addExam = () => {
		window.location.hash = `#config-edit/-1`
	}

	const reset = () => {
		resetConfig();
		redraw();
	}

	const back = () => {
		window.location.hash = `#`
	}

	return <>
		<h1>{t('configManager', 'Configuration manager')}</h1>
		<div class='flex flex-col gap-4'>
			{getConfig().map((c, i) => {
				return <div class='flex gap-4'>
					<Button classPostfix="grow" text={`${c.name} (${c.excercises}: ${c.firstOperandRangeMin}..${c.firstOperandRangeMax} ${c.operators} ${c.secondOperandRangeMin}..${c.secondOperandRangeMax}${(c.limitTotalTime || '00:00') !== '00:00' ? ' - ' + c.limitTotalTime : ''})`} action={() => editExam(i)} />
					<Button type='teal' classPostfix="shrink" action={() => editExam(i)} >
						<IconPencil />
					</Button>
					<Button type='teal' classPostfix="shrink" action={() => removeExam(i)} >
						<IconTrash />
					</Button>
				</div>
			})}
		</div>
		<div class='flex gap-4'>
			<Button type='blue' text={t('addNewConfiguration', 'Add new configuration')} action={() => addExam()}>
				<IconPlus />
			</Button>
			<Button type='blue' text={t('resetToDefault', 'Reset to default')} action={reset}>
				<IconReload />
			</Button>
			<Button type='blue' text={t('backToMain', 'Back to main')} action={back}>
				<IconBack />
			</Button>
		</div>
	</>
}
