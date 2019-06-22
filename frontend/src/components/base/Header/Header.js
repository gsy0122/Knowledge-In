import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import styles from './Header.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Header extends Component {
  render() {
    return(
      <header className={cx('header')}>
        <div className={cx('title')}>
          지식iN
          {localStorage.getItem('token') ? 
            <button onClick={this.logout}>로그아웃</button> : 
            <button onClick={this.login}>로그인</button>
          }
        </div>
        <div className={cx('top-bar')}>
          <ul>
            <li><a href="/">홈</a></li>
            <li><a href="/question">질문하기</a></li>
            <li><a href="/qna">답변하기</a></li>
            <li><a href="/profile">프로필</a></li>
          </ul>
        </div>
      </header>
    );
  }
  
  login = () => {
    this.props.history.push('/auth/login');
  }

  logout = async () => {
    if (localStorage.getItem('token') === null) {
      alert('로그인 된 사용자가 없습니다.');
      return;
    }
    await axios
    .post('http://localhost:8000/member/logout', {device: localStorage.getItem('token')})
    .then(response => {
      alert('로그아웃에 성공하였습니다. 이용해 주셔서 감사합니다.');
      localStorage.removeItem('token');
      console.log(response);
      this.props.history.push('/');
    })
    .catch(error => {
      console.log(error);
    });
  }
}

export default withRouter(Header);