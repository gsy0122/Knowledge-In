const mongoose = require('mongoose');

const { Schema } = mongoose;

const questionSchema = Schema({
	idx: { type: Number, require: true, unique: true },
	memberId: { type: String, require: true },
	title: { type: String, require: true },
	content: { type: String, require: true },
	image: { type: String, require: false },
	category: { type: String, require: true },
	tags: { type: [String], require: false },
	point: { type: Number, default: 0 },
	anonymous: { type: Number, default: 0 },
	is_adopted: {	type: Number, default: 0 },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
}, {
	collection: 'question',
});


questionSchema.statics.create = data => {
  const member = new this(data);
  return member.save();
};

questionSchema.statics.updateByIdx = (idx, data) => {
  return this.findOneAndUpdate({ idx }, data, { new: true });
};

questionSchema.statics.deleteByIdx = idx => {
  return this.remove({ idx });
};

questionSchema.statics.findOneByIdx = idx => {
  return this.findOne({ idx });
};

questionSchema.statics.findAll = () => {
  return this.find({});
};

module.exports = mongoose.model('question', questionSchema);
