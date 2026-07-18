import './app.scss';
import { Examination } from './view/Examination';
import { useRouter } from './component/ReactRouter';
import { ExamStart } from './view/ExamStart';
import { Welcome } from './view/Welcome';
import { AllProviders } from './component/StoreUtils';
import { ExamEnd } from './view/ExamEnd';
import { Result } from './view/Result';

export function App() {
	const router = useRouter();

	return (
		<AllProviders>
			<section id="center">
				{router.fork([
					{
						path: 'DEFAULT',
						element: <Welcome />
					},
					{
						path: '#start',
						element: (_: string) => {
							return <ExamStart />
						}
					},
					{
						path: '#excercise',
						element: (_: string) => {
							return <Examination />
						}
					},
					{
						path: '#end',
						element: (_: string) => {
							return <ExamEnd />
						}
					},
					{
						path: '#result',
						element: (_: string) => {
							return <Result />
						}
					}
				])}
			</section>
		</AllProviders>
	)
}
