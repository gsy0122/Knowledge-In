import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  state = {
    name: '',
    id: '',
    pw: '',
    email: '',
    mobile: '',
    profile_image: '',
    state_message: '',
  };
  render() {
    const handleChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
    const handleImageChange = e => {
      this.setState({
        profile_image: e.target.files[0],
      });
    };
    const handleSubmit = async () => {
      await axios
        .post('http://localhost:8000/member', this.state)
        .then(response => {
          alert('회원가입 성공');
          console.log(JSON.stringify(response));
        })
        .catch(error => {
          console.log(error);
        });
    };
    return(
      <div>
        이름 <input name='name' onChange={handleChange} /><br />
        아이디 <input name='id' onChange={handleChange} /><br />
        비밀번호 <input name='pw' type='password' onChange={handleChange} /><br />
        이메일 <input name='email' onChange={handleChange} /><br />
        전화번호 <input name='mobile' onChange={handleChange} /><br />
        프로필 사진 <input name='profile_image' type='file' onChange={handleImageChange} /><br />
        상태 메시지 <input name='state_message' onChange={handleChange} /><br />
        <button onClick={handleSubmit}>회원가입</button>
      </div>
    ); // onClick 시 서버에서 member post
  }
};

export default Register;