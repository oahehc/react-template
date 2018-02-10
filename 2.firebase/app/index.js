import React from 'react';
import ReactDOM from 'react-dom';
import Layout from 'Containers/layout';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Layout />
    );
  }
}
ReactDOM.render(<App/>, document.getElementById('app'));