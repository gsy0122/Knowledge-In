import React, { Component } from 'react';
import styles from './WriteAnswer.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class WriteAnswer extends Component {
  render() {
		const handleSubmit = () => {

		}
		return(
      <div className={cx('write-answer')}>
        <textarea name='content' rows='20' cols='50' placeholder='질문 내용에 맞는 답변을 작성해 주세요.'></textarea><br/>
        태그 <input /><button>추가</button><br/>
				<button onClick={handleSubmit}>답변 등록</button>
      </div>
    );
  }
}

export default WriteAnswer;