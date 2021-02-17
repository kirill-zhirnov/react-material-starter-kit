import React, {ComponentType, ReactNode} from 'react';
import {
	Route,
	RouteProps,
	Redirect
} from 'react-router-dom';
import isAccessAllowed from './auth';
import { useSelector } from 'react-redux';
import {RootState} from '../../redux/reducers';

import MainLayout from '../layouts/Main';

export interface AppRouteProps extends RouteProps {
	layout?: ComponentType<{children: ReactNode | ReactNode[]}>
}

export default function AppRoute(props: AppRouteProps) {
	const {
		component: ComponentNode,
		layout: LayoutNode = MainLayout,
		...rest
	} = props;

	const roleAlias = useSelector((state: RootState) => state.user.user?.role.alias);

	if (props.location) {
		if (!isAccessAllowed(props.location.pathname, roleAlias)) {
			return <Redirect
				to={{
					pathname: '/auth/login',
					state: {
						from: props.location
					}
				}}
			/>;
		}
	}

	if (ComponentNode) {
		return (
			<Route {...rest}
						 render={(routeProps) =>
							<LayoutNode>
								<ComponentNode {...routeProps} />
							</LayoutNode>
						 }
			/>
		);
	}

	return (
		<Route {...rest}>
			<LayoutNode>
				{props.children}
			</LayoutNode>
		</Route>
	);
}