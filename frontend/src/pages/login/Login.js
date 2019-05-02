import React, { Component } from 'react';
import styles from './Login.scss';
import Classnames from 'classnames/bind';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react'

const cx = Classnames.bind(styles);

@observer
class Login extends Component {
  
  @observable id = '';
  @observable pw = '';
  
  render() {
    const { id, pw } = this;
    return (
			<div className={cx('login')}> 
        
			</div>
    );
  }
}

export default Login;
