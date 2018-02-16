import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from 'Containers/HomePage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (<HomePage/>);
  }
}
ReactDOM.render(
  <App/>, document.getElementById('app'));