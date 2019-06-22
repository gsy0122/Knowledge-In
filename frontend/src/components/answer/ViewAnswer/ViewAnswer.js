import React from 'react';
import axios from 'axios';
import styles from './ViewAnswer.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ViewAnswer = (props) => {
  const answer = props.answer;
  const a = props.a;
  const b = props.b;
  const remove = async () => {
    if (answer.isAdopted === 1) {
      alert('채택된 답변은 삭제할 수 없습니다.');
      return;
    }
    await axios
    .delete(`http://localhost:8000/answer/${answer._id}`, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })
    .then(response => {
      alert('답변이 삭제되었습니다.');
      console.log(JSON.stringify(response));
    })
    .catch(error => {
      console.log(error);
    });
  }
  const onAdopt = async () => {
    await axios
      .put(`http://localhost:8000/answer/adopt/${answer._id}`, {

      }, { 
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
      .then(response => {
        alert('채택되었습니다.');
        console.log(response);
      })
      .catch(error => {
        alert('채택에 실패하였습니다.');
        console.log(error);
      });
  }
  return(
    <div className={cx('view-answer')} key={answer._id}>
      {answer.isAdopted === 1 && <div>채택된 답변입니다.</div>}
      <div>{answer.member.name} ({answer.member.id}) 님의 답변</div>
      <div>{answer.content}</div>
      <div className={cx('answer-setting')}>
        {a && <button onClick={onAdopt}>채택</button>}
        {b && <button onClick={remove}>삭제</button>}
      </div>
    </div>
  );
}

export default ViewAnswer;