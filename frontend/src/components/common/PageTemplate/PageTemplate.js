import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';

import Header from './../../base/Header';
import Footer from '../../base/Footer';

const cx = classNames.bind(styles);

const PageTemplate = ({children}) => (
  <div className={cx('page-tamplate')}>
    <Header />
    {children}
    <Footer />
  </div>
);

export default PageTemplate;