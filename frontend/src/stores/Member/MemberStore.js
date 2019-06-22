import { observable } from 'mobx';
import { asyncAction } from 'mobx-utils';
import { autobind } from 'core-decorators';

import MemberRepository from './MemberRepository';

@autobind
class MemberStore {
  static __instance = null;
  static getInstance() {
    if (MemberStore.__instance === null) {
      MemberStore.__instance = new MemberStore();
    }
    return MemberStore.__instance;
  }
  constructor() {
    MemberStore.__instance = this;
  }

  @observable member = {};
  @asyncAction async *getMember() {
    try {
      const { data, status } = yield MemberRepository.getMember();
      if (status === 200) {
        console.log(data);
        this.member = data.data.member;
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  @observable members = [];
  @asyncAction async *getMembers() {
    try {
      const { data, status } = yield MemberRepository.getMembers();
      if (status === 200) {
        this.members = data.data;
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  @observable search = {};
  @asyncAction async *searchMember(_id) {
    try {
      const { data, status } = yield MemberRepository.searchMember(_id);
      console.log(data);
      if (status === 200) {
        this.search = data.data.member;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default MemberStore.getInstance();
