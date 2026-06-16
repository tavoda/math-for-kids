import { Operator, TypingDirection, type MathForKids } from "./Types";

export const config: MathForKids.BasicMathSettings[] = [
	{
		name: 'Q: 10 :: Level: Very Basic :: ADD ONLY',
		excercises: 10,
		firstOperandRangeMin: 1,
		firstOperandRangeMax: 9,
		secondOperandRangeMin: 2,
		secondOperandRangeMax: 5,
		operators: [Operator.PLUS],
		direction: TypingDirection.RtoL,
		showTime: false,
		automaticStepForward: true,
		immediateEvaluation: false,
	},
	{
		name: 'Q: 10 :: Level: Basic :: ADD ONLY',
		excercises: 10,
		firstOperandRangeMin: 1,
		firstOperandRangeMax: 9,
		secondOperandRangeMin: 1,
		secondOperandRangeMax: 9,
		operators: [Operator.PLUS],
		direction: TypingDirection.RtoL,
		showTime: true,
		automaticStepForward: false,
		immediateEvaluation: false,
	},
	{
		name: 'Q: 10 :: Level: Intermediate :: ADD ONLY',
		excercises: 10,
		firstOperandRangeMin: 11,
		firstOperandRangeMax: 99,
		secondOperandRangeMin: 1,
		secondOperandRangeMax: 99,
		operators: [Operator.PLUS],
		direction: TypingDirection.RtoL,
		showTime: true,
		automaticStepForward: false,
		immediateEvaluation: false,
	}
]