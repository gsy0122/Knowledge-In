const changeCase = require('change-object-case');
const validation = require('./../../lib/validation');
const Question = require('./../../models/Question');
const Member = require('./../../models/Member');

exports.createQuestion = async (ctx) => {
	console.log('질문 추가');
	const { body } = ctx.request;
	const { memberId } = ctx.decoded;
	console.log(body);
  try {
		await validation.ValidateQuestion(body);
	} catch (error) {
    console.log(error.message);
    ctx.status = 400;
    ctx.body = {
      status: 400,
      message: '검증 오류입니다.',
		};
		return;
	}
	const data = changeCase.camelKeys(body);
	try {
		const member = await Member.findOneByMemberId(memberId);
		if (!member) {
			ctx.status = 404;
			ctx.body = {
				status: 404,	
				message: '존재하지 않는 사용자입니다.',
			};
			return;
		}
		data.member = member._id;
		console.log(data);
		const question = await Question.create(data);
		await Member.addQuestion(member._id, member.questionCount);
		ctx.status = 200;
		ctx.body = {
			status: 200,
			message: '질문 추가에 성공하였습니다.',
			data: question,
		};
	} catch (error) {
		console.log(error.message);
		ctx.status = 500;
		ctx.body = {
			status: 500,
			message: '질문 추가에 실패하였습니다.',
		};
	}
};

exports.modifyQuestion = async (ctx) => {
	console.log('질문 수정');
	const { _id } = ctx.params;
	const { body } = ctx.request;
  try {
		await validation.ValidateQuestion(body);
	} catch (error) {
    console.log(error.message);
    ctx.status = 400;
    ctx.body = {
      status: 400,
      message: '검증 오류입니다.',
		};
		return;
	}
	try {
		const question = await Question.findOneById(_id);
		if (!question) {
			ctx.status = 404;
			ctx.body = {
				status: 404,
				message: '질문이 존재하지 않습니다.',
			};
			return;
		}
		const data = changeCase.camelKeys(body);
		await Question.updateById(_id, data);
		ctx.status = 200;
		ctx.body = {
			status: 200,
			message: '질문 수정에 성공하였습니다.',
		};
	} catch (error) {
		console.log(error.message);
		ctx.status = 500;
		ctx.body = {
			status: 500,
			message: '질문 수정에 실패하였습니다.',
		};
	}
};

exports.deleteQuestion = async (ctx) => {
	console.log('질문 삭제');
	const { _id } = ctx.params;
	const { memberId } = ctx.decoded;
 	try {
		const question = await Question.findOneById(_id);
		if (!question) {
			ctx.status = 404;
			ctx.body = {
				status: 404,
				message: '질문이 존재하지 않습니다.',
			};
			return;
		}
    const member = await Member.findOneByMemberId(memberId);
		await Question.deleteById(_id);
		await Member.removeQuestion(member._id, member.questionCount);
		ctx.status = 200
		ctx.body = {
			status: 200,
			message: '질문 삭제에 성공하였습니다.',
		};
	} catch (error) {
		console.log(error.message);
		ctx.status = 500;
		ctx.body = {
			status: 500,
			message: '질문 조회에 실패하였습니다.',
		};
	}
};

exports.viewQuestions = async (ctx) => {
	console.log('질문 전체 조회');
	try {
		const questions = await Question.findAll();
		ctx.status = 200
		ctx.body = {
			status: 200,
			message: '질문 전체 조회에 성공하였습니다.',
			data: questions,
		};
	} catch (error) {
		console.log(error.message);
		ctx.status = 500;
		ctx.body = {
			status: 500,
			message: '질문 전체 조회에 실패하였습니다.',
		};
	}
};

exports.viewQuestion = async (ctx) => {
	console.log('질문 조회');
	const { _id } = ctx.params;
	try {
		const question = await Question.findOneById(_id);
		if (!question) {
			ctx.status = 404;
			ctx.body = {
				status: 404,
				message: '질문이 존재하지 않습니다.',
			};
			return;
		}
		ctx.status = 200
		ctx.body = {
			status: 200,
			message: '질문 조회에 성공하였습니다.',
			data: question,
		};
	} catch (error) {
		console.log(error.message);
		ctx.status = 500;
		ctx.body = {
			status: 500,
			message: '질문 조회에 실패하였습니다.',
		};
	}
};

exports.viewQuestionsByCtgy = async (ctx) => {
	console.log('카테고리별 질문 조회');
	const { category_id } = ctx.params;
	try {
		const questions = await Question.findByCategory(category_id);
		ctx.status = 200
		ctx.body = {
			status: 200,
			message: '카테고리별 질문 조회에 성공하였습니다.',
			data: questions,
		};
	} catch (error) {
		console.log(error.message);
		ctx.status = 500;
		ctx.body = {
			status: 500,
			message: '카테고리별 질문 조회에 실패하였습니다.',
		};
	}
};
