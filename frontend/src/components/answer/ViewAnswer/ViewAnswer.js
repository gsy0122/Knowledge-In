import React from 'react';
import axios from 'axios';

const ViewAnswer = (props) => {
  const onAdopt = async (answer) => {
    await axios
      .put(`http://localhost:8000/answer/adopt/${answer._id}`, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
      .then(response => {
        alert('채택 성공');
        console.log(response);
      })
      .catch(error => {
        alert('채택 실패');
        console.log(error);
      });
  }
  return(
    <div>
      답변
      {props.answers.map(answer => (
        <div>
          <p key={answer._id}>{answer.content}</p>
          <button onClick={onAdopt.bind(this, answer)}>채택</button>
        </div>
      ))}
    </div>
  );
}

export default ViewAnswer;