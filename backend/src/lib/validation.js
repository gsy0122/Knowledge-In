const BaseJoi = require('joi');
const Joi = BaseJoi.extend(require('joi-date-extensions'));

exports.ValidateQuestion = async (body) => {
	const schema = Joi.object().keys({
		title: Joi.string().required().trim(),
		content: Joi.string().required().trim(),
		image: Joi.any(),
		category: Joi.string().required(),
		tags: Joi.array().items(Joi.string()),
		point: Joi.number().integer().required().min(0).max(100),
  });

  try {
    return await Joi.validate(body, schema);
  } catch (error) {
    throw error;
  }
};

exports.ValidateAnswer = async (body) => {
	const schema = Joi.object().keys({
		question_idx: Joi.number().integer().required(),
		content: Joi.string().required().trim(),
		tags: Joi.array().items(Joi.string()),
	});

	try {
		return await Joi.validate(body, schema);
	} catch (error) {
		throw error;
	}
};
