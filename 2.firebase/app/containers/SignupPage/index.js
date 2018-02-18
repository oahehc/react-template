import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as UserActions } from 'Redux/userReducer';
import styles from './styles.scss';

@connect(
  (state) => ({}),
  (dispatch) => ({
    userActions: bindActionCreators(UserActions, dispatch),
  })
)
class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() { }

  signUp = () => {
    this.props.userActions.signUp()
      .then((res) => {
        this.props.history.push('/');
      });
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
