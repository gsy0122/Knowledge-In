import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import './AnswerContainer.scss';
import ViewAnswer from '../../components/answer/ViewAnswer';
import WriteAnswer from '../../components/answer/WriteAnswer';

@inject('stores')
@observer
class AnswerContainer extends Component {
  componentDidMount() {
    this.props.stores.AnswerStore.getAnswers(this.props.question_id); 
  }
  componentDidUpdate(nextProps, nextState){
    if (this.props !== nextProps) {
      this.props.stores.AnswerStore.getAnswers(this.props.question_id); 
    }
  }
  render() {
    const answers = this.props.stores.AnswerStore.answers;
    const question = this.props.stores.QuestionStore.question;
    const member = this.props.stores.MemberStore.member;
    if (! question.member) return <div/>
    return(
      <div>
        {answers.map(answer => (
          <ViewAnswer key={answer._id} answer={answer}
           a={question.member._id === member._id && question.answer === null} b={answer.member._id === member._id} />
        ))}
        {(question.member._id !== member._id && question.answer === null) 
          && <WriteAnswer question_id={this.props.question_id} />}
      </div> 
    );
  };
}

export default AnswerContainer;
