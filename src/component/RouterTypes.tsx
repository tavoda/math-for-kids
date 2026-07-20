export type Route = {
	path: string;
	element: any;
}

export type RouteInit = {
	routerType?: 'internal' | 'hash';
}