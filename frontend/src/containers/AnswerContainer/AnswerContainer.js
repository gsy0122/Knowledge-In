import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import './AnswerContainer.scss';
import ViewAnswer from '../../components/answer/ViewAnswer';

@inject('answerStore')
@observer
class AnswerContainer extends Component {
  componentDidMount() {
    this.props.answerStore.getAnswers(this.props.question_id);
  }
  render() {
    return(
			<div>
        <ViewAnswer answers={this.props.answerStore.answers} />
			</div>
    );
  };
}

export default AnswerContainer;
