import React, {Component} from 'react';
import styles from './MemberSetting.scss';
import classNames from 'classnames/bind';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

const cx = classNames.bind(styles);

class MemberSetting extends Component {
  state = {
    pw: '',
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
      <div className={cx('member-setting')}>
        <div>이름 {member.name}</div>
        <div>아이디 {member.id}</div>
        <div>비밀번호 <input type='password' name='pw' onChange={this.handleChange} /></div>
        <div>상태 메시지 <input name='status_message' value={this.state.status_message} onChange={this.handleChange} /></div>
        <div>이메일 {member.email}</div>
        <div>전화번호 {member.mobile}</div>
        <div>
          <button onClick={this.update}>수정</button>
          <p onClick={this.remove}>탈퇴하시겠습니까?</p>
        </div>
      </div>
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
        alert('프로필 수정에 성공하였습니다.');
        console.log(JSON.stringify(response));
        this.props.history.push({pathname: '/profile'});
      })
      .catch(error => {
        alert('프로필 수정에 실패하였습니다.');
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
      alert('회원 탈퇴에 성공하였습니다. 이용해 주셔서 감사합니다.');
      console.log(JSON.stringify(response));
      localStorage.removeItem('token');
      this.props.history.push({pathname: '/'});
    })
    .catch(error => {
      alert('회원 탈퇴에 실패하였습니다. 못 나간다!');
      console.log(error);
    });
  };
}

export default withRouter(MemberSetting);
