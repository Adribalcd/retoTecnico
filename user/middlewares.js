const jwt = require('koa-jwt')
const { User } = require('./models/')
const JWT_CUSTOMER_SECRET = process.env.JWT_CUSTOMER_SECRET || "SUPPA_SECRET";

exports.JWT = jwt({
    secret:  process.env.JWT_CUSTOMER_SECRET//validacion
})

exports.user_token_validator = async (ctx, next) => {
    const user = await User.getOne(ctx.state.user.id)
    if (!user) {
        ctx.status = 401
    } else {
        await next()
    }
}
