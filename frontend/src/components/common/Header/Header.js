import React, { Component } from 'react';
import styles from './Header.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Header extends Component {
	render() {
		return(
			<header className={cx('header')}>
        <ul>
          <li><a href="/">Q&A</a></li>
          <li><a href="/question">질문하기</a></li>
          <li><a href="/answer">답변하기</a></li>
          <li><a href="/profile">프로필</a></li>
        </ul>
      </header>
		);
	}
}

export default Header;