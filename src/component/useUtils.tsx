import { OperatorDef, type MathForKids } from "../Types";

export const useUtils = () => {
	const numInRange = (fromInclusive: number, toInclusive: number) => {
		return Math.floor(Math.random() * (toInclusive - fromInclusive + 1) + fromInclusive);
	}

	const generateExam = (settings: MathForKids.BasicMathSettings) => {
		const pSums = new Array<MathForKids.Excercise>();
		// const operatorsKeys = Object.keys(settings.operators);
		for (let i = 0; i < settings.excercises; i++) {
			let newSum: MathForKids.Excercise;
			let repeat = false;
			let gen = 0;
			do {
				newSum = {
					firstOperand: numInRange(settings.firstOperandRangeMin, settings.firstOperandRangeMax),
					secondOperand: numInRange(settings.secondOperandRangeMin, settings.secondOperandRangeMax),
					operator: OperatorDef.get(settings.operators[Math.floor(Math.random() * settings.operators.length)]),
					rightResult: Number.NaN,
					result: 0,
					time: 0,
					correct: null
				};
				repeat = false;
				for (let o of pSums) {
					if (o.firstOperand === newSum.firstOperand
						&& o.secondOperand === newSum.secondOperand
						&& o.operator === newSum.operator
					|| o.firstOperand === newSum.secondOperand
						&& o.secondOperand === newSum.firstOperand
						&& o.operator === newSum.operator) {
							console.log("Same equation " + newSum.firstOperand + " " + newSum.operator?.symbol + " " + newSum.secondOperand);
						repeat = true;
						break;
					}
				}
				gen++;
			} while (repeat && gen < 5);
			if (newSum.operator) {
				newSum.rightResult = newSum.operator.calc(newSum.firstOperand, newSum.secondOperand);
			}
			pSums.push(newSum);
		}
		return pSums;
	}

	const millisToTimeString = (duration: number): string => {
		const seconds = Math.floor((duration / 1000) % 60);
		const minutes = Math.floor((duration / (1000 * 60)) % 60);
		return ((minutes < 10) ? "0" + minutes : minutes) + ":" + ((seconds < 10) ? "0" + seconds : seconds);
	}

	return {millisToTimeString, generateExam};
}