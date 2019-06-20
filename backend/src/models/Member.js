const mongoose = require('mongoose');

const { Schema } = mongoose;

const memberSchema = Schema({
	id: { type: String, require: true, unique: true },
	pw: { type: String, require: true },
	name: { type: String, require: true },
	mobile: { type: String, require: true },
	email: { type: String, require: true },
	profileImage: { type: String, require: false },
	statusMessage: { type: String, require: false },
	auth: { type: Number, require: true },
	status: { type: Number, default: 2 },
	leave: { type: Number, require: true },
	level: { type: String, default: '초수' },
	questionCount: { type: Number, default: 0 },
	answerCount: { type: Number, default: 0 },
	adoptCount: { type: Number, default: 0 },
	joinDate: { type: Date, default: Date.now },
	lastUpdated: { type: Date, default: Date.now },
}, {
	collection: 'member',
});

memberSchema.statics.create = function (data) {
	const member = new this(data);
  return member.save();
};

memberSchema.statics.updateById = function (_id, data) {
  return this.findOneAndUpdate({ _id }, data, { new: true });
};

memberSchema.statics.addQuestion = function (_id, questionCount) {
	return this.findOneAndUpdate({ _id }, {$set: {questionCount: questionCount + 1}}, { new: true });
}

memberSchema.statics.removeQuestion = function (_id, questionCount) {
	return this.findOneAndUpdate({ _id }, {$set: {questionCount: questionCount - 1}}, { new: true });
}

memberSchema.statics.addAnswer = function (_id, answerCount) {
	return this.findOneAndUpdate({ _id }, {$set: {answerCount: answerCount + 1}}, { new: true });
}

memberSchema.statics.removeAnswer = function (_id, answerCount) {
	return this.findOneAndUpdate({ _id }, {$set: {answerCount: answerCount - 1}}, { new: true });
}

memberSchema.statics.updateAdopt = function (_id, adoptCount) {
	return this.findOneAndUpdate({ _id }, {$set: {adoptCount: adoptCount + 1}}, { new: true });
}

memberSchema.statics.deleteById = function (_id) {
  return this.remove({ _id });
};

memberSchema.statics.findOneById = function (_id) {
  return this.findOne({ _id });
};

memberSchema.statics.findOneByMemberId = function (id) {
	return this.findOne({ id });
}

memberSchema.statics.findAllForCheck = function (id, mobile, email) {
	return this.find({ id }, { mobile }, { email });
}

memberSchema.statics.findOneForLogin = function (id, pw) {
	return this.findOne({id, pw})
}

memberSchema.statics.findAll = function () {
  return this.find({});
};

module.exports = mongoose.model('Member', memberSchema);
