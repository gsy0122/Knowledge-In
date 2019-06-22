import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import {withRouter} from 'react-router-dom';

import './ProfileContainer.scss';
import MemberPane from '../../components/member/MemberPane';
import MemberSetting from '../../components/member/MemberSetting';
import PageTemplate from '../../components/common/PageTemplate';

@inject('stores')
@observer
class ProfileContainer extends Component {
  componentDidMount() {
    this.props.stores.MemberStore.getMember();
  }
  render() {
    const member = this.props.stores.MemberStore.member;
    if (this.props.match && this.props.match.params.member_id) {
      return (
        <PageTemplate>
          <MemberSetting member={member} />
        </PageTemplate>
      );
    }
    return (
      <PageTemplate>
        <MemberPane member={member} />
      </PageTemplate>
    );
  }
}

export default withRouter(ProfileContainer);
