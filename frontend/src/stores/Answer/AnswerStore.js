import { observable, action } from 'mobx';
import { autobind } from 'core-decorators';

import AnswerRepository from './AnswerRepository';

@autobind
class AnswerStore {
  @observable answers = [];

  @action
  async getAnswers(questionId) {
    try {
      const { data, status } = await AnswerRepository.getAnswers(questionId);
      if (status === 200) {
        console.log(data);
        this.answers = data.data.answers;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default AnswerStore;
