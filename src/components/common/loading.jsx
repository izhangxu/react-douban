import React, {Component} from 'react';

export default class Loading extends Component {
	static defaultProps = {show: false};

	shouldComponentUpdate(nextPorps) {
		if (this.props.show !== nextPorps.show) {
			return true;
		}
		return false;
	}

	render() {
		const {show} = this.props;
		return (
			<div className="loading" style={{display: show ? 'table' : 'none'}}>
				<div>loading...</div>
			</div>
		)
	}
};
