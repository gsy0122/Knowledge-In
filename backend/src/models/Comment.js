const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = Schema({
	memberId: { type: String, require: true },
	content: { type: String, require: true, max: 1000 },
}, {
	collection: 'comment',
});

module.exports = mongoose.model('Comment', commentSchema);
