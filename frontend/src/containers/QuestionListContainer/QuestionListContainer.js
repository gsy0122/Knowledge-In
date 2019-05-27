import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import './QuestionListContainer.scss';
import QuestionList from '../../components/question/QuestionList';

@inject('questionStore')
@observer
class QuestionListContainer extends Component {
  componentDidMount() {
    this.props.questionStore.getQuestions();
  }
  render() {
    return(
      <QuestionList questions={this.props.questionStore.questions} />
    );
  };
}

export default QuestionListContainer;
