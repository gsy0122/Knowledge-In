import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

import './ProfileContainer.scss';
import MemberPane from '../../components/member/MemberPane';

@inject('memberStore')
@observer
class ProfileContainer extends Component {
	componentDidMount() {
		this.props.memberStore.getMember();
	}
  render() {
    return (
      <div>
        <MemberPane member={this.props.memberStore.member} />
      </div>
    );
  }
}

export default ProfileContainer;
