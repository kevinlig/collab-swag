import React from 'react';
import JSONTree from 'react-json-tree';

const defaultProps = {
	name: "",
	description: "",
	schema: {
		type: "",
		properties: {}
	},
	headers: {}
};

export default class ResponseComponent extends React.Component {
	parseResponse() {

		let response = "No response body specified";

		if (this.props.schema.hasOwnProperty("type") && this.props.schema.type == "array") {
			// it's an array
			response = <JSONTree data={[this.props.schema.items.properties]} />;
		}
		else if (this.props.schema.hasOwnProperty("properties") && Object.keys(this.props.schema.properties).length > 0) {
			// it's an object
			response = <JSONTree data={this.props.schema.properties} />;
		}

		return response;
	}

	requiredFields() {
		let required = null;

		let i = 0;

		if (this.props.schema.hasOwnProperty("type") && this.props.schema.type == "array" && this.props.schema.items.hasOwnProperty('required')) {
			// it's an array
			required = '';
			this.props.schema.items.required.forEach((req) => {
				if (required != '') {
					required += ', ';
				}
				required += req;
			});
		}
		else if (this.props.schema.hasOwnProperty("properties") && Object.keys(this.props.schema.properties).length > 0 && this.props.schema.hasOwnProperty('required')) {
			// it's an object
			required = '';
			this.props.schema.required.forEach((req) => {
				if (required != '') {
					required += ', ';
				}
				required += req;
			});
		}

		return required;
	}

	render() {
		let headers = null;
		if (Object.keys(this.props.headers).length > 0) {
			headers = <div><h6>Headers</h6><JSONTree data={this.props.headers} /></div>;
		}

		const response = this.parseResponse();

		const required = this.requiredFields();
		let requiredDisplay = null;
		if (required) {
			requiredDisplay = <div><b>Required Fields:</b> {required}</div>;
		}

		return (
			<div className="section">
				<h6>{this.props.name}</h6>
				{this.props.description}
				{headers}
				<div>
					<h6>Response</h6>
					{requiredDisplay}
					{response}
				</div>
			</div>
		)
	}
}

ResponseComponent.defaultProps = defaultProps;