import React, {Component} from 'react';
import PropTypes from 'prop-types';
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

    componentDidMount() {}

    renderHeader = () => {
      return (<div className={styles.header}/>)
    }

    renderFooter = () => {
      return (<div className={styles.footer}/>)
    }

    render() {
      return (
        <div>
          {hasHeader && this.renderHeader()}
          <div className={styles.content}>
            <WrappedComponent {...this.props}/>
          </div>
          {hasFooter && this.renderFooter()}
        </div>
      );
    }
  }
  return Layout;
};