import React from 'react';
import {withRouter} from 'react-router-dom';
import styles from './QuestionListItem.scss';
import classNames from 'classnames/bind';
import { toJS } from 'mobx';

const cx = classNames.bind(styles);

const QuestionListItem = ({question, history}) => {
  console.log(toJS(question.category));
  const handleClick = () => {
    history.push({pathname: '/question/view/' + question._id});
  }
  return(
    <div className={cx('question-list-item')} onClick={handleClick}>
      <div>{question.title}</div>
      <div>{question.category.name}</div>
    </div>
  );
}

export default withRouter(QuestionListItem);