import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router';

import AppComponent from './AppComponent.jsx';
import NotFoundComponent from './NotFoundComponent.jsx';

export default class RouterComponent extends React.Component {
	render() {
		return (
			<Router history={hashHistory}>
				<Route path="/swag/:documentId" component={AppComponent} />
				<Route path="/swag/" component={AppComponent} />
				<Route path="/" component={AppComponent} />
				<Route path="*" component={NotFoundComponent} />
			</Router>
		)
	}
}