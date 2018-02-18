import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from 'Containers/Layout';
import HomePage from 'Containers/HomePage';
import SignupPage from 'Containers/SignupPage';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            component={Layout(HomePage, { hasHeader: true })}
          />
          <Route
            path="/signup"
            component={Layout(SignupPage)}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default Routes;
