import React from 'react';
import axios from 'axios';
import './Login.scss';
import {withRouter} from 'react-router-dom';

const Login = ({history}) => {
  const [id, setId] = React.useState('');
  const [pw, setPw] = React.useState('');
  const handleLogin = async () => {
    await axios
      .post('http://localhost:8000/auth/login', {id, pw})
      .then(response => {
        alert('로그인 성공');
        localStorage.setItem('token', response.data.data.token);
        history.push({pathname: '/profile'});
      })
      .catch(error => {
        alert('로그인 실패');
        console.log(error);
      });
  };
  const handleLogout = async () => {
    if (localStorage.getItem('token') === null) {
      alert('로그아웃 실패');
      return;
    }
    await axios
    .post('http://localhost:8000/member/logout', {device: localStorage.getItem('token')})
    .then(response => {
      alert('로그아웃 성공');
      localStorage.removeItem('token');
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  }

  return(
    <div className='login'> 
      <input name="id" placeholder="ID" value={id} onChange={e => { setId(e.target.value); }}/>
      <input name="pw" placeholder="PASSWORD" value={pw} type="password" onChange={e => { setPw(e.target.value); }} />
      <button onClick={handleLogin}>LOGIN</button> 
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  );
}

export default withRouter(Login);