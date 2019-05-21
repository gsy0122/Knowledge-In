const mongoose = require('mongoose');

const { Schema } = mongoose;

const questionSchema = Schema({
	memberId: { type: String, require: true },
	title: { type: String, require: true },
	content: { type: String, require: true },
	image: { type: String, require: false },
	category: { type: String, require: true },
	tags: { type: [String], require: false },
	point: { type: Number, default: 0 },
	anonymous: { type: Number, default: 1 },
	is_adopted: {	type: Number, default: 0 },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
}, {
	collection: 'question',
});

questionSchema.statics.create = function (data) {
  const question = new this(data);
  return question.save();
};

questionSchema.statics.updateByIdx = function (idx, data) {
  return this.findOneAndUpdate({ idx }, data, { new: true });
};

questionSchema.statics.deleteByIdx = function (idx) {
  return this.remove({ idx });
};

questionSchema.statics.findOneByIdx = function (idx) {
  return this.findOne({ idx });
};

questionSchema.statics.findAll = function () {
  return this.find({});
};

module.exports = mongoose.model('Question', questionSchema);
