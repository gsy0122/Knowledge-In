import { observable, action } from 'mobx';

class MemberStore {
	@observable members;

	constructor() {
		this.members = [];
	}

	@action.bound
	createMember(member) {
		this.members.push(member);
	}
}

export default MemberStore;