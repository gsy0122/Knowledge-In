import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { HomePage } from '../pages';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    );
  }
}

export default App;
