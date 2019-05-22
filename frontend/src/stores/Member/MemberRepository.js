import axios from 'axios';

class MemberRepository {
  getMember() {
    return axios.get(`http://localhost:8000/member/my`, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    });
  }
  getMembers() {
    return axios.get(`http://localhost:8000/member`, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    });
  }
}
export default new MemberRepository();