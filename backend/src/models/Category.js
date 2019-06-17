const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = Schema({
	name: { type: String, require: true },
}, {
	collection: 'category',
});

categorySchema.statics.findOneById = function (_id) {
  return this.findOne({ _id });
};

categorySchema.statics.findAll = function () {
  return this.find({});
};

module.exports = mongoose.model('Category', categorySchema);
