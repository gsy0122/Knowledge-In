import { observable } from 'mobx';
import { asyncAction } from 'mobx-utils';
import { autobind } from 'core-decorators';

@autobind
class QuestionStore {
  @observable question = {};
	@observable questions = [];

  @asyncAction
  getQuestion() {

  }

  @asyncAction
  getQuestions() {
    
  }
}

export default QuestionStore;
