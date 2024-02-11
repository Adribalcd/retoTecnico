const Router = require('koa-joi-router');
const Joi = Router.Joi;
const currencyExchangeRequestController = require('../../controllers/user/currencyExchange.js');
const auth_user_middleware = require('../../../user/middlewares');
const router = Router();

router.prefix('/user');

router.post('/currencyExchange/:tipo_de_cambio/:monto_enviar', {
    validate: {
        params: {
            tipo_de_cambio: Joi.string().valid('compra', 'venta').required(),
            monto_enviar: Joi.number().positive().required()
        },
        continueOnError: false
    },
    handler: [
        auth_user_middleware.JWT,
        auth_user_middleware.user_token_validator,
        currencyExchangeRequestController.createExchangeRequest,
    ],
});

// Listar todas las solicitudes de cambio del usuario autenticado
router.get('/currencyExchanges', [
    auth_user_middleware.JWT,
    auth_user_middleware.user_token_validator,
    currencyExchangeRequestController.listUserExchangeRequests
]);

// Ver detalle de una solicitud de cambio específica
router.get('/currencyExchange/:id', [
    auth_user_middleware.JWT,
    auth_user_middleware.user_token_validator,
    currencyExchangeRequestController.getExchangeRequestDetails,
]);

// Eliminar una solicitud de cambio específica
router.delete('/currencyExchange/:id', [
    auth_user_middleware.JWT,
    auth_user_middleware.user_token_validator,
    currencyExchangeRequestController.deleteExchangeRequest,
]);

module.exports = router;
