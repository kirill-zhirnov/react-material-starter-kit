import React, {Component} from 'react';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import {cleanPromises} from '../../redux/reducers/xhr';
import {connect} from 'react-redux';

class LoadingLine extends Component<{
	promises: Promise<any>[],
	cleanPromises: () => void
}, {}> {
	componentDidUpdate() {
		this.checkBgPromises();
	}

	checkBgPromises() {
		const size = this.props.promises.length;
		if (!size) return;

		NProgress.start();
		Promise.allSettled(this.props.promises)
			.then(() => {
				if (this.props.promises.length === size) {
					NProgress.done();
					this.props.cleanPromises();
				}
			});
	}

	render() {
		return (<div />);
	}
}

export default connect((state) => ({
	// @ts-ignore
	promises: state.xhr.promises
}), {cleanPromises})(LoadingLine);