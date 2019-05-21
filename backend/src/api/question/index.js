const Router = require('koa-router');

const question = new Router();
const questionCtrl = require('./question.ctrl');

question.post('/', questionCtrl.createQuestion);
question.put('/:idx', questionCtrl.modifyQuestion);
question.delete('/:idx', questionCtrl.deleteQuestion);
question.get('/', questionCtrl.viewQuestions);
question.get('/:idx', questionCtrl.viewQuestion);

module.exports = question;