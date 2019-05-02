import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
	render() {
		return(
			<header className="App-header">
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