export type OperatorSpec = {
	name: string,
	opName: string,
	symbol: string,
	calc: (f: number, s: number) => number,
}

export enum Operator {
	PLUS = 'PLUS',
	MINUS = 'MINUS',
	MULTIPLY = 'MULTIPLY',
	DIVIDE = 'DIVIDE'
}

export const OperatorDef = new Map<Operator, OperatorSpec>([
	[Operator.PLUS, {
		name: 'Plus',
		opName: 'Addition',
		symbol: '+',
		calc:  (f:number, s:number) => f + s,
	}],
	[Operator.MINUS, {
		name: 'Minus',
		opName: 'Substraction',
		symbol: '-',
		calc:  (f, s) => f - s,
	}],
	[Operator.MULTIPLY, {
		name: 'Multiply',
		opName: 'Multiplication',
		symbol: '*',
		calc:  (f, s) => f * s,
	}],
	[Operator.DIVIDE, {
		name: 'Divide',
		opName: 'Division',
		symbol: '/',
		calc:  (f, s) => f / s,
	}]
]);

export enum TypingDirection {
	LtoR = 'LTOR',
	RtoL = 'RTOL',
}

export declare namespace MathForKids {
	export type BasicMathSettings = {
		name: string;
		excercises: number;
		firstOperandRangeMin: number;
		firstOperandRangeMax: number;
		secondOperandRangeMin: number;
		secondOperandRangeMax: number;
		operators:  Array<Operator>;
		direction: TypingDirection;
		showTime: boolean;
		automaticStepForward: boolean;
		limitTotalTime: string;
	}

	export type Excercise = {
		firstOperand: number;
		secondOperand: number;
		operator: OperatorSpec | undefined;
		result: number;
		rightResult: number;
		time: number;
		correct: boolean | null;
		order?: number;
	}
}