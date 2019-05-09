const mongoose = require('mongoose');

const { Schema } = mongoose;

const question = Schema({
	idx: { type: Number, require: true, unique: true },
	memberId: { type: String, require: true },
	title: { type: String, require: true },
	content: { type: String, require: false },
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

module.exports = mongoose.model('question', question);
