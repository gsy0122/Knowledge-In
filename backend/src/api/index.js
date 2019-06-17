const Router = require('koa-router');
const authMiddleware = require('./../middlewares/auth');
const api = new Router();

const auth = require('./auth');
const member = require('./member');
const question = require('./question');
const answer = require('./answer');
const category = require('./category');

api.use('/auth', auth.routes());
api.use('/member', member.routes());
api.use('/question', authMiddleware, question.routes());
api.use('/answer', authMiddleware, answer.routes());
api.use('/category', category.routes());

module.exports = api;