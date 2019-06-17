const changeCase = require('change-object-case');
const validation = require('./../../lib/validation');
const Question = require('./../../models/Question');
const Member = require('./../../models/Member');
const Answer = require('./../../models/Answer');

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
		const member = await Member.findOneById(memberId);
		if (!member) {
			ctx.status = 404;
			ctx.body = {
				status: 404,	
				message: '존재하지 않는 사용자입니다.',
			};
			return;
		}
		const question = await Question.create(data);
		await Member.updateQuestion(memberId, member.questionCount);
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
	console('질문 수정');
	const { _id } = ctx.params;
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
		await Question.updateByIdx(idx, data);
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
			data: question,
		};
	}
};

exports.adoptQuestion = async (ctx) => {
	console.log('질문 채택');
	const { _id } = ctx.params;
	const { body } = ctx.request;
	
	try {
		const question = await Question.findOneById(_id);
		console.log(question);
		if (!question) {
			ctx.status = 404;
			ctx.body = {
				status: 404,
				message: '질문이 존재하지 않습니다.',
			};
			return;
		}
		if (question.answerId !== null) {
			ctx.status = 401;
			ctx.body = {
				status: 401,
				message: '이미 채택된 답변이 존재하는 질문입니다.',
			};
			return;
		}
		const data = changeCase.camelKeys(body);
		await Question.updateById(_id, data);

		const answers = await Answer.findByQuestionId(_id);
		for (let i = 0; i < answers.length; i += 1) { 
			const answer = answers[i];
			if (answer._id === question.answerId) {
				Answer.updateById(answer._id, { isAdopted: 1});
			} else {
				Answer.updateById(answer._id, { isAdopted: -1});
			}
    }
		ctx.status = 200;
		ctx.body = {
			status: 200,
			message: '질문 채택에 성공하였습니다.',
		};
	} catch (error) {
		console.log(error.message);
		ctx.status = 500;
		ctx.body = {
			status: 500,
			message: '질문 채택에 실패하였습니다.',
		};
	}
};

exports.deleteQuestion = async (ctx) => {
	console.log('질문 삭제');
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
		await Question.deleteById(_id);
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
	const { _id } = ctx.params;
	try {
		const question = await Question.findOneById(_id);
		console.log(question);
		
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
			data: {
				question,
			},
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
