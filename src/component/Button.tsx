export const Button = ({text, action}: {text: string, action: () => void}) => {
	const callAction = () => {
		action && action();
	}

	return <button onClick={callAction}>{text}</button>
}