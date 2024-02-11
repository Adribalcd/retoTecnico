const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const currencyExchangeRequestSchema = new Schema({
    id_usuario: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    tipo_de_cambio: {
        type: String,
        required: true,
        enum: ['compra', 'venta'],
    },
    monto_enviar: {
        type: Number,
        required: true,
        min: 0
    },
    monto_recibir: {
        type: Number,
        required: true,
        min: 0
    },
    tasa_de_cambio: {
        _id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        purchase_price: {
            type: Number,
            required: true
        },
        sale_price: {
            type: Number,
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

currencyExchangeRequestSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = currencyExchangeRequestSchema;

