import React from 'react';
import ParameterComponent from './ParameterComponent.jsx';

const defaultProps = {
	parameters: {}
};

export default class ParameterTable extends React.Component {
	parseParams() {
		const params = [];

		this.props.parameters.forEach((param, index) => {
			params.push(<ParameterComponent key={index} {...param} />);
		});

		return params;
	}

	render() {
		const params = this.parseParams();
		return (
			<table className="striped">
				<thead>
					<tr>
						<th style={{width: "15%"}}>Name</th>
						<th style={{width: "10%"}}>Located In</th>
						<th>Description</th>
						<th style={{width: "10%"}}>Required</th>
						<th style={{width: "40%"}}>Details</th>
					</tr>
				</thead>
				<tbody>
					{params}
				</tbody>
			</table>
		)
	}
}

ParameterTable.defaultProps = defaultProps;