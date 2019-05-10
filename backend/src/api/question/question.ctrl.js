const changeCase = require('change-object-case');
const validation = require('./../../lib/validation');
const models = require('./../../models');

exports.createQuestion = async (ctx) => {
	console('질문 추가');
	const body = ctx.request;
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
		const question = await models.Question.create(data);
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
			data: question,
		};
	}
};

exports.modifyQuestion = async (ctx) => {
	console('질문 추가');
	const { idx } = ctx.params;
	const body = ctx.request;
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
		const question = await models.Question.findOneByIdx(idx);
		if (!question) {
			ctx.status = 404;
			ctx.body = {
				status: 404,
				message: '질문이 존재하지 않습니다.',
			};
			return;
		}
		const data = changeCase.camelKeys(body);
		await models.Question.updateByIdx(idx, data);
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
			message: '질문 추가에 실패하였습니다.',
			data: question,
		};
	}
};

exports.deleteQuestion = async (ctx) => {
	console.log('질문 삭제');
	const { idx } = ctx.params;
 	try {
		const question = await models.Question.findOneByIdx(idx);
		if (!question) {
			ctx.status = 404;
			ctx.body = {
				status: 404,
				message: '질문이 존재하지 않습니다.',
			};
			return;
		}
		await models.Question.deleteByIdx(idx);
		ctx.status = 200
		ctx.body = {
			status: 200,
			message: '질문 삭제에 성공하였습니다.',
		};
	} catch (error) {
		console.log(error.message);
		ctx.status = 500;
		ctx.body = {
			status = 500,
			message= '질문 조회에 실패하였습니다.',
		};
	}
};

exports.viewQuestions = async (ctx) => {
	console.log('질문 전체 조회');
	try {
		const questions = await models.Question.findAll();
		ctx.status = 200
		ctx.body = {
			status: 200,
			message: '질문 전체 조회에 성공하였습니다.',
			data: {
				questions,
			},
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
	const { idx } = ctx.params;
	try {
		const question = await models.Question.findOneByIdx(idx);
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
			status = 500,
			message= '질문 조회에 실패하였습니다.',
		};
	}
};
