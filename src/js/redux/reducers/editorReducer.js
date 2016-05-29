const initialState = {
	value: '',
	key: ''
};

export const editorReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_EDITOR_VALUE':
			return Object.assign({}, state, {
				value: action.value
			});
		case 'SET_DOCUMENT_KEY':
			return Object.assign({}, state, {
				key: action.key
			});
		case 'NEW_DOCUMENT':
			return Object.assign({}, state, {
				value: '',
				key: action.key
			});
		default:
			return state;
	}
}