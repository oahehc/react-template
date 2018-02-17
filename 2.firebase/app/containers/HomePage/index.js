import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { authCheck, getUserName } from 'Api/firebase';
import styles from './styles.scss';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    authCheck().then((res) => {
      if (!res) this.props.history.push('./signup');
    });
  }

  render() {
    return (
      <div className={styles.home}>
        {`Welcome, ${getUserName()}`}
      </div>
    );
  }
}
export default HomePage;
