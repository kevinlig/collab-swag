import React from 'react'
import ResponseComponent from './ResponseComponent.jsx';
import ParameterTable from './ParameterTable.jsx';

const defaultProps = {
	name: "",
	summary: "",
	description: "",
	parameters: [],
	consumes: "",
	produces: "",
	responses: {}
};

export default class MethodComponent extends React.Component {
	
	parseResponses() {
		const responses = [];

		Object.keys(this.props.responses).forEach((key, index) => {
			const response = this.props.responses[key];
			responses.push(<ResponseComponent key={index} name={key} {...response} />);
		});

		return responses;
	}

	render() {
		const responses = this.parseResponses();

		let consume = null;
		if (this.props.consumes != "") {
			consume = <div><b>Consumes:</b> {this.props.consumes}</div>;
		}

		let produce = null;
		if (this.props.produces != "") {
			produce = <div><b>Produces:</b> {this.props.produces}</div>;
		}

		let description = null;
		if (this.props.description != "") {
			description = <div className="details">{this.props.description}</div>;
		}

		let parameters = "No request parameters specified";
		if (this.props.parameters.length > 0) {
			parameters = <ParameterTable parameters={this.props.parameters} />;
		}

		return (
			<div className="api-method section">
				<div className={"method-badge " + this.props.name}>{this.props.name.toUpperCase()}</div>
				<div className="details">
					{this.props.summary}
				</div>
				{description}
				<h5 className="section">Parameters</h5>
				{parameters}
				{consume}

				<h5 className="section">Responses</h5>
				{produce}
				{responses}
			</div>
		);
	}
}

MethodComponent.defaultProps = defaultProps;