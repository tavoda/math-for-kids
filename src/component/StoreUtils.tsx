import { createContext, type ComponentChildren } from "preact";
import { useContext, useEffect, useRef, useState, type Dispatch, type MutableRef, type StateUpdater } from "preact/hooks";
import type { MathForKids } from "../Types";
import { config } from "../config";
import type { SetStateAction } from "preact/compat";

export function makeSimpleStore<T>(initialState: T): [
	({ children }: { children: ComponentChildren | null; }) => {}
	, () => [T, Dispatch<SetStateAction<T>>]
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

export function makeLocalStorageStore<T>(name: string, initialState: T | null): () => [T, Dispatch<SetStateAction<T>>] {
	const currentValue = localStorage.getItem(name);
	if (currentValue === null) {
		if (initialState == null) {
			localStorage.removeItem(name);
		} else {
			localStorage.setItem(name, JSON.stringify(initialState));
		}
	}

	const setLocalStorageValue: Dispatch<SetStateAction<T>> = (json) => {
		if (typeof json === 'object') {
			localStorage.setItem(name, JSON.stringify(json))
		} else {
			const oldStrValue = localStorage.getItem(name);
			const oldValue: T = oldStrValue !== null ? JSON.parse(oldStrValue) : null;
			const callable = json as ((prevState: T) => T);
			const newValue = callable(oldValue);
			if (newValue !== oldValue) {
				localStorage.setItem(name, JSON.stringify(newValue))
			}
		}
	}

	const useLocalStorageStore: () => [T, Dispatch<SetStateAction<T>>] = () => {
		const storageValue = localStorage.getItem(name);
		return [storageValue !== null ? JSON.parse(storageValue) : null, setLocalStorageValue];
	}

	return useLocalStorageStore;
}

export function usePersistedState<T>(storageKey: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] {
	const [state, setState] = useState<T>(() => {
		try {
			const savedData = localStorage.getItem(storageKey);
			console.log('STORAGE: Loaded value for ' + storageKey + ': ', savedData);
			return savedData ? (JSON.parse(savedData) as T) : defaultValue;
		} catch (error) {
			console.error("STORAGE: Error reading localStorage", error);
			return defaultValue;
		}
	});

	const stateRef = useRef<T>(state);
	useEffect(() => {
		stateRef.current = state;
	}, [state]);

	useEffect(() => {
		const handleBeforeUnload = (): void => {
			if (stateRef.current != null) {
				const saveVal = JSON.stringify(stateRef.current);
				console.log('STORAGE: Storing value for ' + storageKey + ': ', saveVal);
				localStorage.setItem(storageKey, saveVal);
			} else {
				console.log('STORAGE: Removing value for ' + storageKey + '.');
				localStorage.removeItem(storageKey);
			}
		};

		window.addEventListener('beforeunload', handleBeforeUnload);
		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload)
			handleBeforeUnload();
		};
	}, [storageKey]);

	return [state, setState];
}

export function usePersistedRef<T>(
	storageKey: string,
	defaultValue: T
): [MutableRef<T>, boolean] {
	const ref = useRef<T>(defaultValue);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	useEffect(() => {
		try {
			const savedData = localStorage.getItem(storageKey);
			console.log('STORAGE: Loaded value for ' + storageKey + ': ', savedData);
			if (savedData !== null) {
				ref.current = JSON.parse(savedData) as T;
			}
		} catch (error) {
			console.error("STORAGE: Error reading localStorage", error);
		} finally {
			setIsLoaded(true);
		}

		const handleBeforeUnload = (): void => {
			const saveVal = JSON.stringify(ref.current);
			localStorage.setItem(storageKey, saveVal);
			console.log('STORAGE: Storing value for ' + storageKey + ': ', saveVal);
		};
		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [storageKey]);

	return [ref, isLoaded];
}

export function clearStorage(storageKey: string) {
	console.log('STORAGE: Removing value for ' + storageKey + '.');
	localStorage.removeItem(storageKey);
}

// const [ExaminationProvider, useExamStore] = makeSimpleStore([] as Array<MathForKids.Excercise>);
const useExamStore = () => usePersistedState('exam', [] as Array<MathForKids.Excercise>);
const clearExamStore = () => clearStorage('exam');
export { useExamStore, clearExamStore };

const [ConfigurationProvider, useConfigStore] = makeSimpleStore(config);
export { useConfigStore };

// const [SelectedConfigProvider, useSelectedConfig] = makeSimpleStore({} as MathForKids.BasicMathSettings);
const useSelectedConfig = makeLocalStorageStore('selectedConfig', {} as MathForKids.BasicMathSettings);
export { useSelectedConfig };

export const AllProviders = ({ children }: { children: ComponentChildren }) => {
	return (
		// <ExaminationProvider>
		<ConfigurationProvider>
			{/* <SelectedConfigProvider> */}
			{children}
			{/* </SelectedConfigProvider> */}
		</ConfigurationProvider>
		// </ExaminationProvider>
	);
};
