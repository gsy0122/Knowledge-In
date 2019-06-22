import React, { Component } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import {withRouter} from 'react-router-dom';

import styles from './Register.scss';

const cx = classNames.bind(styles);

class Register extends Component {
  state = {
    name: '',
    id: '',
    pw: '',
    email: '',
    mobile: '',
    profile_image: '',
    status_message: '',
  };
  render() {
    const handleChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
    const handleSubmit = async () => {
      await axios
        .post('http://localhost:8000/member', this.state)
        .then(response => {
          alert('가입이 완료되었습니다. 로그인 후 이용해 주세요.');
          console.log(JSON.stringify(response));
          this.props.history.push('/auth/login');
        })
        .catch(error => {
          console.log(error);
        });
    };
    return(
      <div className={cx('register')}>
        <div>지식iN</div>
        이름 <div><input name='name' onChange={handleChange} /></div>
        아이디 <div><input name='id' onChange={handleChange} /></div>
        비밀번호 <div><input name='pw' type='password' onChange={handleChange} /></div>
        이메일 <div><input name='email' onChange={handleChange} /></div>
        전화번호 <div><input name='mobile' onChange={handleChange} /></div>
        상태 메시지 <div><input name='status_message' onChange={handleChange} /></div>
        <button onClick={handleSubmit}>가입하기</button>
      </div>
    );
  }
};

export default withRouter(Register);