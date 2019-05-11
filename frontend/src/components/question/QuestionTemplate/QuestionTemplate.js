import React, { Component } from 'react';
import styles from './QuestionTemplate.scss';
import classNames from 'classnames/bind';

import QuestionPane from './../QuestionPane';
import Header from '../../base/Header';
import Footer from '../../base/Footer';

const cx = classNames.bind(styles);

class QuestionTemplate extends Component {
  render() {
    return(
      <div className={cx('question-template')}>
        <Header />
        <QuestionPane />
        <Footer />
      </div>
    );
  }
}

export default QuestionTemplate;
