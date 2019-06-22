const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = Schema({
	answer: { type: Schema.Types.ObjectId, ref: 'answer' },
	member: { type: Schema.Types.ObjectId, ref: 'member' },
	content: { type: String, require: true, max: 1000 },
}, {
	collection: 'comment',
});

module.exports = mongoose.model('Comment', commentSchema);
