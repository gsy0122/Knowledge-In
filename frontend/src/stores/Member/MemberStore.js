import { observable, action } from 'mobx';
import { autobind } from 'core-decorators';

import MemberRepository from './MemberRepository';

@autobind
class MemberStore {
  @observable members = [];
  @observable member = {};

  @action
  async getMembers() {
    try {
      const { data, status } = await MemberRepository.getMembers();
      if (status === 200) {
        this.members = data;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  @action
  async getMember() {
    try {
      const { data, status } = await MemberRepository.getMember();
      console.log(data);
      
      if (status === 200) {
        this.member = data.data.member;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default MemberStore;
