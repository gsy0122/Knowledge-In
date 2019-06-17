import { observable, action } from 'mobx';
import { autobind } from 'core-decorators';

import CategoryRepository from './CategoryRepository';

@autobind
class CategoryStore {
  static __instance = null;
  static getInstance() {
      if (CategoryStore.__instance === null) {
        CategoryStore.__instance = new CategoryStore();
      }
      return CategoryStore.__instance;
  }
  constructor() {
    CategoryStore.__instance = this;
  }

  @observable category = null;
  @action
  async getCategory(categoryId) {
    try {
      const { data, status } = await CategoryRepository.getCategory(categoryId);
      if (status === 200) {
        console.log(data);
        this.category = data;
      } else if (status === 404) {
        alert('카테고리가 존재하지 않습니다.');
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  @observable categories = [];
  @action
  async getCategories() {
    try {
      const { data, status } = await CategoryRepository.getCategories();
      if (status === 200) {
				this.categories = data.data;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default CategoryStore.getInstance();
