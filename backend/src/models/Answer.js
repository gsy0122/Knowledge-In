const mongoose = require('mongoose');

const { Schema } = mongoose;

const answerSchema = Schema({
	questionId: { type: Schema.Types.ObjectId, ref: 'question' },
	memberId: { type: Schema.Types.ObjectId, ref: 'member' },
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
  const member = new this(data);
  return member.save();
};

answerSchema.statics.updateById = function (_id, data) {
  return this.findOneAndUpdate({ _id }, data, { new: true });
};

answerSchema.statics.updateAdopt = function (_id) {
	return this.findOneAndUpdate({ _id }, {$set: {isAdopted: 1}}, { new: true })
}

answerSchema.statics.deleteById = function (_id) {
  return this.remove({ _id });
};

answerSchema.statics.findOneById = function (_id) {
  return this.findOne({ _id });
};

answerSchema.statics.findByQuestionId = function (questionId) {
	return this.find({ questionId });
};

answerSchema.statics.findAll = function () {
  return this.find({});
};

module.exports = mongoose.model('Answer', answerSchema);
