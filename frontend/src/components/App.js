import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { HomePage, QuestionPage, AnswerPage } from '../pages';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/question" component={QuestionPage} />
        <Route exact path="/answer" component={AnswerPage} />
      </Switch>
    );
  }
}

export default App;
