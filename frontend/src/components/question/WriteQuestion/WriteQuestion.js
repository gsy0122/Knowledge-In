import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import PageTemplate from '../../common/PageTemplate';
import styles from './WriteQuestion.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class WriteQuestion extends Component {
  state = {
    title: '',
    content: '',
    category: '',
    point: 0,
    anonymous: 1,
  };
  constructor(props) {
    super(props);

    if (this.props.question) {
      this.state = {
        title: this.props.question.title,
        content: this.props.question.content,
        category: this.props.question.categoryId,
        point: this.props.question.point,
        anonymous: this.props.question.anonymous,
      };
    }
  }
  render() {
    const categories = this.props.categories.map(category => {
      return <option key={category._id} value={category._id}>{category.name}</option>
    });
    return(
      <PageTemplate>
        <div className={cx('write-question')}>
          <div>
            <div className={cx('question-icon')}>Q</div>
            <input name='title' placeholder='궁금한 것을 물어 보세요.' 
             value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
          </div>
          <div>
            <textarea name='content' onChange={(e) => this.setState({ content: e.target.value })} rows='20' cols='50'
             value={this.state.content} placeholder='질문 내용에 맞는 답변을 작성해 주세요.'></textarea>
          </div>
          <div>
            카테고리
            <select onChange={(e) => this.setState({ category: e.target.value })}>
              <option selected hidden disabled>선택</option>
              {categories}
            </select>
          </div>
          <div>
            추가내공 
            <select id='point' onChange={(e) => this.setState({ point: e.target.value })}>
              <option value='0'>0</option>
              <option value='10'>10</option>
              <option value='20'>20</option>
              <option value='30'>30</option>
              <option value='40'>40</option>
              <option value='50'>50</option>
              <option value='60'>60</option>
              <option value='70'>70</option>
              <option value='80'>80</option>
              <option value='90'>90</option>
              <option value='100'>100</option>
            </select>
          </div>
          공개 설정 <input name='anonymous' type='checkbox' onClick={this.updateAnonymous} /><br/>
          <button onClick={this.post}>질문</button>
        </div>
      </PageTemplate>
    );
  }

  updateContent = (event, editor) => {
    this.setState({
        ...this.state,
        content: editor.getData(),
    });
  };
 
  updateAnonymous = e => {
    if (e.target.checked) {
      this.setState({
        ...this.state,
        anonymous: 0,
      });
    } else {
      this.setState({
        ...this.state,
        anonymous: 1,
      });
    }
  };

  post = async () => {
    if (this.props.question) {
      console.log(this.state);
      await axios
      .put(`http://localhost:8000/question/${this.props.question._id}`, this.state, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
      .then(response => {
        alert('질문이 수정되었습니다.');
        console.log(JSON.stringify(response));
        this.props.history.push({pathname: '/question/view/' + this.props.question._id});
      })
      .catch(error => {
        alert('질문이 수정되지 않았습니다.');
        console.log(error);
      });
    } else {
      console.log(this.state);
      await axios
      .post('http://localhost:8000/question', this.state, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
      .then(response => {
        alert('질문이 등록되었습니다.');
        console.log(JSON.stringify(response));
        const question = response.data.data;
        this.props.history.push({pathname: '/question/view/' + question._id});
      })
      .catch(error => {
        alert('질문이 등록되지 않았습니다.');
        console.log(error);
      });
    }
  }
}

export default withRouter(WriteQuestion);
