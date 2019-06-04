import { observable, action } from 'mobx';
// import { asyncAction } from 'mobx-utils';
import { autobind } from 'core-decorators';

import QuestionRepository from './QuestionRepository';

@autobind
class QuestionStore {
  @observable question = {};
	@observable questions = [];

  @action
  async getQuestion(_id) {
    try {
      const { data, status } = await QuestionRepository.getQuestion(_id);
      if (status === 200) {
        this.question = data.data.question;
        console.log(this.question);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  @action
  async getQuestions() {
    try {
      const { data, status } = await QuestionRepository.getQuestions();
      console.log(data.data.questions);
      
      if (status === 200) {
        this.questions = data.data.questions;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default QuestionStore;
