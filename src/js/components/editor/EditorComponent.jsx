import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import $ from 'jquery';

// import the theme and mode
import { yaml } from 'brace/mode/yaml';
import { tomorrow_night } from 'brace/theme/tomorrow_night';

export default class EditorComponent extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			height: 0,
			width: 0,
			selection: {}
		};
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleResize.bind(this));
		this.setState({
			height: $(".editor").height(),
			width: $(".editor").width()
		});

		this.refs.editor.editor.$blockScrolling = Infinity;
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize.bind(this));
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.editorValue != this.props.editorValue) {
			// editor value is about to change
			this.saveCursor();
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.editorValue != this.props.editorValue) {
			// editor value has changed, restore cursor
			this.restoreCursor();
		}
	}

	saveCursor() {
		const editor = this.refs.editor.editor;
		this.setState({
			selection: editor.selection.getRange()
		});
	}

	restoreCursor() {
		const editor = this.refs.editor.editor;
		editor.selection.setSelectionRange(this.state.selection);
	}

	handleResize(e) {

		// divs won't get smaller if the window does
		let width = $(".editor").width();
		let height = $(".editor").height();

		const navHeight = $("nav").height();

		if ((window.innerWidth / 2) < width) {
			width = window.innerWidth / 2;
		}
		if (window.innerHeight - navHeight < height) {
			height = window.innerHeight - navHeight;
		}
		this.setState({
			height: height,
			width: width
		});
	}

	handleChange(newValue) {
		this.props.editorChanged(newValue);
	}

	render() {
		return (
			<div className="editor">
				<AceEditor
					ref="editor"
					mode="yaml"
					theme="tomorrow_night"
					name="swagedit"
					height={this.state.height + "px"}
					width={this.state.width + "px"}
					value={this.props.editorValue}
					cursorStart={5}
					onChange={this.handleChange.bind(this)} />
			</div>
		);
	}
}