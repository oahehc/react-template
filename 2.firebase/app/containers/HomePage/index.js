import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() { }

  render() {
    return (
      <div className={styles.home}>
        {`Welcome, ${this.props.userState.get('userName')}`}
      </div>
    );
  }
}
export default HomePage;
