import axios from 'axios';

class AnswerRepository {
  async getAnswers(questionId) {
    return await axios.get(`http://localhost:8000/answer/${questionId}`, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    });
  }
}
export default new AnswerRepository();