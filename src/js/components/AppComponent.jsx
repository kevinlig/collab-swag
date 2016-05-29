import React from 'react';
import NavComponent from './nav/NavComponent.jsx';
import BodyContainer from './BodyContainer.jsx';
import LoadingComponent from './LoadingComponent.jsx';

import uuid from 'node-uuid';
import { hashHistory } from 'react-router';

import * as FirebaseHelper from '../firebase/index.js';
import * as editorActions from '../redux/actions/editorActions.js';

const defaultProps = {
	params: {
		documentId: null
	}
};

export default class AppComponent extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			connected: false
		};
	}

	componentDidMount() {
		// connect to firebase
		FirebaseHelper.configure()
			.then(() => {
				this.setState({
					connected: true
				}, () => {
					this.handleOpenDocument();
				});
			});	
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.params.documentId != this.props.params.documentId && this.state.connected) {
			this.handleOpenDocument();
		}
	}

	handleOpenDocument() {
		if (this.props.params.documentId && this.props.params.documentId != "") {
			// open the document
			// update the redux document key
			const action = editorActions.setDocumentKey(this.props.params.documentId);
			this.context.store.dispatch(action);
		}
		else {
			// create a new document
			const newId = uuid.v4();
			// clear the redux store and set up a new document
			const action = editorActions.newDocument(newId);
			this.context.store.dispatch(action);

			// create the new document in Firebase
			FirebaseHelper.saveData(newId, '')
				.then(() => {
					hashHistory.push('/swag/' + newId);
				});
		}
	}


	render() {
		let app = <LoadingComponent />;
		if (this.state.connected && this.props.params.documentId) {
			app = <BodyContainer />;
		}
		return (
			<div className="app-wrap">
				<NavComponent />
				<div className="app-body">
					{app}
				</div>
			</div>
		);
	}
}


AppComponent.contextTypes = {
  store: React.PropTypes.object.isRequired
};