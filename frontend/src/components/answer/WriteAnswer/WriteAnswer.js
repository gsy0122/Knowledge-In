import React, { Component } from 'react';
import axios from 'axios';
import styles from './WriteAnswer.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class WriteAnswer extends Component {
  state = {
    questionId: this.props.question_id,
    content: '',
    tags: [],
  };
  render() {
		const handleChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
		};
    let tag = '';
    const handleTagChange = e => {
      tag = e.target.value;
    };
    const handleTags = () => {
      this.setState({
        tags: [...this.state.tags, tag]
      });
      alert(tag);
      tag = '';
    };
    const handleSubmit = async () => {
      await axios
      .post('http://localhost:8000/answer', this.state, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
      .then(response => {
        alert('답변 작성 성공');
        console.log(JSON.stringify(response));
      })
      .catch(error => {
        console.log(error);
      });
    }
		return(
      <div className={cx('write-answer')}>
        <textarea name='content' onChange={handleChange} rows='20' cols='50' placeholder='질문 내용에 맞는 답변을 작성해 주세요.'></textarea><br/>
        태그 <input onChange={handleTagChange} /><button onChange={handleTags}>추가</button><br/>
				<button onClick={handleSubmit}>답변 등록</button>
      </div>
    );
  }
}

export default WriteAnswer;