const jwt = require('koa-jwt')
const { User } = require('./models/')
const { Mistake } = require('../../helpers/Errors.js');

exports.JWT = jwt({
    secret: process.env.JWT_CUSTOMER_SECRET,
    passthrough: true,
});

exports.user_token_validator = async (ctx, next) => {
    if (ctx.state.user) {
        const user = await User.getOne(ctx.state.user.id);
        if (!user) {
            throw new Mistake(401, 'Usuario no encontrado');
        } else {
            await next();
        }
    } else {
        throw new Mistake(401, 'Token inválido o no proporcionado');
    }
};

