const JWT = require('jsonwebtoken')
const uid = require('uid-safe')
const { User } = require('../models')

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
        throw error; 
    }
}

exports.create = async (ctx, next) => {
    const {email, password, password2, accept_conditions } = ctx.request.body;

    if (!accept_conditions) {
        console.log('Debe de aceptar los términos y condiciones');
        ctx.status = 400; // Bad Request
        ctx.body = { error: 'Debe de aceptar los términos y condiciones' };
        return;
    }

    if (password !== password2) {
        console.log('Las contraseñas no coinciden');
        ctx.status = 400;
        ctx.body = { error: 'Las contraseñas no coinciden' };
        return;
    }

    let exists = await User.getOneByEmail(email);
    if (exists) {
        console.log('Este correo ya está siendo utilizado');
        ctx.status = 400;
        ctx.body = { error: 'Este correo ya está siendo utilizado' };
        return;
    }

    // Se crea el usuario y se genera un token si las verificaciones pasan
    let user_auth;
    try {
        user_auth = await User.createData(email, password);
    } catch (error) {
        console.log('Error al crear el usuario:', error);
        ctx.status = 500; // Internal Server Error
        ctx.body = { error: 'Error al crear el usuario' };
        return;
    }

    console.log(user_auth);
    const token = await genJWT({
        id: user_auth._id,
        email: user_auth.email,
    });
	console.log("Holaaa")
    ctx.status = 201;
    ctx.body = { token };
}


exports.login = async (ctx, next) => {
	const { email, password } = ctx.request.body
	const auth_user = await User.getOneByEmail(email)

    if (!auth_user) {
        console.log('El usuario no existe');
        ctx.status = 400;
        return;
    }

    if (!auth_user.validPassword(password)) {
        console.log('Contraseña incorrecta');
        ctx.status = 400;
        return;
    }

	const token = await genJWT({
		id: auth_user._id,
		email: auth_user.email,
	})
	console.log("Inicio de sesión exitoso!!");

	ctx.body = {
		token,
	}
}