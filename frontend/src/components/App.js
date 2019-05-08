import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { HomePage, QuestionPage } from '../pages';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/question" component={QuestionPage} />
      </Switch>
    );
  }
}

export default App;
