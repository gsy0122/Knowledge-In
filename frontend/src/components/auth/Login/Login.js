import React from 'react';
import './Login.scss';

const Login = () => {
	const [id, setId] = React.useState('');
	const [pw, setPw] = React.useState('');
	return(
		<div className='login'> 
			<input name="id" placeholder="ID" value={id} onChange={e => { setId(e.target.value); }}/>
			<input name="pw" placeholder="PASSWORD" value={pw} type="password" onChange={e => { setPw(e.target.value); }} />
			<button>LOGIN</button> 
		</div>
	); // onClick 시 서버에서 member post
}

export default Login;