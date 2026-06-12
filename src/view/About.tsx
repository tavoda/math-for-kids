import { Button } from "../component/Button"

export const About = () => {
	return <>
		<h2>About</h2>
		<table>
			<tr><th>Shortcut</th><th>Function</th></tr>
			<tr><td>0-9</td><td>Type number to result</td></tr>
			<tr><td>Page Up, Arrow Up</td><td>Previous question</td></tr>
			<tr><td>Page Down, Arrow Down</td><td>Next question</td></tr>
			<tr><td>Arrow left</td><td>Move cursor left</td></tr>
			<tr><td>Arrow right</td><td>Move cursor right</td></tr>
			<tr><td>e</td><td>Erase result and start over</td></tr>
			<tr><td>Backspace, Del</td><td>Return back one place</td></tr>
		</table>
		<Button text="Ready to start" action={() => {window.location.hash='#calculate'}}/>
	</>
}
