import React from 'react';
import JSONTree from 'react-json-tree';

const defaultProps = {
	name: "",
	description: "",
	schema: {
		properties: {}
	},
	headers: {}
};

export default class ResponseComponent extends React.Component {
	render() {
		let headers = null;
		if (Object.keys(this.props.headers).length > 0) {
			headers = <div><h6>Headers</h6><JSONTree data={this.props.headers} /></div>;
		}

		let response = "No response body specified";
		if (Object.keys(this.props.schema.properties).length > 0) {
			response = <JSONTree data={this.props.schema.properties} />;
		}


		return (
			<div className="section">
				<h6>{this.props.name}</h6>
				{this.props.description}
				{headers}
				<div>
					<h6>Response</h6>
					{response}
				</div>
			</div>
		)
	}
}

ResponseComponent.defaultProps = defaultProps;