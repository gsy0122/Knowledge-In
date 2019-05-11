import React, { Component } from 'react';
import styles from './QuestionPane.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class QuestionPane extends Component {
  render() {
    return(
      <div className={cx('question-pane')}>
        질문 <input /><br/>
        <textarea rows='20' cols='50' placeholder="답변이 등록되면 질문 수정 및 삭제가 불가능합니다."></textarea><br/>
        <button>다음 단계</button>
      </div>
    );
  }
}

export default QuestionPane;