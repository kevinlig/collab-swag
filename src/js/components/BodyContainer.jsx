import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import * as editorActions from '../redux/actions/editorActions.js';

import BodyComponent from './BodyComponent.jsx';

import * as FirebaseHelper from '../firebase/index.js';
import firebase from 'firebase/app';
import 'firebase/database';

class BodyContainer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			editor: ''
		};
	}
	componentDidMount() {
		if (this.props.editor.key) {
			this.listenForChanges();
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.editor.key != this.props.editor.key) {
			this.listenForChanges();
		}
	}

	listenForChanges() {
		firebase.database().ref('documents/' + this.props.editor.key + '/value')
			.on('value', (snapshot) => {
				// check if snapshot exists
				if (snapshot.exists()) {
					this.remoteEditorChange(snapshot);
				}
				else {
					// snapshot doesn't exist, show an error message
					hashHistory.push('/404');
				}
			});
	}

	remoteEditorChange(snapshot) {
		this.props.setEditorValue(snapshot.val());
	}

	editorChanged(text) {
		this.props.setEditorValue(text);
		FirebaseHelper.saveData(this.props.editor.key, this.props.editor.value);
	}

	render() {
		return (
			<BodyComponent {...this.props} editorChanged={this.editorChanged.bind(this)} />
		)
	}
}

export default connect(
	state => ({ editor: state.editor }),
	dispatch => bindActionCreators(editorActions, dispatch)
)(BodyContainer);