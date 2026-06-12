import { createContext, type ComponentChildren } from "preact";
import { useContext, useState, type Dispatch, type StateUpdater } from "preact/hooks";

export function makeSimpleStore<T>(initialState: T): [
	({ children }: { children: ComponentChildren | null; }) => {}
	, () => [T, React.Dispatch<React.SetStateAction<T>>] | null
] {
	const StoreContext = createContext<[T, Dispatch<StateUpdater<T>>] | null>(null);

	const StoreProvider = ({ children }: { children: ComponentChildren | null }) => {
		const state: [T, Dispatch<StateUpdater<T>>] = useState<T>(initialState);
		return <StoreContext.Provider value={state}>{children}</StoreContext.Provider>;
	};

	function useStore() {
		return useContext(StoreContext);
	}

	return [StoreProvider, useStore];
}

const [ExaminationProvider, useExaminationProvider] = makeSimpleStore({});
export { useExaminationProvider };

export const AllProviders = ({ children }: {children: ComponentChildren}) => {
	return (
		<ExaminationProvider>
			{children}
		</ExaminationProvider>
	);
};
