import { observable } from 'mobx';
import { asyncAction } from 'mobx-utils';
import { autobind } from 'core-decorators';

import QuestionRepository from './QuestionRepository';

@autobind
class QuestionStore {
  static __instance = null;
  static getInstance() {
      if (QuestionStore.__instance === null) {
        QuestionStore.__instance = new QuestionStore();
      }
      return QuestionStore.__instance;
  }
  constructor() {
    QuestionStore.__instance = this;
  }

  @observable question = {};
  @asyncAction async *getQuestion(_id) {
    try {
      const { data, status } = yield QuestionRepository.getQuestion(_id);
      if (status === 200) {
        console.log(data);
        this.question = data.data;
      } else if (status === 404) {
        this.question = null;
        alert('질문이 존재하지 않습니다.');
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  @observable questions = [];
  @asyncAction async *getQuestions() {
    try {
      const { data, status } = yield QuestionRepository.getQuestions();
      console.log(data.data);
      if (status === 200) {
        this.questions = data.data;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  
  @asyncAction async *getQuestionsByCtgy(category_id) {
    try {
      const { data, status } = yield QuestionRepository.getQuestionsByCtgy(category_id);
      console.log(data.data.questions);
      
      if (status === 200) {
        this.questions = data.data;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default QuestionStore.getInstance();
