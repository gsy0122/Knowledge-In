import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import './QuestionContainer.scss';
import ViewQuestion from '../../components/question/ViewQuestion';

@inject('stores')
@observer
class QuestionContainer extends Component {
  componentDidMount() {
    this.props.stores.MemberStore.getMember();
    this.props.stores.QuestionStore.getQuestion(this.props.id);
  }
  render() {
    return(
      <ViewQuestion question={this.props.stores.QuestionStore.question} member={this.props.stores.MemberStore.member} />
    );
  };
}

export default QuestionContainer;
