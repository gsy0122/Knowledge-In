import React from 'react';
import {withRouter, Link} from 'react-router-dom';

import QuestionListItem from './../QuestionListItem';

const QuestionList = ({questions, categories}) => {
  return(
    <div>
			<Link to='/qna'>전체</Link>
			{categories.map(category => (
				<div><Link to={`/qna/${category._id}`}>{category.name}</Link></div>
			))}
			{questions.map(question => (
        <QuestionListItem key={question._id} question={question} />
      ))}
		</div>
  );
}

export default withRouter(QuestionList);