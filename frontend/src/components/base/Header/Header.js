import React, { Component } from 'react';
import styles from './Header.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Header extends Component {
	render() {
		return(
			<header className={cx('header')}>
        <ul>
          <li><a href="/">홈</a></li>
          <li><a href="/qna">Q&A</a></li>
          <li><a href="/question">질문하기</a></li>
          <li><a href="/answer">답변하기</a></li>
          <li><a href="/profile">프로필</a></li>
          <li><a href="/auth/register">회원가입</a></li>
          <li><a href="/auth/login">로그인</a></li>
        </ul>
      </header>
		);
	}
}

export default Header;