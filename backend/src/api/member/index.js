const Router = require('koa-router');

const member = new Router();
const memberCtrl = require('./member.ctrl');
const authMiddleware = require('./../../middlewares/auth');

member.get('/', memberCtrl.getMembers);
member.get('/my', authMiddleware, memberCtrl.getMember);
member.post('/', memberCtrl.addMember);
member.post('/logout', memberCtrl.logout);
member.delete('/:id', memberCtrl.remove);
member.put('/:id', memberCtrl.modifyMember);

module.exports = member;
