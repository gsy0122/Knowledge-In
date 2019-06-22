import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import './QuestionContainer.scss';
import ViewQuestion from '../../components/question/ViewQuestion';

@inject('stores')
@observer
class QuestionContainer extends Component {
  componentDidMount() {
    this.props.stores.QuestionStore.getQuestion(this.props.id);
    this.props.stores.MemberStore.getMember();
  }
  render() {
    const question = this.props.stores.QuestionStore.question;
    const member = this.props.stores.MemberStore.member;
    if (! question.member) return <div/>;
    return(
      <ViewQuestion question={question} member={member} />
    );
  };
}

export default QuestionContainer;
