import React, { Component } from 'react';

class Question extends Component {
	render() {
		return(
			<div>
				<input placeholder="제목"></input>
				<input placeholder="내용"></input>
			</div>
		);
	}
}

export default Question;