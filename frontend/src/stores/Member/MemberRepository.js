import axios from 'axios';

class MemberRepository {
  async getMember() {
    return await axios.get(`http://localhost:8000/member/my`, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    });
  }
  async getMembers() {
    return await axios.get(`http://localhost:8000/member`, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    });
  }
  async searchMember(_id) {
    return await axios.get(`http://localhost:8000/member/search/${_id}`, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    });
  }
}
export default new MemberRepository();