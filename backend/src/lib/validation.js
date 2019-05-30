const BaseJoi = require('joi');
const Joi = BaseJoi.extend(require('joi-date-extensions'));

exports.validateMemberRegister = async (body) => {
  const schema = BaseJoi.object().keys({
    id: BaseJoi.string().regex(/^[a-z0-9]{4,20}$/).min(5).max(20),
    pw: BaseJoi.string().regex(/^[!-}]{10,120}$/),
    name: BaseJoi.string().min(1).max(20).required(),
    mobile: BaseJoi.string().regex(/^[0-9]{7,16}$/).required(),
    email: BaseJoi.string().min(8).email(),
    profile_image: BaseJoi.string().allow(''),
    status_message: Joi.string().allow(''),
		auth: Joi.number().integer().required().min(1),
  });

  try {
    return await Joi.validate(body, schema);
  } catch (error) {
    throw error;
  }
};

exports.validateMemberModify = async (body) => {
  const schema = {
    mobile: Joi.string().required(),
    email: Joi.string().min(8).email(),
    status_message: Joi.string().required().allow(''),
    profile_image: Joi.string().required().allow(''),
  };

  try {
    return await Joi.validate(body, schema);
  } catch (error) {
    throw error;
  }
};

exports.validateMemberLogout = async (body) => {
  const schema = {
    device: Joi.string().required().trim(),
  };

  try {
    return await Joi.validate(body, schema);
  } catch (error) {
    throw error;
  }
};

exports.ValidateQuestion = async (body) => {
	const schema = Joi.object().keys({
    memberId: Joi.string().regex(/^[a-z0-9]{4,20}$/).min(5).max(20),
		title: Joi.string().required().trim(),
		content: Joi.string().required().trim(),
		image: Joi.any(),
		category: Joi.string().required(),
		tags: Joi.array().items(Joi.string()),
    point: Joi.number().integer().required().min(0).max(100),
    anonymous: Joi.number().integer().required(),
  });

  try {
    return await Joi.validate(body, schema);
  } catch (error) {
    throw error;
  }
};

exports.ValidateAnswer = async (body) => {
	const schema = Joi.object().keys({
		questionId: Joi.string().required(),
		content: Joi.string().required().trim(),
		tags: Joi.array().items(Joi.string()),
	});

	try {
		return await Joi.validate(body, schema);
	} catch (error) {
		throw error;
	}
};
