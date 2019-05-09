import React from 'react';

const Register = () => {
	return(
		<div>
			이름 <input /><br />
			아이디 <input /><br />
			비밀번호 <input type='password' /><br />
			이메일 <input /><br />
			전화번호 <input /><br />
			프로필 사진 <input type='file' /><br />
		  상태 메시지 <input /><br />
			<button>회원가입</button>
		</div>
	);
};

export default Register;