export const setEditorValue = (state) => ({
	type: 'SET_EDITOR_VALUE',
	value: state
});

export const setDocumentKey = (state) => ({
	type: 'SET_DOCUMENT_KEY',
	key: state
});

export const newDocument = (state) => ({
	type: 'NEW_DOCUMENT',
	key: state
})