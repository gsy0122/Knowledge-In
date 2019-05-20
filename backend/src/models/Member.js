const mongoose = require('mongoose');

const { Schema } = mongoose;

const memberSchema = new Schema({
	id: { type: String, require: true, unique: true },
	pw: { type: String, require: true },
	name: { type: String, require: true },
	mobile: { type: String, require: true },
	email: { type: String, require: true },
	profile_image: { type: String, require: false },
	status_message: { type: String, require: false },
	auth: { type: Number, require: true },
	status: { type: Number, default: 2 },
	leave: { type: Number, require: true },
	level: { type: String, default: '초수' },
	question_count: { type: Number, default: 0 },
	answer_count: { type: Number, default: 0 },
	adopt_count: { type: Number, default: 0 },
	join_date: { type: Date, default: Date.now },
	last_updated: { type: Date, default: Date.now },
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

memberSchema.statics.deleteById = function (id) {
  return this.remove({ id });
};

memberSchema.statics.findOneById = function (id) {
  return this.findOne({ id });
};

memberSchema.statics.findByOver = function (id, mobile, email) {
	return this.find({ id }, { mobile }, { email });
}

memberSchema.statics.findAll = function () {
  return this.find({});
};

module.exports = mongoose.model('Member', memberSchema);
