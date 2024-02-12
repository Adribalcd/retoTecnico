const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const schema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        set: p => bcrypt.hashSync(p, bcrypt.genSaltSync()),
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

schema.index({ email: 1 }, { unique: true })
module.exports = schema
