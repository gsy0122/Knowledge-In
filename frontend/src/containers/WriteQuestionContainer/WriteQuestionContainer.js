import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {withRouter} from 'react-router-dom';

import './WriteQuestionContainer.scss';
import WriteQuestion from './../../components/question/WriteQuestion';

@inject('stores')
@observer
class WriteQuestionContainer extends Component {
  componentDidMount() {
    this.props.stores.CategoryStore.getCategories();
    console.log(this.props.match.params.question_id);
    if (this.props.match && this.props.match.params.question_id) {
      this.props.stores.QuestionStore.getQuestion(this.props.match.params.question_id);
    }
  }
  render() {
    const categories = this.props.stores.CategoryStore.categories;
    const question = this.props.stores.QuestionStore.question;
    
    if (this.props.match && this.props.match.params.question_id) {
      return <WriteQuestion question={question} categories={categories} />
    }
    return(
      <WriteQuestion categories={categories}/>
    );
  };
}

export default withRouter(WriteQuestionContainer);
