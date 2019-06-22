const changeCase = require('change-object-case');
const validation = require('./../../lib/validation');
const Question = require('./../../models/Question');
const Answer = require('./../../models/Answer');
const Member = require('./../../models/Member');

exports.createAnswer = async (ctx) => {
	console.log('답변 추가');
	const { body } = ctx.request;
	const { memberId } = ctx.decoded; 
	try {
		await validation.ValidateAnswer(body);
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
		const question = await Question.findOneById(data.question);
		if (!question) {
			ctx.status = 401;
			ctx.body = {
				status: 401,
				message: '질문이 존재하지 않습니다.',
			};
			return;
		}
		const answer = await Answer.create(data);
		await Question.addAnswer(question._id, question.answerCount);
		await Member.addAnswer(member._id, member.answerCount);
		ctx.status = 200;
		ctx.body = {
			status: 200,
			message: '답변 추가에 성공하였습니다.',
			data: answer,
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
	const { _id } = ctx.params;
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
		const question = await Question.findOneById(data.questionId);
		if (!question) {
			ctx.status = 401;
			ctx.body = {
				status: 401,
				message: '질문이 존재하지 않습니다.',
			};
			return;
		}
		if (question.isAdopted !== 0) {
			ctx.status = 402;
			ctx.body = {
				status: 402,
				message: '채택된 질문입니다.',
			};
			return;
		}
		const answer = await Answer.findById(_id);
		if (!answer) {
			ctx.status = 404;
			ctx.body = {
				status: 404,
				message: '답변이 존재하지 않습니다.',
			};
			return;
		}
		await Answer.findOneAndUpdate(_id, data);
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

exports.AdoptAnswer = async (ctx) => {
	console.log('답변 채택');
	const { _id } = ctx.params;
	try {
		const answer = await Answer.findOneById(_id);
		if (!answer) {
			ctx.status = 401;
			ctx.body = {
				status: 401,
				message: '답변이 존재하지 않습니다.',
			};
			return;
		}
		const question = await Question.findOneById(answer.question._id);
		if (!question) {
			ctx.status = 402;
			ctx.body = {
				status: 402,
				message: '질문이 존재하지 않습니다.',
			};
			return;
		}
		if (question.answer !== null) {
			ctx.status = 403;
			ctx.body = {
				status: 403,
				message: '채택된 질문입니다.',
			};
			return;
		}
		const member = await Member.findOneById(answer.member._id);
		console.log(member.adoptPoint);
		console.log(question.point);
		await Member.updateAdopt(member, question.point);
		await Answer.updateById(_id, { isAdopted: 1 });
		await Question.updateById(question._id, { answer: _id });
		ctx.status = 200;
		ctx.body = {
			status: 200,
			message: '답변 채택에 성공하였습니다.',
		};
	} catch (error) {
		console.log(error.message);
		ctx.status = 500;
		ctx.body = {
			status: 500,
			message: '답변 채택에 실패하였습니다.',
		};
	}
};

exports.deleteAnswer = async (ctx) => {
	const { _id } = ctx.params;
	try {
		const answer = await Answer.findOneById(_id);
		if (!answer) {
			ctx.status = 404;
			ctx.body = {
				status: 404,
				message: '답변이 존재하지 않습니다.',
			};
			return;
		}
		if (answer.isAdopted === 1) {
			ctx.status = 401;
			ctx.body = {
				status: 401,
				message: '채택된 답변은 삭제할 수 없습니다.',
			};
		}
		await Answer.findByIdAndRemove(_id);
		const question = await Question.findOneById(answer.question._id);
		if (question) {
			await Question.removeAnswer(question._id, question.answerCount);
		}
		const member = await Member.findOneById(answer.member._id);
		if (member) {
			await Member.removeAnswer(member._id, member.answerCount);
		}
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
		const answers = await Answer.findAll();
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
	console.log('답변 조회');
	const { questionId } = ctx.params;
	try {
		const question = await Question.findById(questionId);
		if (!question) {
			ctx.status = 404;
			ctx.body = {
				status: 404,
				message: '질문이 존재하지 않습니다.',
			};
			return;
		}
		const answers = await Answer.findByQuestionId(questionId);
		console.log(answers);
		ctx.status = 200;
		ctx.body = {
			status: 200,
			message: '답변 조회에 성공하였습니다.',
			data: answers,
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
