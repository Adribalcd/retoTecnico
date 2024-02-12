const Joi = require('@hapi/joi')
const axios = require('axios')

exports.paramCaptcha = async (ctx, next) => {
	const res = Joi.string().required().validate(ctx.request.body.captcha);
	
	if (process.env.ENVIROMENT != 'development') {
		if (res.error)
			console.log("Datos invalidos")

		const secret = process.env.RECAPTCHA_KEY;
		const response = ctx.request.body.captcha || null
		
		let { data } = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${response}`,
			{}
		);

		if (!data.success)
			console.log("Datos invalidos")
	}
	return next();
}
