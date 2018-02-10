import React from 'react';
import ReactDOM from 'react-dom';
import {log} from 'Utils/dev_func';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>Hello, World!</h1>
      </div>
    );
  }
}
ReactDOM.render(
  <App/>, document.getElementById('app'));