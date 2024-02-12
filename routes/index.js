const Router = require('koa-joi-router')
const { SwaggerAPI } = require('koa-joi-router-docs-v2')

const joi_router = Router()

const all_modules = [
    require('../user/routes/public/user.js'),
    require('../currencyExchange/routes/user/index.js'),
]

const modules = [
    ...all_modules,
]

joi_router.use(...modules)

const swagger = new SwaggerAPI()

all_modules.forEach(x => {
	swagger.addJoiRouter(x)
})

const spec = swagger.generateSpec({
    info: {
        title: "retoTecnico API",
        description: "La API retoTecnico proporciona funcionalidades enfocadas en el manejo de divisas y la autenticación de usuarios. Permite a los usuarios registrarse, iniciar sesión y realizar operaciones de compra y venta de divisas, específicamente dólares, basándose en las tasas de cambio actuales obtenidas a través de la API externa proporcionada.",
        version: "1.0.0",
    },
    tags: [
        {
            name: 'user',
            description: 'API para autentificación de usuarios.'
        },
        {
            name: 'currency',
            description: 'API para acceder a funcionalidades de usuario relacionadas al tipo de cambio.'
        }
        
    ],
}, {
    defaultResponses: {}
})

if (process.env.ENVIROMENT == 'development') {
	
	joi_router.get('/_api.json', async ctx => {
		ctx.body = JSON.stringify(spec, null, '  ')
	})

	joi_router.get('/apiDocs', async ctx => {
		ctx.body = `
	  <!DOCTYPE html>
	  <html>
	  <head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>retoTecnico API</title>
	  </head>
	  <body>
		<redoc spec-url='/_api.json' lazy-rendering></redoc>
		<script src="https://rebilly.github.io/ReDoc/releases/latest/redoc.min.js"></script>
	  </body>
	  </html>
	  `
	})
}

module.exports = {
    joi_router
}