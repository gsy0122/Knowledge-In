import axios from 'axios';

class QuestionRepository {
  async getQuestion(_id) {
    return await axios.get(`http://localhost:8000/question/${_id}`, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    });
  }
  async getQuestions() {
    return await axios.get(`http://localhost:8000/question`, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    });
  }
  async getQuestionsByCtgy(category_id) {
    return await axios.get(`http://localhost:8000/question/category/${category_id}`, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    });
  }
}
export default new QuestionRepository();