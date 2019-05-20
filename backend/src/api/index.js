const Router = require('koa-router');
const api = new Router();

const member = require('./member');
const question = require('./question');
const answer = require('./answer');

api.use('/member', member.routes());
api.use('/question', question.routes());
api.use('/answer', answer.routes());

module.exports = api;