import React, { Component } from 'react';
import styles from './QuestionOption.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class QuestionOption extends Component {
  render() {
    return(
      <div className={cx('question-option')}>
        태그 <input value='#' /><button>추가</button><br/>
        추가 내공 
        <select>
          <option value='0'>0</option>
          <option value='10'>10</option>
          <option value='20'>20</option>
          <option value='30'>30</option>
          <option value='40'>40</option>
          <option value='50'>50</option>
          <option value='60'>60</option>
          <option value='70'>70</option>
          <option value='80'>80</option>
          <option value='90'>90</option>
          <option value='100'>100</option>
        </select><br/>
        공개 설정 <input type='checkbox'/><br/>
        <button>질문</button>
      </div>
    );
  }
}

export default QuestionOption;
