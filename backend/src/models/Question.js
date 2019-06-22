const mongoose = require('mongoose');

const { Schema } = mongoose;

const questionSchema = Schema({
	member: { type: Schema.Types.ObjectId, require: true, ref: 'Member' },
	title: { type: String, require: true },
	content: { type: String, require: true },
	category: { type: Schema.Types.ObjectId, require: true, ref: 'Category' },
	tags: { type: [String], require: false },
	point: { type: Number, default: 0 },
	anonymous: { type: Number, default: 1 },
	answer: { type: Schema.Types.ObjectId, default: null , ref: 'Answer' },
	answerCount: { type: Number, default: 0 },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
}, {
	collection: 'question',
});

questionSchema.statics.create = function (data) {
  const question = new this(data);
  return question.save();
};

questionSchema.statics.updateById = function (_id, data) {
  return this.findOneAndUpdate({_id}, data, { new: true });
};

questionSchema.statics.addAnswer = function (_id, answerCount) {
	return this.findOneAndUpdate({_id}, {$set: {answerCount: answerCount + 1}}, { new: true });
};

questionSchema.statics.removeAnswer = function (_id, answerCount) {
	return this.findOneAndUpdate({ _id }, {$set: {answerCount: answerCount - 1}}, { new: true });
};

questionSchema.statics.deleteById = function (_id) {
  return this.remove({ _id });
};

questionSchema.statics.findOneById = function (_id) {
	return this.findOne({ _id }).populate('member').populate('category').exec();
};

questionSchema.statics.findByCategory = function (category) {
	return this.find({ category }).populate('member').populate('category').exec();
}

questionSchema.statics.findAll = function () {
  return this.find({}).sort({ createdAt: -1 }).populate('member').populate('category').exec();
};

module.exports = mongoose.model('Question', questionSchema);
