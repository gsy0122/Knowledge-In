const mongoose = require('mongoose');

const { Schema } = mongoose;

const memberSchema = Schema({
	id: { type: String, require: true, unique: true },
	pw: { type: String, require: true },
	name: { type: String, require: true },
	mobile: { type: String, require: true },
	email: { type: String, require: true },
	profile_image: { type: String, require: false },
	status_message: { type: String, require: false },
	level: { type: String, default: '초수' },
	question_count: { type: Number, default: 0 },
	answer_count: { type: Number, default: 0 },
	adopt_count: { type: Number, default: 0 },
	join_date: { type: Date, default: Date.now },
	last_updated: { type: Date, default: Date.now },
}, {
	collection: 'member',
});

memberSchema.statics.create = data => {
  const member = new this(data);
  return member.save();
};

memberSchema.statics.updateById = (id, data) => {
  return this.findOneAndUpdate({ id }, data, { new: true });
};

memberSchema.statics.deleteById = id => {
  return this.remove({ id });
};

memberSchema.statics.findOneById = id => {
  return this.findOne({ id });
};

memberSchema.statics.findAll = () => {
  return this.find({});
};

module.exports = mongoose.model('member', memberSchema);
