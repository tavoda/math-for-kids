import { Button } from "../component/Button"

export const Welcome = () => {
	return <>
		<h2>Welcome</h2>
		<div>Welcome to basic math testing application</div>
		<Button text="Ready to start" action={() => {window.location.hash='#calculate'}}/>
	</>
}
