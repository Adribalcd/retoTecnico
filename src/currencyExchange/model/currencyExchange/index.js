const mongoose = require('mongoose')
const schema = require('./schema.js')

class CurrencyExchangeRequest {
    
    static async createExchangeRequest(id_usuario, tipo_de_cambio, monto_enviar, monto_recibir, tasaDeCambioId, purchase_price, sale_price) {
        try {
            const exchangeRequest = await this.create({
                id_usuario,
                tipo_de_cambio,
                monto_enviar,
                monto_recibir,
                tasa_de_cambio: {
                    _id: tasaDeCambioId,
                    purchase_price,
                    sale_price
                }
            });
            return exchangeRequest;
        } catch (error) {
            console.error("Error creating exchange request:", error);
            throw error;
        }
    }    

    static async  listExchangeRequestsForUser(userId) {
        try {
            const requests =  await this.find({ id_usuario: userId }).sort({ createdAt: -1 });
            return requests;
        } catch (error) {
            console.error("Error al listar:", error);
            throw error;
        }
    }

    static async findExchangeRequest(requestId, userId) {
        try {
            const result = await this.findOne({ _id: requestId, id_usuario: userId });
            return result;
        } catch (error) {
            console.error("Error al buscar la solicitud", error);
            throw error;
        }
    }
    
    
    static async deleteExchangeRequest(requestId, userId) {
        try {
            const result = await this.deleteOne({ _id: requestId, id_usuario: userId });
            return result;
        } catch (error) {
            console.error("Error al eliminar", error);
            throw error;
        }
    }

}
schema.loadClass(CurrencyExchangeRequest)

module.exports = mongoose.model('CurrencyExchangeRequest', schema)
