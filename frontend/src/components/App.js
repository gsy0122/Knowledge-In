import React, { Component } from 'react';
import './App.css';
import Header from './Header';

class App extends Component {
  render() {
    return (
        <Header />
    );
  }

  _renderLogin() {
    return (
      <div>
        <input id="id" />
        <input id="pw" />
        <button onClick="signUp()">회원가입</button>
        <button onClick="signIn()">로그인</button>
      </div>
    );
  }
}

export default App;
