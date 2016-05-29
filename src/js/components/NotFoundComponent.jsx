import React from 'react';
import NavComponent from './nav/NavComponent.jsx';

export default class NotFoundComponent extends React.Component {
	render() {
		return (
			<div className="app-wrap">
				<NavComponent />
				<div className="app-body">
					<div className="editor-wrapper">
						<div className="not-found-wrapper">
							<div className="not-found-content">
								<i className="material-icons icon">mood_bad</i>
								<h3>That doesn't exist</h3>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}