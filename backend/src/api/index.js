const Router = require('koa-router');
const api = new Router();

const question = require('./question');

api.use('/question', question.routes());

module.exports = api;