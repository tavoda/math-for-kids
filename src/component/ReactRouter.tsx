import { useCallback, useEffect, useState } from 'react';
import type { Route, RouteInit } from './RouterTypes';

export const useRouter = (init?: RouteInit) => {
	const {routerType} = init || {routerType: 'hash'};

	const [path, setPath] = useState(() => {
		if (routerType === 'internal') {
			return '';
		} else {
			return window.location.hash;
		}
	});

	const onHashChange = useCallback(() => {
		setPath(window.location.hash);
	}, []);

	useEffect(() => {
		addEventListener("hashchange", onHashChange);
		return () => {
			removeEventListener('hashchange', onHashChange);
		}
	}, []);

	const updateRoute = useCallback(
		(newHash: string) => {
			if (newHash !== path) {
				window.location.hash = newHash;
			}
		},
		[path]
	);

	const pushResult = (result: Element[], element: any) => {
		const el = typeof element === 'function' ? element(path) : element;
		result.push(el);
	}

	const router = (routes: Array<Route>): Element[] => {
		const result: Element[] = [];
		let defaultRoute = null;
		for (const r of routes) {
			if (path.startsWith(r.path)) {
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
		path: path,
		routeTo: updateRoute,
		fork: router
	}
};