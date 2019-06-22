import React from 'react';
import styles from './MemberPane.scss';
import classNames from 'classnames/bind';
import {withRouter} from 'react-router-dom';

const cx = classNames.bind(styles);

const MemberPane = (props) => {
  const member = props.member;
  const onSetting = () => {
    props.history.push('/profile/' + props.member._id);
  }
  return(
    <div className={cx('member-pane')}>
      <div>
        <div>{member.name} ({member.id}) 님의 프로필입니다.</div>
        <div>{member.statusMessage}</div>
        <div>현재 등급은 {member.level}이며, {member.adoptPoint}점의 내공이 누적되었습니다.</div>
        <div>질문 수 {member.questionCount}</div>
        <div>답변 수 {member.answerCount}</div>
        <div>채택 수 {member.adoptCount}</div>
      </div>
      <button onClick={onSetting}>설정</button>
    </div>
  );
};

export default withRouter(MemberPane);