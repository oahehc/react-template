import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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

    renderHeader = () => {
      return (
        <div className={styles.header}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/auth">Auth Check</Link>
            </li>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
          </ul>
        </div>
      )
    }

    renderFooter = () => {
      return (<div className={styles.footer} />)
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