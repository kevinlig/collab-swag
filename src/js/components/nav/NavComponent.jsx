import React from 'react';

export default class NavComponent extends React.Component {
	render() {
		return (
			<nav className="orange darken-2">
				<div className="nav-wrapper">
					<div className="brand-logo">
						Collab Swag
					</div>
					<ul className="right hide-on-med-and-down">
						<li>
							<a href="#/" className="waves-effect waves-light btn blue darken-1">
								New Document
							</a>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}