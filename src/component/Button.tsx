export const Button = ({text, className, action}: {text: string, className?: string, action: () => void}) => {
	const callAction = () => {
		action && action();
	}

	return <button onClick={callAction} className={className || "btn-normal"}>{text}</button>
}