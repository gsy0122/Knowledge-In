const changeCase = require('change-object-case');
const models = require('./../../models');
const validation = require('./../../lib/validation');

exports.createAnswer = async (ctx) => {
	console.log('답변 추가');
	const body = ctx.request;
	try {
		await validation.ValidateAnswer(body);
	} catch (error) {
		ctx.status = 400;
		ctx.body = {
			status: 400,
			message: '검증 오류입니다.',
		};
		return;
	}
	const data = changeCase.camelKeys(body);
	try {
		const question = await models.Question.findOneByIdx(data.questionIdx);
		if (!question) {
			ctx.status = 401;
			ctx.body = {
				status: 401,
				message: '질문이 존재하지 않습니다.',
			};
			return;
		}
		if (question.is_adopted !== 0) {
			ctx.status = 402;
			ctx.body = {
				status: 402,
				message: '채택된 질문입니다.',
			};
			return;
		}
		await models.Answer.create(data);
		ctx.status = 200;
		ctx.body = {
			status: 200,
			message: '답변 추가에 성공하였습니다.',
		};
	} catch (error) {
		console.log(error.message);
		ctx.status = 500;
		ctx.body = {
			status: 500,
			message: '답변 추가에 실패하였습니다.',
		};
	}
};

exports.modifyAnswer = async (ctx) => {
	console.log('답변 수정');
	const { idx } = ctx.params;
	const body = ctx.request;
	try {
		await validation.ValidateAnswer(body);
	} catch (error) {
		ctx.status = 400;
		ctx.body = {
			status: 400,
			message: '검증 오류입니다.',
		};
		return;
	}
	const data = changeCase.camelKeys(body);
	try {
		const question = await models.Question.findOneByIdx(data.questionIdx);
		if (!question) {
			ctx.status = 401;
			ctx.body = {
				status: 401,
				message: '질문이 존재하지 않습니다.',
			};
			return;
		}
		if (question.is_adopted !== 0) {
			ctx.status = 402;
			ctx.body = {
				status: 402,
				message: '채택된 질문입니다.',
			};
			return;
		}
		const answer = await models.Answer.findOneByIdx(idx);
		if (!answer) {
			ctx.status = 404;
			ctx.body = {
				status: 404,
				message: '답변이 존재하지 않습니다.',
			};
			return;
		}
		await models.Answer.updateByIdx(idx, data);
		ctx.status = 200;
		ctx.body = {
			status: 200,
			message: '답변 수정에 성공하였습니다.',
		};
	} catch (error) {
		console.log(error.message);
		ctx.status = 500;
		ctx.body = {
			status: 500,
			message: '답변 수정에 실패하였습니다.',
		};
	}
};

exports.deleteAnswer = async (ctx) => {
	const { idx } = ctx.params;
	try {
		const answer = await models.Answer.findOneByIdx(idx);
		if (!answer) {
			ctx.status = 404;
			ctx.body = {
				status: 404,
				message: '답변이 존재하지 않습니다.',
			};
			return;
		}
		await models.Answer.deleteByIdx(idx);
		ctx.status = 200;
		ctx.body = {
			status: 200,
			message: '답변 삭제에 성공하였습니다.',
		};
	} catch (error) {
		console.log(error.message);
		ctx.status = 500;
		ctx.body = {
			status: 500,
			message: '답변 삭제에 실패하였습니다.',
		};
	}
};

exports.viewAnswers = async (ctx) => {
	try {
		const answers = await models.Answer.findAll();
		ctx.status = 200;
		ctx.body = {
			status: 200,
			message: '답변 전체 조회에 성공하였습니다.',
			data: {
				answers,
			},
		};
	} catch (error) {
		console.log(error.message);
		ctx.status = 500;
		ctx.body = {
			status: 500,
			message: '답변 전체 조회에 실패하였습니다.',
		};
	}
};

exports.viewAnswersByQuestion = async (ctx) => {
	const { question_idx } = ctx.params;
	try {
		const question = await models.Question.findOneByIdx(question_idx);
		if (!question) {
			ctx.status = 404;
			ctx.body = {
				status: 404,
				message: '질문이 존재하지 않습니다.',
			};
			return;
		}
		const answers = await models.Answer.findByQuestionIdx(question_idx);
		ctx.status = 200;
		ctx.body = {
			status: 200,
			message: '답변 조회에 성공하였습니다.',
			data: {
				answers,
			},
		};
	} catch (error) {
		console.log(error.message);
		ctx.status = 500;
		ctx.body = {
			status: 500,
			message: '답변 조회에 실패하였습니다.',
		};
	}
};
