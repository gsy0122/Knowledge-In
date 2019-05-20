import React from 'react';
import axios from 'axios';
import './Login.scss';

const Login = () => {
  const [id, setId] = React.useState('');
  const [pw, setPw] = React.useState('');
  const handleSubmit = async () => {
    await axios
      .post('http://localhost:8000/auth/login', {id, pw})
      .then(response => {
        alert('로그인 성공');
        console.log(JSON.stringify(response));
      })
      .catch(error => {
        console.log(error);
      });
  };

  return(
    <div className='login'> 
      <input name="id" placeholder="ID" value={id} onChange={e => { setId(e.target.value); }}/>
      <input name="pw" placeholder="PASSWORD" value={pw} type="password" onChange={e => { setPw(e.target.value); }} />
      <button onClick={handleSubmit}>LOGIN</button> 
    </div>
  );
}

export default Login;