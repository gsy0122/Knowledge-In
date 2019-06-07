const ChangeCase = require('change-object-case');
const Validate = require('../../lib/validation');
const Member = require('./../../models/Member');

exports.getMembers = async (ctx) => {
  console.log('멤버 전체 조회');
  try {
    const members = await Member.findAll();
    // const members = {};

    // members.teachers = await models.Teacher.getTeachers();
    // members.students = await models.Student.getStudents();
    // members.parents = await models.Parent.getParents();

    ctx.body = {
      status: 200,
      message: '사용자 전체 조회에 성공하였습니다.',
      data: {
        members,
      },
    };
  } catch (error) {
    console.log(error.message);
    ctx.status = 500;
    ctx.body = {
      status: 500,
      message: '사용자 전체 조회에 실패하였습니다.',
    };
  }
};

exports.getMember = async (ctx) => {
  console.log('멤버 조회');
  const { memberId } = ctx.decoded;
  try {
    const member = await Member.findOneById(memberId);
    // const members = {};

    // members.teachers = await models.Teacher.getTeachers();
    // members.students = await models.Student.getStudents();
    // members.parents = await models.Parent.getParents();

    ctx.body = {
      status: 200,
      message: '사용자 조회에 성공하였습니다.',
      data: {
        member,
      },
    };
  } catch (error) {
    console.log(error.message);
    ctx.status = 500;
    ctx.body = {
      status: 500,
      message: '사용자 조회에 실패하였습니다.',
    };
  }
}

exports.addMember = async (ctx) => {
  console.log('멤버 추가');
  const { body } = ctx.request;

  const validate = Validate.validateMemberRegister(body);
  if (validate.error) {
    console.log(validate.error.message);
    ctx.status = 400;
    ctx.body = {
      status: 400,
      message: '검증 오류입니다.',
    };
    return;
  }

  try {
    const {
      id, mobile, email,
    } = body;

    const overlap = await Member.findAllForCheck(id, mobile, email);
    if (overlap.length) {
      ctx.status = 409;
      ctx.body = {
        status: 409,
        message: '이미 존재하는 [아이디, 이메일] 입니다',
      };
      return;
    }
    const data = ChangeCase.camelKeys(ctx.request.body);
    await Member.create(data);
    ctx.status = 200;
    ctx.body = {
      status: 200,
      message: '사용자 추가에 성공하였습니다.',
    };
  } catch (error) {
    console.log(error.message);
    ctx.status = 500;
    ctx.body = {
      status: 500,
      message: '사용자 추가에 실패하였습니다.',
    };
  }
};

exports.modifyMember = async (ctx) => {
  const { id } = ctx.params;
  console.log('멤버 수정');
  try {
    const member = await Member.findOneById(id);

    if (!member) {
      ctx.satuts = 404;
      ctx.body = {
        status: 404,
        message: '존재하지 않는 사용자입니다',
      };
      return;
    }

		const data = ctx.request.body;
    const validate = Validate.validateMemberModify(data);
    if (validate.error) {
      console.log(validate.error.message);
      ctx.status = 400;
      ctx.body = {
        status: 400,
        message: '검증 오류입니다.',
      };
      return;
		}
		
    await Member.updateById(id, ChangeCase.camelKeys(data));
    ctx.body = {
      status: 200,
      message: '사용자 수정에 성공하였습니다.',
    };
  } catch (error) {
    console.log(error.message);
    ctx.status = 500;
    ctx.body = {
      status: 500,
      message: '사용자 수정에 실패하였습니다.',
    };
  }
};

exports.remove = async (ctx) => {
  console.log('멤버 삭제');
	const { id } = ctx.params;
  try {
    const member = await Member.findOneById(id);
		if (!member) {
			ctx.status = 404;
			ctx.body = {
				status: 404,
				message: '존재하지 않는 사용자입니다.',
			};
			return;
		}
		await Member.deleteById(id);
    ctx.status = 200;
    ctx.body = {
      status: 200,
      message: '사용자 삭제에 성공하였습니다.',
    };
  } catch (error) {
    console.log(error.message);
    ctx.status = 500;
    ctx.body = {
      status: 500,
      message: '사용자 삭제에 실패하였습니다.',
    };
  }
};

exports.logout = async (ctx) => {
  const { body } = ctx.request;

  const validate = Validate.validateMemberLogout(body);

  if (validate.error) {
    console.log(validate.error);
    ctx.status = 400;
    ctx.body = {
      status: 400,
      message: '검증 오류입니다.',
    };
    return;
  }

  // const { device } = body;

  try {
    // await redisHelper.logout(
    //   singleton.chat.getInstance(),
    //   singleton.board.getInstance(),
    //   memberId,
    //   device,
    // );
    ctx.body = {
      status: 200,
      message: '로그아웃에 성공하였습니다',
    };
  } catch (error) {
    ctx.body = {
      status: 500,
      message: '로그아웃에 실패하였습니다',
    };
    console.log(error.message);
  }
};
