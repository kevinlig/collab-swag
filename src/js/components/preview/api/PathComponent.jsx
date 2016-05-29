import React from 'react';
import MethodComponent from './MethodComponent.jsx';

const defaultProps = {
	parameters: [],
	name: "",
	path: {}
}

export default class PathComponent extends React.Component {

	parseMethods() {
		const methods = [];

		Object.keys(this.props.path).forEach((key, index) => {
			const method = this.props.path[key];


			methods.push(<MethodComponent key={index} name={key} {...method} />);

		});

		return methods;
	}

	render() {
		const methods = this.parseMethods();
		return (
			<div className="section api-path">
				<h4>{this.props.name}</h4>
				{methods}
			</div>
		);
	}
}

PathComponent.defaultProps = defaultProps;