import React from 'react';
import ReactDOM from 'react-dom';
import Routes from 'Routes';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Routes />
    );
  }
}
ReactDOM.render(<App />, document.getElementById('app'));