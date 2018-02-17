import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // if (!hasToken()) this.props.history.push('./signup');
  }

  render() {
    return (
      <div className={styles.home}>
        HomePage
      </div>
    );
  }
}
export default HomePage;
