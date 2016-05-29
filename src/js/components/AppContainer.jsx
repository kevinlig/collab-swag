import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../redux/store.js';
import RouterComponent from './RouterComponent.jsx';

const store = configureStore();

export default class AppContainer extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<RouterComponent />
			</Provider>
		)
	}
}