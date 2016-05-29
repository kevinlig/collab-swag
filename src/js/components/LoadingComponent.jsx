import React from 'react';
import NavComponent from './nav/NavComponent.jsx';

export default class LoadingComponent extends React.Component {
	render() {
		return (
			<div className="editor-wrapper">
				<div className="not-found-wrapper">
					<div className="not-found-content">
						<i className="material-icons icon">settings_remote</i>
						<h3>Connecting...</h3>
					</div>
				</div>
			</div>
		)
	}
}