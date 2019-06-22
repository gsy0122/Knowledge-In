import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {withRouter} from 'react-router-dom';

import PageTemplate from '../../components/common/PageTemplate';
import QuestionList from '../../components/question/QuestionList';

@inject('stores')
@observer
class QuestionListContainer extends Component {
  componentDidMount() {
    if (this.props.match && this.props.match.params.category_id) {
      this.props.stores.QuestionStore.getQuestionsByCtgy(this.props.match.params.category_id);
    } else {
      this.props.stores.QuestionStore.getQuestions();
    }
    this.props.stores.CategoryStore.getCategories();
  }
  componentDidUpdate(nextProps, nextState){
    if (this.props.match !== nextProps.match) {
      if (this.props.match.params.category_id) {
        this.props.stores.QuestionStore.getQuestionsByCtgy(this.props.match.params.category_id);
      } else {
        this.props.stores.QuestionStore.getQuestions();
      }
    }
  }
  render() {
    const questions = this.props.stores.QuestionStore.questions;
    const categories = this.props.stores.CategoryStore.categories;
    return(
      <PageTemplate>
        <QuestionList questions={questions} categories={categories} />
      </PageTemplate>
    );
  };
}

export default withRouter(QuestionListContainer);
