const mongoose = require('mongoose');

const { Schema } = mongoose;

const answerSchema = Schema({
	questionId: { type: Number, require: true },
	memberId: { type: String, require: true },
	content: { type: String, require: true },
	tags: { type: [String], require: false },
	anonymous: { type: Number, default: 0 },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
}, {
	collection: 'answer',
});

answerSchema.statics.create = function (data) {
  const member = new this(data);
  return member.save();
};

answerSchema.statics.updateByIdx = function (idx, data) {
  return this.findOneAndUpdate({ idx }, data, { new: true });
};

answerSchema.statics.deleteByIdx = function (idx) {
  return this.remove({ idx });
};

answerSchema.statics.findOneByIdx = function (idx) {
  return this.findOne({ idx });
};

answerSchema.statics.findByQuestionIdx = function (questionIdx) {
	return this.find({ questionIdx });
};

answerSchema.statics.findAll = function () {
  return this.find({});
};

module.exports = mongoose.model('Answer', answerSchema);
