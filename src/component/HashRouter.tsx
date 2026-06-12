import { useCallback, useEffect, useState } from 'react';
import type { Route } from './Route';

export const useHash = () => {
	const [hash, setHash] = useState(() => window.location.hash);

	const onHashChange = useCallback(() => {
		setHash(window.location.hash);
	}, []);

	useEffect(() => {
		addEventListener("hashchange", onHashChange);
		return () => {
			removeEventListener('hashchange', onHashChange);
		}
	}, []);

	const publicSetHash = useCallback(
		(newHash: string) => {
			if (newHash !== hash) {
				window.location.hash = newHash;
			}
		},
		[hash]
	);

	const pushResult = (result: Element[], element: any) => {
		const el = typeof element === 'function' ? element(hash) : element;
		result.push(el);
	}

	const publicRouter = (routes: Array<Route>): Element[] => {
		const result: Element[] = [];
		let defaultRoute = null;
		for (const r of routes) {
			if (hash === r.path) {
				pushResult(result, r.element);
			}
			if (r.path === 'DEFAULT') {
				defaultRoute = r.element;
			}
		}
		if (result.length === 0 && defaultRoute != null) {
			pushResult(result, defaultRoute);
		}
		return result;
	}

	return {
		hash: hash,
		setHash: publicSetHash,
		router: publicRouter
	}
};