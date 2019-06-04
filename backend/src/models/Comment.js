const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = Schema({
	answerId: { type: Schema.Types.ObjectId, ref: 'answer' },
	memberId: { type: Schema.Types.ObjectId, ref: 'member' },
	content: { type: String, require: true, max: 1000 },
}, {
	collection: 'comment',
});

module.exports = mongoose.model('Comment', commentSchema);
