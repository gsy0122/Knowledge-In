import { observable, action } from 'mobx';
import { autobind } from 'core-decorators';

import AnswerRepository from './AnswerRepository';

@autobind
class AnswerStore {
  static __instance = null;
  static getInstance() {
      if (AnswerStore.__instance === null) {
        AnswerStore.__instance = new AnswerStore();
      }
      return AnswerStore.__instance;
  }
  constructor() {
    AnswerStore.__instance = this;
  }

  @observable answers = [];
  @action
  async getAnswers(questionId) {
    try {
      const { data, status } = await AnswerRepository.getAnswers(questionId);
      if (status === 200) {
        console.log(data);
        this.answers = data.data;
      } else if (status === 404) {
        alert('질문이 존재하지 않습니다.');
        this.answers = null;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default AnswerStore.getInstance();
