const mongoose = require('mongoose');

const { Schema } = mongoose;

const answer = Schema({
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

module.exports = mongoose.model('answer', answer);
