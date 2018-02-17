import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, HashRouter, Redirect } from 'react-router-dom';
import Layout from 'Containers/Layout';
import HomePage from 'Containers/HomePage';
import SignupPage from 'Containers/SignupPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  authCheck = (component) => {
    const hasToken = false; // TODO:
    if (!hasToken) return <Redirect to="/signup" />;
    return component;
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route
            exact
            path="/"
            component={Layout(HomePage, { hasHeader: true })}
          />
          <Route
            path="/auth"
            render={() => this.authCheck(Layout(HomePage), { hasHeader: true })}
          />
          <Route
            path="/signup"
            component={Layout(SignupPage)}
          />
        </Switch>
      </HashRouter>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('app'));