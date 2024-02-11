const Router = require('koa-joi-router')

let rutas = [];

const router = new Router()
router.use(...rutas.map(r => r.routes()))


const joi_router = Router()

const demo_modules = [
    require('../user/routes/public/user.js'),
    require('../currencyExchange/routes/user/index.js'),
]

const modules = [
    ...demo_modules,
]

joi_router.use(...modules)

module.exports = {
    router,
    joi_router
}