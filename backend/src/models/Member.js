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

memberSchema.statics.updateById = function (id, data) {
  return this.findOneAndUpdate({ id }, data, { new: true });
};

memberSchema.statics.updateQuestion = function (id, questionCount) {
	return this.findOneAndUpdate({ id }, {$set: {questionCount: questionCount + 1}}, { new: true });
}

memberSchema.statics.updateAnswer = function (id, answerCount) {
	return this.findOneAndUpdate({ id }, {$set: {answerCount: answerCount + 1}}, { new: true });
}

memberSchema.statics.updateAdopt = function (id, adoptCount) {
	return this.findOneAndUpdate({ id }, {$set: {adoptCount: adoptCount + 1}}, { new: true });
}

memberSchema.statics.deleteById = function (id) {
  return this.remove({ id });
};

memberSchema.statics.findOneById = function (id) {
  return this.findOne({ id });
};

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
