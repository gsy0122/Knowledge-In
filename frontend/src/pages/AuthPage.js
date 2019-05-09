import React from 'react';
import PageTemplate from '../components/common/PageTemplate';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

const AuthPage = ({ match }) => {
	const { kind } = match.params;
	return(
		<PageTemplate>
			{kind === 'login' ? <Login/> : <Register/>}
		</PageTemplate>
	);
}

export default AuthPage;
