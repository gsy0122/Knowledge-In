const Router = require('koa-router');

const category = new Router();
const categoryCtrl = require('./category.ctrl');

category.get('/', categoryCtrl.findAll);
category.get('/:_id', categoryCtrl.findOne);

module.exports = category;