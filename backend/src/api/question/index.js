const Router = require('koa-router');

const question = new Router();
const questionCtrl = require('./question.ctrl');

question.post('/', questionCtrl.createQuestion);
question.put('/:_id', questionCtrl.modifyQuestion);
question.delete('/:_id', questionCtrl.deleteQuestion);
question.get('/', questionCtrl.viewQuestions);
question.get('/:_id', questionCtrl.viewQuestion);
question.get('/category/:category_id', questionCtrl.viewQuestionsByCtgy);

module.exports = question;