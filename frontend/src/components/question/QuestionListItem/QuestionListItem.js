import React from 'react';
import {withRouter} from 'react-router-dom';

import './QuestionListItem.scss';

const QuestionListItem = ({question, history}) => {
  const handleClick = () => {
    history.push({pathname: '/question/view/' + question._id});
  }
  return(
    <div className='question-list-item' onClick={handleClick}>
      <div>{question.title}</div>
      <div>{question.categoryId}</div>
    </div>
  );
}

export default withRouter(QuestionListItem);