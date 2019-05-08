import React, { Component } from 'react';
import styles from './LoginContainer.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class QuestionContainer extends Component {
	render() {
		return(
			<div classNames={cx('question')}>
				
			</div>
		);
	};
}

export default QuestionContainer;