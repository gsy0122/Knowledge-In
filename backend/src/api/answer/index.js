const Router = require('koa-router');

const answer = new Router();
const answerCtrl = require('./answer.ctrl');

answer.post('/', answerCtrl.createAnswer);
answer.put('/:_id', answerCtrl.modifyAnswer);
answer.delete('/:_id', answerCtrl.deleteAnswer);
answer.get('/', answerCtrl.viewAnswers);
answer.get('/:questionId', answerCtrl.viewAnswersByQuestion);

module.exports = answer;