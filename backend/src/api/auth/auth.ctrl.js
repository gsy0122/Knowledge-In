const mime = require('mime-types');
const Member = require('./../../models/Member');
const lib = require('./../../lib/token');

exports.login = async (ctx) => {
  const {
    id, pw,
  } = ctx.request.body;

  if (!id) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      message: '아이디를 입력하세요',
      data: {
        tocken: null,
      },
    };

    return;
  }

  if (!pw) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      message: '비밀번호를 입력하세요',
      data: {
        token: null,
      },
    };

    return;
  }

  try {
    const member = await Member.findOneForLogin(id, pw);
    // 로그인 실패시
    if (!member) {
      ctx.status = 401;
      ctx.body = {
        status: 401,
        message: '아이디 또는 비밀번호가 일치하지 않습니다',
        data: {
          token: null,
        },
      };

      return;
    }

    if (member.length === 0) {
      ctx.status = 500;
      ctx.body = {
        status: 500,
        message: '인증에 실패하였습니다',
      };

      return;
    }

    console.log(member.id);

    const token = await lib.createToken(member.id, member.auth);
    const refreshToken = await lib.createRefreshToken(member.id, member.auth);

    // if (member.profile_image !== '') {
    //   member.profile_image = `http://115.68.25.98:3000/${mime.lookup(member.profile_image)}/${member.profile_image}`;
    // }

    delete member.pw;
    delete member.join_date;

    console.log('success');

    ctx.status = 200;
    ctx.body = {
      status: 200,
      message: '로그인에 성공하였습니다',
      data: {
        token,
        refresh_token: refreshToken,
        member,
      },
    };
  } catch (error) {
    console.log(error.message);
    ctx.status = 500;
    ctx.body = {
      status: 500,
      message: '로그인에 실패하였습니다',
      data: {
        token: null,
      },
    };
  }
};

exports.authToken = (ctx) => {
  ctx.status = 200;
  ctx.body = {
    status: 200,
    message: '검증 성공',
  };
};
