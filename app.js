const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const routes = require('./routes/')
const { Mistake } = require('./helpers/Errors.js');
/*
const userRoutes = require('./user/routes/public/user.js');
const currencyRoutes = require('./currencyExchange/routes/user/index.js');
*/

const dbConfig = require('./config/db');

const app = new Koa();
const router = new Router();

dbConfig.connect()
.then(() => console.log('Conexión a MongoDB establecida'))
.catch(err => console.error('Error al conectar con MongoDB:', err));

// Parsear el cuerpo de las solicitudes
app.use(bodyParser());

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = {
            error: {
                message: err.message || 'Ocurrió un error interno.'
            }
        };
        ctx.app.emit('error', err, ctx);
    }
});

//manejo de errores
app.on('error', (err, ctx) => {
    if (err instanceof Mistake) {
        ctx.status = err.status;
        ctx.body = { error: err.message };
    } else {
        ctx.status = 500;
        ctx.body = { error: 'Error interno del servidor' };
        console.error('Error inesperado:', err);
    }
});

router.get('/', (ctx) => {
    ctx.body = 'Hola Mundo!';
});

app.use(router.routes()).use(router.allowedMethods());
app.use(routes.router.middleware())
app.use(routes.joi_router.middleware())

/*
app.use(userRoutes.middleware());
app.use(currencyRoutes.middleware());
*/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
