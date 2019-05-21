const Router = require('koa-router');

const member = new Router();
const memberCtrl = require('./member.ctrl');

member.get('/', memberCtrl.getMembers);
member.post('/', memberCtrl.addMember);
member.post('/logout', memberCtrl.logout);
member.delete('/:id', memberCtrl.remove);
member.put('/:id', memberCtrl.modifyMember);

module.exports = member;
