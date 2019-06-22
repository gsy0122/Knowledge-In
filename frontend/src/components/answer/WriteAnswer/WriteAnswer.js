import React, { Component } from 'react';
import axios from 'axios';
import styles from './WriteAnswer.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class WriteAnswer extends Component {
  state = {
    question: this.props.question_id,
    content: '',
  };
  render() {
    const handleChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    };
    const handleSubmit = async () => {
      await axios
      .post('http://localhost:8000/answer', this.state, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
      .then(response => {
        alert('답변 등록에 성공하였습니다.');
        console.log(JSON.stringify(response));
      })
      .catch(error => {
        alert('답변 등록에 실패하였습니다.');
        console.log(error);
      });
    }
    return(
      <div className={cx('write-answer')}>
        <textarea name='content' onChange={handleChange} rows='20' cols='50'
         placeholder='질문 내용에 맞는 답변을 작성해 주세요.'></textarea><br/>
        <button onClick={handleSubmit}>답변 등록</button>
      </div>
    );
  }
}

export default WriteAnswer;