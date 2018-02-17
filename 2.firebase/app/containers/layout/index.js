import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { signOut } from 'Api/firebase';
import styles from './styles.scss';

module.exports = function (WrappedComponent, options = {}) {
  const {
    hasHeader = false,
    hasFooter = false
  } = options;

  class Layout extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    handleSignOut = () => {
      signOut().then((res) => {
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
        <div className={styles.footer}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
          </ul>
        </div>
      )
    }

    render() {
      return (
        <div>
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