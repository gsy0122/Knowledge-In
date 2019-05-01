import React, { Component } from 'react';

class Header extends Component {
	render() {
		return(
			<header className="App-header">
        <ul>
          <li><a href="">Q&A</a></li>
          <li><a href="">질문하기</a></li>
          <li><a href="">답변하기</a></li>
          <li><a href="">프로필</a></li>
        </ul>
      </header>
		);
	}
}

export default Header;