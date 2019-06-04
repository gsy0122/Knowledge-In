import axios from 'axios';

class QuestionRepository {
	getQuestion(_id) {
    return axios.get(`http://localhost:8000/question/${_id}`, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    });
	}
  getQuestions() {
    return axios.get(`http://localhost:8000/question`, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    });
  }
}
export default new QuestionRepository();