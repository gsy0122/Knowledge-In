const Category = require('./../../models/Category');

exports.findAll = async (ctx) => {
	console.log('카테고리 전체 조회');
	try {
		const categories = await Category.findAll();
		ctx.status = 200
		ctx.body = {
			status: 200,
			message: '카테고리 전체 조회에 성공하였습니다.',
			data: {
				categories,
			},
		};
	} catch (error) {
		console.log(error.message);
		ctx.status = 500;
		ctx.body = {
			status: 500,
			message: '카테고리 전체 조회에 실패하였습니다.',
		};
	}
};

exports.findOne = async (ctx) => {
	console.log('카테고리 조회');
	const { _id } = ctx.params;
	try {
		const category = await Category.findOneById(_id);
		console.log(category);
		
		if (!category) {
			ctx.status = 404;
			ctx.body = {
				status: 404,
				message: '카테고리가 존재하지 않습니다.',
			};
			return;
		}
		ctx.status = 200
		ctx.body = {
			status: 200,
			message: '카테고리 조회에 성공하였습니다.',
			data: {
				category,
			},
		};
	} catch (error) {
		console.log(error.message);
		ctx.status = 500;
		ctx.body = {
			status: 500,
			message: '카테고리 조회에 실패하였습니다.',
		};
	}
};