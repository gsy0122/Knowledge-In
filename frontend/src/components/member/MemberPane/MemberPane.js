import React from 'react';
import './MemberPane.scss';
import PageTemplate from './../../common/PageTemplate';

const MemberPane = (props) => {
	const member = props.member;
	return(
		<PageTemplate>
      <p>{member.id}</p>
      <p>{member.name}</p>
      <p>{member.level}</p>
      <p>질문 수 {member.question_count}</p>
      <p>답변 수 {member.answer_count}</p>
      <p>채택 수 {member.adopt_count}</p>
    </PageTemplate>
	);
};

export default MemberPane;