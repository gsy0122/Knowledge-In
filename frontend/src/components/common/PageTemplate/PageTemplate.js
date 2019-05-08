import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';

import Header from '../Header';
import Footer from '../Footer';

const cx = classNames.bind(styles);

const PageTemplate = ({children}) => (
	<div className={cx('page-tamplate')}>
		<Header />
		{children}
		<Footer />
	</div>
);

export default PageTemplate;