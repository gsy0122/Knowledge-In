import React, { Component } from 'react';
import styles from './Footer.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Footer extends Component {
	render() {
		return(
			<footer className={cx('footer')}>
				Powered By DGSW
			</footer>	
		);
	}
}

export default Footer;