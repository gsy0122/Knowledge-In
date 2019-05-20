require('dotenv').config();

const Koa = require('koa');
const cors = require('koa-cors');
const Router = require('koa-router');
const Body = require('koa-body')({ multipart: true });
const Http = require('http');
const { PORT: port  } = process.env;
const api = require('./api');

const app = new Koa();
const router = new Router();
const server = Http.createServer(app.callback());

const models = require('./models');

router.use(api.routes());

app.use(cors());
app.use(Body);
app.use(router.routes());
app.use(router.allowedMethods());

server.listen(port, () => {
  models();
  console.log(`Server is listening to port ${port}`);
});

module.exports = server;
