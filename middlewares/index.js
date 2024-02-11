const Joi = require('@hapi/joi')
const axios = require('axios')

exports.paramCaptcha = async (ctx, next) => {
	let RECAPTCHA_KEY= process.env.RECAPTCHA_KEY
	
	const res = Joi.string().required().validate(ctx.request.body.captcha);
	if (res.error)
		console.log("Datos invalidos")

	const secret = RECAPTCHA_KEY;
	const response = ctx.request.body.captcha || null
	console.log("response",response)
	console.log("response length",response.length)
	let { data } = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${response}`,
		{}
	);

	console.log("data", data)
	if (!data.success)
        console.log("Datos invalidos")

	return next();
}
