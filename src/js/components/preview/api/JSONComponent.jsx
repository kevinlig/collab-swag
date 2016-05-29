import React from 'react';

export default class JSONComponent extends React.Component {
	render() {
		return (
			<code dangerouslySetInnerHTML={{__html: JSON.stringify(this.props.value, null, 2).replace("\n","<br />")}} />
		)
	}
}