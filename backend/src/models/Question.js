const mongoose = require('mongoose');

const { Schema } = mongoose;

const questionSchema = Schema({
	memberId: { type: Schema.Types.ObjectId, ref: 'member' },
	title: { type: String, require: true },
	content: { type: String, require: true },
	image: { type: String, require: false },
	category: { type: String, require: true },
	tags: { type: [String], require: false },
	point: { type: Number, default: 0 },
	anonymous: { type: Number, default: 1 },
	answerId: { type: Schema.Types.ObjectId, ref: 'member', default: null },
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
  return this.findOneAndUpdate({ _id }, data, { new: true });
};

questionSchema.statics.deleteById = function (_id) {
  return this.remove({ _id });
};

questionSchema.statics.findOneById = function (_id) {
  return this.findOne({ _id });
};

questionSchema.statics.findAll = function () {
  return this.find({});
};

module.exports = mongoose.model('Question', questionSchema);
