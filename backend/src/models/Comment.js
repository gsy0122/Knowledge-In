const mongoose = require('mongoose');

const { Schema } = mongoose;

const comment = Schema({
	idx: { type: Number, require: true, unique: true },
	memberId: { type: String, require: true },
	content: { type: String, require: true, max: 1000 },
}, {
	collection: 'comment',
});

module.exports = Schema.model('comment', comment);
