const Router = require('koa-router');

const answer = new Router();
const answerCtrl = require('./answer.ctrl');

answer.post('/', answerCtrl.createAnswer);
answer.put('/:idx', answerCtrl.modifyAnswer);
answer.delete('/:idx', answerCtrl.deleteAnswer);
answer.get('/', answerCtrl.viewAnswers);
answer.get('/:question_idx', answerCtrl.viewAnswersByQuestion);

module.exports = answer;