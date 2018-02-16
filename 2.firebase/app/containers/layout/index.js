import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import {googleSignUp} from 'Api/firebase';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <div className={styles.layout}>
        <button onClick={() => googleSignUp()}>Sign Up</button>
      </div>
    );
  }
}
export default Layout;