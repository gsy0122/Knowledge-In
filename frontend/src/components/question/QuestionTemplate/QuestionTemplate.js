import React, { Component } from 'react';
import styles from './QuestionTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class QuestionTemplate extends Component {
	render() {
		return(
			<div className={cx('question-template')}>
				
			</div>
		);
	}
}

export default QuestionTemplate;
