import React, { Component } from 'react';
import styles from './Footer.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Footer extends Component {
  render() {
    return(
      <footer className={cx('footer')}>
        <div>Powered By DGSW</div>
      </footer>  
    );
  }
}

export default Footer;