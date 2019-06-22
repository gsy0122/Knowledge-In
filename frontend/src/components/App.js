import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'mobx-react';

import { HomePage, QuestionPage, AuthPage } from '../pages';
import ProfileContainer from './../containers/ProfileContainer';
import Stores from './../stores';
import QuestionListContainer from './../containers/QuestionListContainer';
import WriteQuestionContainer from './../containers/WriteQuestionContainer';

class App extends Component {
  render() {
    return (
      <Provider stores={Stores}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/question/:question_id?" render={
            () => (localStorage.getItem('token') ? <WriteQuestionContainer /> : <Redirect to="/auth/login" />)
          } />
          <Route exact path="/qna/:category_id?" render={
            () => (localStorage.getItem('token') ? <QuestionListContainer /> : <Redirect to="/auth/login" />)
          } />
          <Route exact path="/auth/:kind" component={AuthPage} />
          <Route exact path="/question/view/:question_id" component={QuestionPage} />
          <Route exact path="/profile/:member_id?" render={
            () => (localStorage.getItem('token') ? <ProfileContainer /> : <Redirect to="/auth/login" />)
          } />
        </Switch>
      </Provider>
    );
  }
}

export default App;
