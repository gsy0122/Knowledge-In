const Router = require('koa-router');

const question = new Router();
const questionCtrl = require('./question.ctrl');

question.post('/', questionCtrl.createQuestion);
question.put('/:_id', questionCtrl.modifyQuestion);
question.put('/adopt/:_id', questionCtrl.adoptQuestion);
question.delete('/:_id', questionCtrl.deleteQuestion);
question.get('/', questionCtrl.viewQuestions);
question.get('/:_id', questionCtrl.viewQuestion);

module.exports = question;