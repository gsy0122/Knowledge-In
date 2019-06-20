import React, {Component} from 'react';
import PageTemplate from '../../common/PageTemplate';

import axios from 'axios';
import {withRouter} from 'react-router-dom';

class MemberSetting extends Component {
	state = {
    pw: '',
    // profile_image: '',
    status_message: '',
	}
	constructor(props) {
		super(props);
		this.state = {
			...this.state,
			pw: props.member.pw,
			status_message: props.member.statusMessage,
		}
	}
	render() {
		const member = this.props.member;
		return(
			<PageTemplate>
				<div>이름 {member.name}</div>
				<div>아이디 {member.id}</div>
				<div>비밀번호 <input type='password' name='pw' onChange={this.handleChange} /></div>
				<div>상태 메시지 <input name='status_message' value={this.state.status_message} onChange={this.handleChange} /></div>
        <div>이메일 {member.email}</div>
				<div>전화번호 {member.mobile}</div>
        <button onClick={this.update}>수정</button>
        <button onClick={this.remove}>탈퇴</button>
      	<button onClick={this.logout}>로그아웃</button>
			</PageTemplate>
		);
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	update = async () => {
		await axios
      .put(`http://localhost:8000/member/${this.props.member._id}`, this.state, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
      .then(response => {
        alert('멤버 수정 성공');
				console.log(JSON.stringify(response));
				this.props.history.push({pathname: '/profile'});
      })
      .catch(error => {
        alert('멤버 수정 실패');
        console.log(error);
      });
	};

	remove = async () => {
		await axios
    .delete(`http://localhost:8000/member/${this.props.member._id}`, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })
    .then(response => {
      alert('멤버 삭제 성공');
			console.log(JSON.stringify(response));
			localStorage.removeItem('token');
			this.props.history.push({pathname: '/'});
    })
    .catch(error => {
      console.log(error);
    });
	};

	logout = async () => {
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
}

export default withRouter(MemberSetting);
