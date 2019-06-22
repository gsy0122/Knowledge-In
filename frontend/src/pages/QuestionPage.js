import React from 'react';
import QuestionContainer from './../containers/QuestionContainer/QuestionContainer';
import AnswerContainer from './../containers/AnswerContainer/AnswerContainer';
import PageTemplate from '../components/common/PageTemplate';

const QuestionPage = ({ match }) => (
  <PageTemplate>
    <QuestionContainer id={match.params.question_id} />
    <AnswerContainer question_id={match.params.question_id} />
  </PageTemplate>
);

export default QuestionPage;
