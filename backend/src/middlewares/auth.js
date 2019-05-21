const lib = require('./../lib/token');

const authMiddleware = async (ctx, next) => {
  const token = ctx.request.header['x-access-token'];
  let decodeToken;

  if (!token) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      message: '토큰이 전송되지 않았습니다',
    };
  }
  try {
    decodeToken = await lib.verifyToken(token);
    if (decodeToken.sub !== 'token') {
      ctx.status = 403;
      ctx.body = {
        status: 403,
        message: '잘못된 토큰 입니다',
      };

      return;
    }
    ctx.decoded = decodeToken;
  } catch (error) {
    console.log(error);

    let status = null;
    let message = null;

    switch (error.message) {
      case 'jwt must be provided':
        status = 400;
        message = '토큰이 전송되지 않았습니다';
        break;
      case 'jwt malformed':
      case 'invalid token':
      case 'invalid signature':
        status = 401;
        message = '위조된 토큰입니다';
        break;
      case 'jwt expired':
        status = 410;
        message = '토큰이 만료되었습니다';
        break;
      default:
        console.log(error.message);
        status = 500;
        message = '다시 시도해 주세요';
        break;
    }

    ctx.status = status;
    ctx.body = {
      status,
      message,
    };

    return;
  }

  ctx.decoded = decodeToken;

  await next();
};

module.exports = authMiddleware;
