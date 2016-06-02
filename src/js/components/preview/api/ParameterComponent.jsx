import React from 'react';
import JSONTree from 'react-json-tree';
import { convertSchema } from './SchemaConverter.js';

const defaultProps = {
	name: "",
	in: "",
	description: "",
	required: false,
	type: ""
};

export default class ParameterComponent extends React.Component {
	parseDetail() {
		let output = "";

		if (this.props.in == "body") {
			output = <JSONTree data={convertSchema(this.props.schema)} />;
		}
		else {
			output = <div><b>Type:</b> {this.props.type}</div>;
		}

		return output;
	}
	render() {
		let requiredString = "No";
		if (this.props.required) {
			requiredString = "Yes";
		}

		const detail = this.parseDetail();

		return (
			<tr>
				<td className="wrappable">
					<code>{this.props.name}</code>
				</td>
				<td>{this.props.in}</td>
				<td>{this.props.description}</td>
				<td>{requiredString}</td>
				<td>{detail}</td>
			</tr>
		)
	}
}

ParameterComponent.defaultProps = defaultProps;