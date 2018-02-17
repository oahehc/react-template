import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, HashRouter } from 'react-router-dom';
import Layout from 'Containers/Layout';
import HomePage from 'Containers/HomePage';
import SignupPage from 'Containers/SignupPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route
            exact
            path="/"
            component={Layout(HomePage, { hasHeader: true, hasFooter: true })}
          />
          <Route
            path="/signup"
            component={Layout(SignupPage, { hasFooter: true })}
          />
        </Switch>
      </HashRouter>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('app'));