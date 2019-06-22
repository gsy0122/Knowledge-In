import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import styles from './QuestionList.scss';
import classNames from 'classnames/bind';

import QuestionListItem from './../QuestionListItem';

const cx = classNames.bind(styles);

const QuestionList = ({questions, categories}) => {
  return(
    <div className={cx('question-list')}>
      <div className={cx('category-list')}>
        <div><Link to='/qna'>전체</Link></div>
        {categories.map(category => (
          <div><Link to={`/qna/${category._id}`}>{category.name}</Link></div>
        ))}
      </div>
      <div>
        {questions.map(question => (
          <QuestionListItem key={question._id} question={question} />
        ))}
      </div>
    </div>
  );
}

export default withRouter(QuestionList);