import axios from 'axios';

class CategoryRepository {
  getCategory(categoryId) {
    return axios.get(`http://localhost:8000/category/${categoryId}`, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    });
  }
  
  getCategories() {
    return axios.get('http://localhost:8000/category', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    });
  }
}
export default new CategoryRepository();