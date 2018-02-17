import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Layout(HomePage, { hasHeader: true })} />
          <Route path="/signup" component={Layout(SignupPage)} />
        </Switch>
      </BrowserRouter>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('app'));
