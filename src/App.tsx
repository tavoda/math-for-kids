import './app.scss';
import { Examination } from './view/Examination';
import { useHash } from './component/HashRouter';
import { About } from './view/About';
import { Welcome } from './view/Welcome';
import { config } from './config';
import { AllProviders } from './component/StoreUtils';

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
						path: '#about',
						element: <About />
					},
					{
						path: '#calculate',
						element: (hash: string) => {
							console.log('HASH: ' + hash);
							return <Examination {...config[0]} />
						}
					},
					{
						path: '#result',
						element: (hash: string) => {
							console.log('HASH: ' + hash);
							return <Examination {...config[0]} />
						}
					}
				])}
			</section>
		</AllProviders>
	)
}
