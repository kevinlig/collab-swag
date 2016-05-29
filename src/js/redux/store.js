import { createStore } from 'redux';
import rootReducer from './reducers/index.js';
import AppConfig from '../config.js';

const configureStore = (initialState) => {

	if (AppConfig.dev) {
		// only enable Redux debugging tools in debug mode
		return createStore(rootReducer, initialState,
			window.devToolsExtension && window.devToolsExtension()
		);
	}

	return createStore(rootReducer, initialState);
}

export default configureStore;