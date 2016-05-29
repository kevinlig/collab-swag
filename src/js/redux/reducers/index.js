import { combineReducers } from 'redux';
import { editorReducer } from './editorReducer.js';

const rootReducer = combineReducers({
	editor: editorReducer
});

export default rootReducer;