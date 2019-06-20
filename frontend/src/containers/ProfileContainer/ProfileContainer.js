import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import {withRouter} from 'react-router-dom';

import './ProfileContainer.scss';
import MemberPane from '../../components/member/MemberPane';
import MemberSetting from '../../components/member/MemberSetting';

@inject('stores')
@observer
class ProfileContainer extends Component {
	componentDidMount() {
    this.props.stores.MemberStore.getMember();
	}
  render() {
    const member = this.props.stores.MemberStore.member;
    console.log(member);
    
    if (this.props.match && this.props.match.params.member_id) {
      return <MemberSetting member={member} />
    }
    return (
      <MemberPane member={member} />
    );
  }
}

export default withRouter(ProfileContainer);
