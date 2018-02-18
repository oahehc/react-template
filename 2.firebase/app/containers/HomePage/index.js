import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authCheck, getUserName } from 'Api/firebase';
import styles from './styles.scss';

@connect(
  (state) => ({
    userState: state.get('userReducer'),
  })
)
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
    console.log('xxx', this.props.userState);
    return (
      <div className={styles.home}>
        {`Welcome, ${getUserName()}`}
      </div>
    );
  }
}
export default HomePage;
