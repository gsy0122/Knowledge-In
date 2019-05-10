const Router = require('koa-router');
const api = new Router();

const question = require('./question');
const answer = require('./answer');

api.use('/question', question.routes());
api.use('/answer', answer.routes());

module.exports = api;