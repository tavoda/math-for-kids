import { createContext, type ComponentChildren } from "preact";
import { useContext, useState, type Dispatch, type StateUpdater } from "preact/hooks";
import type { MathForKids } from "../Types";
import { config } from "../config";

export function makeSimpleStore<T>(initialState: T): [
	({ children }: { children: ComponentChildren | null; }) => {}
	, () => [T, React.Dispatch<React.SetStateAction<T>>]
] {
	const StoreContext = createContext<[T, Dispatch<StateUpdater<T>>]>(null as unknown as [T, Dispatch<StateUpdater<T>>]);

	const StoreProvider = ({ children }: { children: ComponentChildren | null }) => {
		const state: [T, Dispatch<StateUpdater<T>>] = useState<T>(initialState);
		return <StoreContext.Provider value={state}>{children}</StoreContext.Provider>;
	};

	const useStore = () => {
		return useContext(StoreContext);
	}

	return [StoreProvider, useStore];
}

const [ExaminationProvider, useExamStore] = makeSimpleStore([] as Array<MathForKids.Excercise>);
export { useExamStore };

const [ConfigurationProvider, useConfigStore] = makeSimpleStore(config);
export { useConfigStore };

const [SelectedConfigProvider, useSelectedConfig] = makeSimpleStore({} as MathForKids.BasicMathSettings);
export { useSelectedConfig };

export const AllProviders = ({ children }: { children: ComponentChildren }) => {
	return (
		<ExaminationProvider>
			<ConfigurationProvider>
				<SelectedConfigProvider>
					{children}
				</SelectedConfigProvider>
			</ConfigurationProvider>
		</ExaminationProvider>
	);
};
