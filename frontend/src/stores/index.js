import MemberStore from './Member'
import QuestionStore from './Question';
import AnswerStore from './Answer';

const stores = {
  memberStore: new MemberStore(),
  questionStore: new QuestionStore(),
  answerStore: new AnswerStore(),
};

export default stores;