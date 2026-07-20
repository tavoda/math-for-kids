import { useEffect, useState } from 'react';
import { Operator, TypingDirection } from '../Types';
import { useRouter } from '../component/ReactRouter';
import { useConfig } from '../component/ConfigUtils';
import { Button } from '../component/Button';

export const ConfigEditor = () => {
	const { getConfig, setConfig } = useConfig();
	const { path } = useRouter();
	const [item, setItem] = useState(-1);

	// Default form values
	const [formData, setFormData] = useState({
		name: 'NEW',
		excercises: 10,
		firstOperandRangeMin: 1,
		firstOperandRangeMax: 99,
		secondOperandRangeMin: 1,
		secondOperandRangeMax: 99,
		operators: [Operator.PLUS],
		direction: TypingDirection.RtoL,
		showTime: true,
		automaticStepForward: true,
	});

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

	// Spracovanie zmien pre text, čísla a selecty
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

	// Spracovanie zmien pre pole operátorov (checkboxy)
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

	return (
		<div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen grid grid-cols-1 gap-6 font-sans">

			{/* FORMULÁR */}
			<form className="bg-white p-6 rounded-xl shadow-md space-y-4">
				<h2 className="text-xl font-bold text-gray-800 border-b pb-2">Editor konfigurácie</h2>

				{/* Name */}
				<div>
					<label className="block text-sm font-medium text-gray-700">Názov</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
					/>
				</div>

				{/* Excercises */}
				<div>
					<label className="block text-sm font-medium text-gray-700">Počet cvičení</label>
					<input
						type="number"
						name="excercises"
						value={formData.excercises}
						onChange={handleChange}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
					/>
				</div>

				<span className="block text-sm span-2 font-medium text-gray-700">Prvý operand</span>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">MIN</label>
						<input
							type="number"
							name="firstOperandRangeMin"
							value={formData.firstOperandRangeMin}
							onChange={handleChange}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">MAX</label>
						<input
							type="number"
							name="firstOperandRangeMax"
							value={formData.firstOperandRangeMax}
							onChange={handleChange}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
						/>
					</div>
				</div>

				<span className="block text-sm font-medium text-gray-700">Druhý operand</span>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">MIN</label>
						<input
							type="number"
							name="secondOperandRangeMin"
							value={formData.secondOperandRangeMin}
							onChange={handleChange}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">MAX</label>
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
					<label className="block text-sm font-medium text-gray-700 mb-1">Operátory</label>
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

				{/* Direction */}
				<div>
					<label className="block text-sm font-medium text-gray-700">Smer písania (Direction)</label>
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

				{/* Booleans Toggle */}
				<div className="flex flex-col gap-2 pt-2">
					<label className="flex items-center space-x-2">
						<input
							type="checkbox"
							name="showTime"
							checked={formData.showTime}
							onChange={handleChange}
							className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
						/>
						<span className="text-sm text-gray-700">Zobraziť čas (showTime)</span>
					</label>

					<label className="flex items-center space-x-2">
						<input
							type="checkbox"
							name="automaticStepForward"
							checked={formData.automaticStepForward}
							onChange={handleChange}
							className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
						/>
						<span className="text-sm text-gray-700">Automatický posun vpred</span>
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