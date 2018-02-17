import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { googleSignUp, authCheck } from 'Api/firebase';
import styles from './styles.scss';

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    authCheck().then((res) => {
      if (res) this.props.history.push('/');
    });
  }

  signUp = () => {
    googleSignUp().then((res) => {
      this.props.history.push('/');
    })
  }

  render() {
    return (
      <div className={styles.signup}>
        <button onClick={() => this.signUp()}>Sign Up</button>
      </div>
    );
  }
}
export default SignupPage;
