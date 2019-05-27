import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import './QuestionContainer.scss';
import ViewQuestion from '../../components/question/ViewQuestion';

@inject('questionStore')
@observer
class QuestionContainer extends Component {
  componentDidMount() {
    this.props.questionStore.getQuestion(this.props.id);
  }
  render() {
    return(
			<div>
        <ViewQuestion question={this.props.questionStore.question} />
			</div>
    );
  };
}

export default QuestionContainer;
