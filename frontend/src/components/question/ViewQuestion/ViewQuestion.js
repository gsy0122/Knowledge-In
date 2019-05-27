import React from 'react';

const ViewQuestion = (props) => {
	const question = props.question;
  return(
    <div>
      <p>Q. {question.title}</p>
      <p>내공 {question.point}</p>
      <p>{question.content}</p>
    </div>
  );
}

export default ViewQuestion;