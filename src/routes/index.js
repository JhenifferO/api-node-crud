import express from 'express'
import usuarios from './usuarioRoutes.js'
import imoveis from './imoveisRoutes.js'

const routes = (app) => {
	app.route('/').get((req, res) => {
		res.status(200).send({titulo: 'API Imóveis'})
	})

	app.use(
		express.json(),
		usuarios,
		imoveis
	)
}

export default routes
