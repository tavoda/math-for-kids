import { config } from "../config";
import type { MathForKids } from "../Types";

const CONFIG_NAME = "mathConfig";

export const useConfig = () => {
	const getConfig = () => {
		const mathConfigString: string | null = localStorage.getItem(CONFIG_NAME);
		var mathConfig: MathForKids.BasicMathSettings[] | null = null;
		if (mathConfigString != null) {
			try {
				mathConfig = JSON.parse(mathConfigString);
			} catch {
				console.warn('WRONG CONFIG: ', mathConfigString);
			}
		}

		if (mathConfig == null) {
			resetConfig();
			mathConfig = config.slice();
		}

		return mathConfig;
	}

	const setConfig = (newConfig: MathForKids.BasicMathSettings[]) => {
		localStorage.setItem(CONFIG_NAME, JSON.stringify(newConfig));
	}

	const resetConfig = () => {
		localStorage.removeItem(CONFIG_NAME);
	}

	return { getConfig, setConfig, resetConfig };
}