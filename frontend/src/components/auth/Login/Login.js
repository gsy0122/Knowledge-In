import React from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import {withRouter} from 'react-router-dom';

import styles from './Login.scss';

const cx = classNames.bind(styles);

const Login = ({history}) => {
  const [id, setId] = React.useState('');
  const [pw, setPw] = React.useState('');
  const handleLogin = async () => {
    if (id === '') {
      alert('아이디를 입력해 주세요.');
      return;
    }
    if (pw === '') {
      alert('비밀번호를 입력해 주세요.');
      return;
    }
    await axios
      .post('http://localhost:8000/auth/login', {id, pw})
      .then(response => {
        alert(id + '님, 환영합니다!');
        localStorage.setItem('token', response.data.data.token);
        history.push({pathname: '/'});
      })
      .catch(error => {
        alert('로그인에 실패하였습니다. 다시 입력해 주세요.');
        console.log(error);
      });
  };
  const handleRegister = async () => {
    history.push('/auth/register');
  }
  return(
    <div className={cx('login')}>
      <div>지식iN</div>
      <div><input name="id" placeholder="아이디" value={id} onChange={e => { setId(e.target.value); }}/></div>
      <div><input name="pw" placeholder="비밀번호" value={pw} type="password" onChange={e => { setPw(e.target.value); }} /></div>
      <button onClick={handleLogin}>로그인</button><br />
      <p onClick={handleRegister}>회원이 아니신가요?</p>
    </div>
  );
}

export default withRouter(Login);