const mongoose = require('mongoose');

const { Schema } = mongoose;

const answerSchema = Schema({
	idx: { type: Number, require: true, unique: true },
	questionIdx: { type: Number, require: true },
	memberId: { type: String, require: true },
	content: { type: String, require: true },
	tags: { type: [String], require: false },
	anonymous: { type: Number, default: 0 },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
}, {
	collection: 'answer',
});

answerSchema.statics.create = data => {
  const member = new this(data);
  return member.save();
};

answerSchema.statics.updateByIdx = (idx, data) => {
  return this.findOneAndUpdate({ idx }, data, { new: true });
};

answerSchema.statics.deleteByIdx = idx => {
  return this.remove({ idx });
};

answerSchema.statics.findOneByIdx = idx => {
  return this.findOne({ idx });
};

answerSchema.statics.findByQuestionIdx = questionIdx => {
	return this.find({ questionIdx });
};

answerSchema.statics.findAll = () => {
  return this.find({});
};

module.exports = mongoose.model('answer', answerSchema);
