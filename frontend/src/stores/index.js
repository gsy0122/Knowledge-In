import MemberStore from './Member'
import QuestionStore from './Question';

const stores = {
  memberStore: new MemberStore(),
  questionStore: new QuestionStore(),
};

export default stores;