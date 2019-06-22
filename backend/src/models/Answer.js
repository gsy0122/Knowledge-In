const mongoose = require('mongoose');

const { Schema } = mongoose;

const answerSchema = Schema({
	question: { type: Schema.Types.ObjectId, require: true, ref: 'Question' },
	member: { type: Schema.Types.ObjectId, require: true, ref: 'Member' },
	content: { type: String, require: true },
	tags: { type: [String], require: false },
	anonymous: { type: Number, default: 0 },
	isAdopted: {	type: Number, default: 0 },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
}, {
	collection: 'answer',
});

answerSchema.statics.create = function (data) {
  const answer = new this(data);
  return answer.save();
};

answerSchema.statics.updateById = function (_id, data) {
  return this.findOneAndUpdate({ _id }, data, { new: true });
};

answerSchema.statics.deleteById = function (_id) {
  return this.remove({ _id });
};

answerSchema.statics.findOneById = function (_id) {
  return this.findOne({ _id }).populate('question').populate('member').exec();
};

answerSchema.statics.findByQuestionId = function (question) {
	return this.find({ question }).populate('member').exec();
};

answerSchema.statics.findAll = function () {
  return this.find({}).sort({ isAdopted: -1	});
};

module.exports = mongoose.model('Answer', answerSchema);
