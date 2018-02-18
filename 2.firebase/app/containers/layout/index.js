import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as UserActions } from 'Redux/userReducer';
import { Link } from 'react-router-dom';
import Loading from 'Components/loading';
import { signOut } from 'Api/firebase';
import styles from './styles.scss';

module.exports = function (WrappedComponent, options = {}) {
  const {
    hasHeader = false,
    hasFooter = false
  } = options;

  @connect(
    (state) => ({
      userState: state.get('userReducer'),
    }),
    (dispatch) => ({
      userActions: bindActionCreators(UserActions, dispatch),
    })
  )
  class Layout extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
      this.props.userActions.userInit()
        .then((user) => {
          if (user) this.props.history.push('/');
          else this.props.history.push('./signup');
        });
    }

    handleSignOut = () => {
      this.props.userActions.signOut()
        .then((res) => {
          this.props.history.push('./signup');
        })
    }

    renderHeader = () => {
      return (
        <div className={styles.header}>
          <button onClick={() => this.handleSignOut()}>Sign Out</button>
        </div>
      )
    }

    renderFooter = () => {
      return (
        <div className={styles.footer}></div>
      )
    }

    render() {
      return (
        <div>
          <Loading isLoading={this.props.userState.get('isLoading')} />
          {hasHeader && this.renderHeader()}
          <div className={styles.content}>
            <WrappedComponent {...this.props} />
          </div>
          {hasFooter && this.renderFooter()}
        </div>
      );
    }
  }
  return Layout;
};