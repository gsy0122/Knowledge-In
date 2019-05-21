import React from 'react';
import PageTemplate from '../../common/PageTemplate';
import {withRouter} from 'react-router-dom';

const QuestionList = ({questions, history}) => {
  const handleClick = (question) => {
    history.push({pathname: '/viewQuestion/' + question._id});
  }

  return(
    <PageTemplate>
      {questions.map(question => (
        <p onClick={handleClick.bind(this, question)}>{question.title} | {question.category}</p>
      ))}
    </PageTemplate>
  );
}

export default withRouter(QuestionList);