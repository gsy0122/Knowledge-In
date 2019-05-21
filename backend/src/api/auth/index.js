const Router = require('koa-router');

const auth = new Router();
const authCtrl = require('./auth.ctrl');
const authMiddleware = require('./../../middlewares/auth');

auth.get('/', authMiddleware, authCtrl.authToken);
auth.post('/login', authCtrl.login);

module.exports = auth;
