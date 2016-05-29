import React from 'react';
import SwaggerParser from 'swagger-parser';
import YAML from 'yamljs';

import PreviewContents from './PreviewContents.jsx';
import BlankPreview from './BlankPreview.jsx';

export default class PreviewComponent extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			showBlank: true,
			api: null,
			error: null
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.value != this.props.value) {
			this.parseSwagger();
		}
	}

	parseSwagger() {

		if (this.props.value == "") {
			this.setState({
				showBlank: true
			});
			return;
		}

		// first convert the YAML to JSON
		let jsonData = null;

		try {
			jsonData = YAML.parse(this.props.value);
		}
		catch (err) {
			// we couldn't parse the YAML, check if it's JSON
			try {
				jsonData = JSON.parse(this.props.value);
			}
			catch (err) {
				return;
			}
		}

		if (typeof jsonData !== 'object' ) {
			// still can't parse it give up
			return;
		}

		if (jsonData != null) {
			// now parse the Swagger
			SwaggerParser.validate(jsonData)
				.then((api) => {
					this.setState({
						showBlank: false,
						api: api,
						error: null
					});
				})
				.catch((err) => {
					this.setState({
						showBlank: false,
						error: err
					});
				});
		}
	}

	render() {
		let content = <BlankPreview />;
		if (!this.state.showBlank) {
			content = <PreviewContents error={this.state.error} api={this.state.api} />;
		}

		return (
			<div className="preview-wrap">
				{content}
			</div>
		)
	}
}