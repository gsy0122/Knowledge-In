import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import styles from './ViewQuestion.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ViewQuestion = (props) => {
  const question = props.question;
  const member = props.member;
  if (! question && ! member) return <div />;
  console.log(question.member);
  
  const update = () => {
    if (question.answerCount !== 0) {
      alert('답변이 작성된 질문은 수정할 수 없습니다.');
      return;
    }
    props.history.push({pathname: '/question/' + question._id});
  }
  const remove = async () => {
    if (question.answerCount !== 0) {
      alert('답변이 작성된 질문은 삭제할 수 없습니다.');
      return;
    }
    console.log(question);
    await axios
    .delete(`http://localhost:8000/question/${question._id}`, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })
    .then(response => {
      alert('질문이 삭제되었습니다.');
      console.log(JSON.stringify(response));
      props.history.push({pathname: '/qna'});
    })
    .catch(error => {
      console.log(error);
    });
  }
  return(
    <div className={cx('view-question')}>
      <div className={cx('question-title')}>
        <div className={cx('question-icon')}>Q</div>
        <div className={cx('question-point')}>{question.point}</div>
        <div>{question.title}</div>
      </div>
      <div dangerouslySetInnerHTML={{__html:question.content}} />
      <div className={cx('question-info')}>
        {question.anonymous === 1 ? <div>익명</div> : <div>{question.member.name} ({question.member.id})</div>}
      </div>
      {(question.member._id === member._id) && <div className={cx('question-setting')}>
        <button onClick={update}>수정</button>
        <button onClick={remove}>삭제</button>
      </div>}
    </div>
  );
}

export default withRouter(ViewQuestion);