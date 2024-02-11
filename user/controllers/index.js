const JWT = require('jsonwebtoken')
const uid = require('uid-safe')
const { User } = require('../models')
const { Mistake } = require('../../helpers/Errors.js');

async function genJWT(payload) {
    const jti = await uid(24);
    const JWT_CUSTOMER_EXPIRE = process.env.JWT_CUSTOMER_EXPIRE;
    const JWT_CUSTOMER_SECRET = process.env.JWT_CUSTOMER_SECRET;

    try {
        const token = JWT.sign(
            payload,
            JWT_CUSTOMER_SECRET,
            {
                expiresIn: JWT_CUSTOMER_EXPIRE,
                jwtid: jti,
            }
        );

        return token;
    } catch (error) {
        console.error("Error al generar el JWT: ", error);
        throw new Mistake(500, 'Error al generar el token JWT');
    }
}

exports.create = async (ctx, next) => {
    const { email, password, password2, accept_conditions } = ctx.request.body;

    if (!accept_conditions) {
        throw new Mistake(400, 'Debe de aceptar los términos y condiciones');
    }

    if (password !== password2) {
        throw new Mistake(400, 'Las contraseñas no coinciden');
    }

    let exists = await User.getOneByEmail(email);
    if (exists) {
        throw new Mistake(400, 'Este correo ya está siendo utilizado');
    }

    let user_auth;
    try {
        user_auth = await User.createData(email, password);
    } catch (error) {
        throw new Mistake(500, 'Error al crear el usuario');
    }

    const token = await genJWT({
        id: user_auth._id,
        email: user_auth.email,
    });

    ctx.status = 201;
    ctx.body = { token };
}

exports.login = async (ctx, next) => {
    const { email, password } = ctx.request.body;
    const auth_user = await User.getOneByEmail(email);

    if (!auth_user) {
        throw new Mistake(400, 'El usuario no existe');
    }

    if (!auth_user.validPassword(password)) {      
        throw new Mistake(400, 'Contraseña incorrecta');
    }

    const token = await genJWT({
        id: auth_user._id,
        email: auth_user.email,
    });

    ctx.body = { token };
}