import './app.scss';
import { Examination } from './view/Examination';
import { useHash } from './component/HashRouter';
import { ExamStart } from './view/ExamStart';
import { Welcome } from './view/Welcome';
import { config } from './config';
import { AllProviders } from './component/StoreUtils';
import { ExamEnd } from './view/ExamEnd';
import { Result } from './view/Result';

export function App() {
	const hash = useHash();

	return (
		<AllProviders>
			<section id="center">
				{hash.router([
					{
						path: 'DEFAULT',
						element: <Welcome />
					},
					{
						path: '#start',
						element: (hash: string) => {
							console.log('HASH: ' + hash);
							return <ExamStart/>
						}
					},
					{
						path: '#excercise',
						element: (hash: string) => {
							console.log('HASH: ' + hash);
							return <Examination/>
						}
					},
					{
						path: '#end',
						element: (hash: string) => {
							console.log('HASH: ' + hash);
							return <ExamEnd/>
						}
					},
					{
						path: '#result',
						element: (hash: string) => {
							console.log('HASH: ' + hash);
							return <Result/>
						}
					}
				])}
			</section>
		</AllProviders>
	)
}
