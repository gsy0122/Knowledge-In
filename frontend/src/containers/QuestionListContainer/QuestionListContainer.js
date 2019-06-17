import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import './QuestionListContainer.scss';
import PageTemplate from './../../components/common/PageTemplate';
import QuestionListItem from './../../components/question/QuestionListItem';

@inject('stores')
@observer
class QuestionListContainer extends Component {
  componentDidMount() {
    this.props.stores.QuestionStore.getQuestions();
  }
  render() {
    const questionStore = this.props.stores.QuestionStore;
    return(
      <PageTemplate>
        {questionStore.questions.map(question => (
          <QuestionListItem question={question} />
        ))}
      </PageTemplate>
    );
  };
}

export default QuestionListContainer;
