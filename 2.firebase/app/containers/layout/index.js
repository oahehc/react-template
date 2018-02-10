import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {}

	render() {
		return ( 
				<div className={styles.layout}> test </div>
		);
	}
}
export default Layout;