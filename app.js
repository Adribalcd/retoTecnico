const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const routes = require('./routes/')
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



//pendiente realizar el despliegue en EC2
//pendiente documentacion
//eliminar carpetas y codigo no usado
//subir a github
