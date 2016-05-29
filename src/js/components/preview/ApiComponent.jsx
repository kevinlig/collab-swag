import React from 'react';

import PathComponent from './api/PathComponent.jsx';

const defaultProps = {
	info: {
		title: "",
		version: "Unspecified"
	},
	host: "",
	basePath: "/",
	consumes: "",
	produces: "",
	paths: {}
};

export default class ApiComponent extends React.Component {

	determinePaths() {
		const paths = [];

		Object.keys(this.props.paths).forEach((pathName, index) => {
			const path = this.props.paths[pathName];
			let sharedParams = [];
			if (path.hasOwnProperty('parameters')) {
				sharedParams = sharedParams;
			}

			paths.push(<PathComponent path={path} name={pathName} parameters={sharedParams} key={index} />);
		});

		return paths;
	}

	render() {
		const paths = this.determinePaths();

		let allConsume = null;
		if (this.props.consumes != "") {
			allConsume = <div><b>All Endpoints Consume:</b> {this.props.consumes}</div>
		}

		let allProduce = null;
		if (this.props.produces != "") {
			allProduce = <div><b>All Endpoints Produce:</b> {this.props.produces}</div>
		}

		return (
			<div className="api-wrapper">
				<div className="header">
					<h3>{this.props.info.title}</h3>
					<div>Version {this.props.info.version}</div>
					<em dangerouslySetInnerHTML={{__html:this.props.info.description}} />
				</div>
				<div className="section general">
					<b>Base:</b> <code>{this.props.host + this.props.basePath}</code>
					{allConsume}
					{allProduce}
				</div>
				<div className="section paths">
					{paths}
				</div>
			</div>
		);
	}
}

ApiComponent.defaultProps = defaultProps;