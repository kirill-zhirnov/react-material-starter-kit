import React, {ReactNode} from 'react';
// import CssBaseline from '@material-ui/core/CssBaseline';
import TopNavBar from '../components/TopNavBar';
import GlobalAlert from '../components/GlobalAlert';

export default function MainLayout({children}: {children: ReactNode | ReactNode[]}) {
	return (
		<div className="main-layout">
			{/*<CssBaseline />*/}
			<TopNavBar />
			<GlobalAlert />
			<main className={'main-section'}>
				<>
					{children}
				</>
			</main>
		</div>
	);
}