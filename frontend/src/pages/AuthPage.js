import React from 'react';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

const AuthPage = ({ match }) => {
  const { kind } = match.params;
  return(
    <div>
      {kind === 'login' ? <Login/> : <Register/>}
    </div>
  );
}

export default AuthPage;
