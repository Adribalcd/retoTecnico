const Router = require('koa-joi-router')
const Joi = Router.Joi
const user_controller = require('../../controllers/')
const router = Router()
const { paramCaptcha } = require("../../../middlewares")


router
    .prefix('/')

router
    .post('/register', {
        meta: {
            swagger: {
                summary: 'User account creation',
                tags: ['AUTH_USER'],
            }
        },
        validate: {
            body: {
                captcha: Joi.string().trim().required(),
                email: Joi.string().lowercase().email().min(3).max(80).required(),
                password: Joi.string().replace(/\s/g, '').min(6).max(100).required(),
                password2: Joi.string().replace(/\s/g, '').min(6).max(100).required(),
                accept_conditions: Joi.boolean().required()
            },
            type: 'json',
            output: {
                201: {
                    body: {
                        token: Joi.string().required(),
                    },
                },
            }
        },
        handler: [
            paramCaptcha,
            user_controller.create,
        ]
    })

router
    .post('/login', {
        meta: {
            swagger: {
                summary: 'User login',
                tags: ['AUTH_USER'],
            }
        },
        validate: {
            body: {
                captcha: Joi.string().trim().required(),
                email: Joi.string().lowercase().email().required(),
                password: Joi.string().replace(/\s/g, '').required(),
            },
            type: 'json',
            output: {
                200: {
                    body: {
                        token: Joi.string().required(),
                    },
                }
            }
        },
        handler: [
            paramCaptcha,
            user_controller.login,
        ]
    })
    
module.exports = router