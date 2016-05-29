import React from 'react';

const defaultProps = {
	title: "",
	description: ""
};

export default class ErrorComponent extends React.Component {
	render() {
		return (
			<div className="row">
				<div className="col s12">
					<div className="card red darken-4">
						<div className="card-content white-text">
							<span className="card-title">
								<i className="material-icons error-icon">warning</i>
								{this.props.title}
							</span>
							<div>
								{this.props.description}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

ErrorComponent.defaultProps = defaultProps;