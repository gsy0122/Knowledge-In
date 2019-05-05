import React, { Component } from 'react';
import styles from './Footer.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Footer extends Component {
	render() {
		return(
			<div className={cx('footer')}>
				Powered By DGSW
			</div>	
		);
	}
}

export default Footer;