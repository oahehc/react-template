import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

class Loading extends Component {
  static PropTypes = {
    isLoading: PropTypes.bool,
  }

  static defaultProps = {
    isLoading: false,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() { }

  render() {
    const { isLoading } = this.props;
    return (
      <div>
        {
          isLoading &&
          <img src={require('Assets/loading.gif')} alt="loading..." />
        }
      </div>
    );
  }
}
export default Loading;
