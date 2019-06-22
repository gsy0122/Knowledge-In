import React, { Component } from 'react';
import styles from './Comment.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Comment extends Component {
  render() {
    return(
      <div className={cx('comment')}>
        <textarea placeholder='명예 훼손 및 불법 정보 유통 시 모니터링 후 삭제될 수 있으며, 이에 대한 책임은 게시자에게 있습니다.'>
        </textarea>
        <button>등록</button>
      </div>
    );
  }
}

export default Comment;
