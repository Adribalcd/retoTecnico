const Router = require('koa-joi-router');
const Joi = Router.Joi;
const currencyExchangeRequestController = require('../../controllers/user/currencyExchange.js');
const auth_user_middleware = require('../../../user/middlewares');
const router = Router();

router.prefix('/user');

router.post('/currencyExchange/:tipo_de_cambio/:monto_enviar', {
    meta: {
        swagger: {
            summary: 'Request Exchange Rate',
            tags: ['currency'],
        }
    },
    validate: {
        params: {
            tipo_de_cambio: Joi.string().valid('compra', 'venta').required(),
            monto_enviar: Joi.number().positive().required()
        },
        output: {
            200: {
                body: {
                    monto_recibir: Joi.number().positive().required()
                },
            },
        }
    },
    handler: [
        auth_user_middleware.JWT,
        auth_user_middleware.user_token_validator,
        currencyExchangeRequestController.createExchangeRequest,
    ],
});

router.get('/currencyExchanges',{    
    meta: {
            swagger: {
                summary: 'List Currency Exchange Requests',
                tags: ['currency'],
            }
        },
        validate: {
            output: {
                200: {
                    body: {
                        message: Joi.string(),
                        userRequests: Joi.array()
                    },
                },
            }
        }, handler: [
            auth_user_middleware.JWT,
            auth_user_middleware.user_token_validator,
            currencyExchangeRequestController.listUserExchangeRequests]
});


router.get('/currencyExchange/:id', {
    meta: {
        swagger: {
            summary: 'Currency Exchange Request DetailS',
            tags: ['currency'],
        }
    },
    validate: {
        output: {
            200: {
                body: {
                    message: Joi.string(),
                    userRequests: Joi.array()
                }
            },
        }
    }, handler: [
        auth_user_middleware.JWT,
        auth_user_middleware.user_token_validator,
        currencyExchangeRequestController.getExchangeRequestDetails,
    ]}
);

router.delete('/currencyExchange/:id', {
    meta: {
        swagger: {
            summary: 'Delete Currency Exchange Request',
            tags: ['currency'],
        }
    },
    validate: {
        output: {
            200: {
                body: {
                    message: Joi.string()                
                }
            },
        }
    }, handler: [
    auth_user_middleware.JWT,
    auth_user_middleware.user_token_validator,
    currencyExchangeRequestController.deleteExchangeRequest,
]});

module.exports = router;
