import React, {ReactNode} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TopNavBar from '../components/TopNavBar';

export default function MainLayout({children}: {children: ReactNode | ReactNode[]}) {
	return (
		<div className="main-layout">
			<CssBaseline />
			<TopNavBar />
			<main className={'main-section'}>
				<>
					{children}
				</>
			</main>
		</div>
	);
}