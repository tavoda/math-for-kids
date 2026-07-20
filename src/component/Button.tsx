import type { ComponentChildren } from "preact";

type ButtonSpec = {
	text?: string,
	type?: string,
	classPostfix?: string,
	children?: ComponentChildren,
	action: (e: Event) => void
};

export const Button = ({ text, type, classPostfix, action, children }: ButtonSpec) => {
	const callAction = (e: Event) => {
		action && action(e);
	}
	var classNames = 'btn-' + (type || "normal") + ' ' + classPostfix;
	return <button onClick={callAction} className={classNames} type='reset'>
		<span style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>{children}{text}</span>
	</button>
}