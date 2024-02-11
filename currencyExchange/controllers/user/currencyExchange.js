const axios = require('axios');
const { User } = require('../../../user/models');
const { currencyExchange } = require('../../model');
const { Mistake } = require('../../../helpers/Errors.js');

exports.createExchangeRequest = async (ctx, next) => {
    const tipo_de_cambio = ctx.params.tipo_de_cambio;
    const monto_enviar = ctx.params.monto_enviar;

    if (!['compra', 'venta'].includes(tipo_de_cambio) || isNaN(parseFloat(monto_enviar)) || parseFloat(monto_enviar) <= 0) {
        throw new Mistake(400, 'Datos de entrada inválidos');
    }

    const user = await User.getOne_(ctx.state.user.id);

    try {
        const response = await axios.get('https://api.test.cambioseguro.com/api/v1.1/config/rates');
        const rates = response.data.data;

        if (!rates || !rates.purchase_price || !rates.sale_price) {
            throw new Mistake(500, 'Tasas de cambio no disponibles');
        }

        let tasaDeCambioId = rates._id;
        let purchase_price = rates.purchase_price;
        let sale_price = rates.sale_price;

        let monto_recibir = 0;
        if (tipo_de_cambio === 'compra') {
            monto_recibir = parseFloat(monto_enviar) * purchase_price;
        } else {
            monto_recibir = parseFloat(monto_enviar) / sale_price;
        }

        monto_recibir = Math.round(monto_recibir * 100) / 100;

        await currencyExchange.createExchangeRequest(
            user._id, tipo_de_cambio, monto_enviar, monto_recibir, tasaDeCambioId, purchase_price, sale_price
        );
        
        ctx.body = { monto_recibir };

    } catch (error) {
        throw new Mistake(500, "Error al procesar la solicitud: " + error.message);
    }
};

exports.listUserExchangeRequests = async (ctx) => {
    try {
        const userId = ctx.state.user.id;
        const userRequests = await currencyExchange.listExchangeRequestsForUser(userId);
        ctx.status = 200;
        ctx.body = { message: "Solicitudes de cambio recuperadas exitosamente", userRequests };
    } catch (error) {
        throw new Mistake(500, "Error interno del servidor");
    }
};

exports.getExchangeRequestDetails = async (ctx) => {
    try {
        const { id } = ctx.params;
        const userId = ctx.state.user.id;
        const requestDetails = await currencyExchange.getExchangeRequestDetails(id);

        if (!requestDetails) {
            throw new Mistake(404, "Solicitud no encontrada o no pertenece al usuario");
        }

        ctx.status = 200;
        ctx.body = { message: "Detalle de la solicitud de cambio", requestDetails };
        
    } catch (error) {
        throw new Mistake(500, "Error interno del servidor");
    }
};

exports.deleteExchangeRequest = async (ctx) => {
    try {
        const { id } = ctx.params;
        const userId = ctx.state.user.id;
        const requestToDelete = await currencyExchange.deleteExchangeRequest(id, userId);

        if (!requestToDelete) {
            throw new Mistake(404, "Solicitud no encontrada o no pertenece al usuario");
        }

        ctx.status = 200;
        ctx.body = { message: "Solicitud de cambio eliminada exitosamente" };
        
    } catch (error) {
        throw new Mistake(500, "Error interno del servidor");
    }
};
