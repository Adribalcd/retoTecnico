const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const util = require('util')
const schema = require('./schema.js')
const typeID = mongoose.Types.ObjectId
const random_bytes = util.promisify(crypto.randomBytes)


class User {

    validPassword(password) {
        return bcrypt.compareSync(password, this.password)
    }

    static async getOneByEmail(email) {
        return this
            .findOne({
                email
            })
            .exec()
    }

    static async createData(email, password) {
        const auth_client = await this.create({
            email,
            password
        })
        return auth_client
    }

    static async getOne(_id) {
        return this.findOne({
                _id
            })
            .exec()
    }

    static async getOne_(_id) {
        let data = await this
            .findOne({
                _id
            })
            .lean()
            .exec()

        if (data)
            return data
    }

}

schema.loadClass(User)

module.exports = mongoose.model('user', schema)
