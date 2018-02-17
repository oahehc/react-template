import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Link} from 'react-router-dom';
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
        <div>
          <Route exact path="/" component={HomePage}/>
          <Route path="/signup" component={SignupPage}/>
        </div>
      </HashRouter>
    );
  }
}
ReactDOM.render(
  <App/>, document.getElementById('app'));