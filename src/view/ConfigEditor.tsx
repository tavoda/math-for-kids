import { useEffect, useState } from 'react';
import { Operator, TypingDirection } from '../Types';
import { useRouter } from '../component/ReactRouter';
import { useConfig } from '../component/ConfigUtils';
import { Button } from '../component/Button';
import type { MathForKids } from "../Types";

const DEFAULT_VALUES: MathForKids.BasicMathSettings = {
	name: 'NEW',
	excercises: 10,
	firstOperandRangeMin: 1,
	firstOperandRangeMax: 99,
	secondOperandRangeMin: 1,
	secondOperandRangeMax: 99,
	operators: [Operator.PLUS],
	direction: TypingDirection.RtoL,
	showTime: true,
	limitTotalTime: '00:00',
	automaticStepForward: true,
}

export const ConfigEditor = () => {
	const { getConfig, setConfig } = useConfig();
	const { path } = useRouter();
	const [item, setItem] = useState(-1);

	// Default form values
	const [formData, setFormData] = useState(DEFAULT_VALUES);

	useEffect(() => {
		const hashPattern = /#config-edit\/([0-9]+)/g;
		const match = hashPattern.exec(path);

		const config = getConfig();
		if (match && match[0] && Number(match[1]) < config.length) {
			const i = Number(match[1]);
			setItem(i);
			setFormData(config[i]);
		}
	}, []);

	const handleChange = (e: any) => {
		const { name, value, type, checked } = e.target;

		let finalValue = value;
		if (type === 'checkbox') finalValue = checked;
		if (type === 'number') finalValue = Number(value);

		setFormData((prev) => ({
			...prev,
			[name]: finalValue,
		}));
	};

	const handleTimeChange = (e: any) => {
		const { name, value } = e.target;

		let finalValue = '00:00';
		const split: string[] = value.split(':');
		if (split.length === 1) {
			const numVal = Number(split[0]);
			const seconds = 0;
			const minutes = numVal;
			finalValue = formatTimeVal(minutes) + ':' + formatTimeVal(seconds);
		} else if (split.length === 2) {
			const minutes = Number(split[0]);
			const seconds = Number(split[1]);
			finalValue = formatTimeVal(minutes) + ':' + formatTimeVal(seconds);
		}

		setFormData((prev) => ({
			...prev,
			[name]: finalValue,
		}));
	};

	const formatTimeVal = (timeVal: number): string => {
		const cutValue = Math.floor(timeVal % 60);
		return (cutValue < 0 || isNaN(cutValue)) ? '00' : cutValue < 10 ? '0' + cutValue : '' + cutValue;
	}

	const handleOperatorChange = (operatorValue: any) => {
		setFormData((prev) => {
			const currentOperators = prev.operators;
			const newOperators = currentOperators.includes(operatorValue)
				? currentOperators.filter((op) => op !== operatorValue)
				: [...currentOperators, operatorValue];

			return { ...prev, operators: newOperators };
		});
	};

	const saveConfig = (e: Event) => {
		e.preventDefault();
		const config = getConfig();
		if (item >= 0 && item < config.length) {
			config[item] = formData;
		} else {
			config.push(formData);
		}
		setConfig(config);
		backToManager(e);
	};

	const backToManager = (e: Event) => {
		e.preventDefault();
		window.location.hash = `#config-manage`
	}

	const clazz = {
		label: "block text-left text-sm font-medium text-gray-700",
		group_label: "block text-left text-sm font-medium text-gray-700 mt-3 mb-1",
		input: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
	}

	return (
		<div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen grid grid-cols-1 gap-6">
			{/* FORMULÁR */}
			<form className="bg-white p-6 rounded-xl shadow-md space-y-4">
				<h2 className="text-xl font-bold text-gray-800 pb-2">Configuration editor</h2>

				{/* Name */}
				<div>
					<label className={clazz.label}>Name</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className={clazz.input}
					/>
				</div>

				{/* Excercises */}
				<div>
					<label className={clazz.label}>Number of exercises</label>
					<input
						type="number"
						name="excercises"
						value={formData.excercises}
						onChange={handleChange}
						className={clazz.input}
					/>
				</div>

				<span className={clazz.group_label}>First operand</span>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className={clazz.label}>MIN</label>
						<input
							type="number"
							name="firstOperandRangeMin"
							value={formData.firstOperandRangeMin}
							onChange={handleChange}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
						/>
					</div>
					<div>
						<label className={clazz.label}>MAX</label>
						<input
							type="number"
							name="firstOperandRangeMax"
							value={formData.firstOperandRangeMax}
							onChange={handleChange}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
						/>
					</div>
				</div>

				<span className={clazz.group_label}>Second operand</span>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className={clazz.label}>MIN</label>
						<input
							type="number"
							name="secondOperandRangeMin"
							value={formData.secondOperandRangeMin}
							onChange={handleChange}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
						/>
					</div>
					<div>
						<label className={clazz.label}>MAX</label>
						<input
							type="number"
							name="secondOperandRangeMax"
							value={formData.secondOperandRangeMax}
							onChange={handleChange}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
						/>
					</div>
				</div>

				{/* Operators */}
				<div>
					<label className={clazz.label}>Operator</label>
					<div className="flex gap-4">
						{Object.keys(Operator).map((key) => {
							const oper = Operator[key as keyof typeof Operator];
							// const operSpec = OperatorDef.get(oper);
							return (<label className="flex items-center space-x-2">
								<input
									type="checkbox"
									checked={formData.operators.includes(oper)}
									onChange={() => handleOperatorChange(key)}
									className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
								/>
								<span>{oper}</span>
							</label>)
						})}
					</div>
				</div>

				<div>
					<label className={clazz.label}>Total time</label>
					<input
						type="text"
						name="limitTotalTime"
						value={formData.limitTotalTime}
						onBlur={handleTimeChange}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
					/>
				</div>

				<div>
					<label className={clazz.label}>Typing direction</label>
					<select
						name="direction"
						value={formData.direction}
						onChange={handleChange}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border bg-white"
					>
						<option value={TypingDirection.LtoR}>Zľava doprava (LtoR)</option>
						<option value={TypingDirection.RtoL}>Sprava doľava (RtoL)</option>
					</select>
				</div>

				<div className="flex flex-col gap-2 pt-2">
					<label className="flex items-center space-x-2">
						<input
							type="checkbox"
							name="showTime"
							checked={formData.showTime}
							onChange={handleChange}
							className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
						/>
						<span className="text-left text-sm text-gray-700">Show time</span>
					</label>

					<label className="flex items-center space-x-2">
						<input
							type="checkbox"
							name="automaticStepForward"
							checked={formData.automaticStepForward}
							onChange={handleChange}
							className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
						/>
						<span className="text-left text-sm text-gray-700">Automatic forward</span>
					</label>
				</div>

				<div className="flex gap-4 justify-center">
					<Button text="Cancel" action={backToManager} />
					<Button type="blue" text="Save configuration" action={saveConfig} />
				</div>
			</form>
		</div>
	);
};