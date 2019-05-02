import React, { Component } from 'react';
import styles from './LoginContainer.scss';
import Classnames from 'classnames/bind';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react'

import Header from '../../components/common/Header';

const cx = Classnames.bind(styles);

@inject("memberStore")
@observer
class LoginContainer extends Component {
  @observable id = '';
  @observable pw = '';
  
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }
  
  render() {
    const { id, pw } = this;
    return (
			<div className={cx('login')}> 
        <Header />
        <input name="id" placeholder="ID" value={id} onChange={this.onChange}></input>
        <input type="password" name="pw" placeholder="PASSWORD" value={pw} onChange={this.onChange}></input>
        <button onClick={this.onClick}>LOGIN</button>
        <div>
          <p>로그인 목록</p>
          {this.props.memberStore.members.map((member) => {
            return (
              <div>
                <p>{member.id}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  
  @action.bound
  onChange(event) {
    const { name, value } = event.target;
    this[name] = value;
  }

  onClick() {
    const { id, pw } = this;
    this.props.memberStore.createMember({ id, pw })
  }
}

export default LoginContainer;
