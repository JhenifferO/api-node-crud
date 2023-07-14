import express from 'express'
import db from './config/dbConnect.js'
import routes from './routes/index.js'
import manipuladorDeErros from './middlewares/manipuladorDeErros.js'
import manipulador404 from './middlewares/manipulador404.js'
import verificaToken from './middlewares/verificaToken.js'
import swaggerUi from 'swagger-ui-express'



db.on('erro', console.log.bind(console, 'Erro de conexão'))

db.once('open', () => {
	console.log('Conexão com banco feita com sucesso')
})

const app = express()

app.use(express.json())

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
	next();
});

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(json))

routes(app)

app.use(manipuladorDeErros)
app.use(manipulador404)

export default app
