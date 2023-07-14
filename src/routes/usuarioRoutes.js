import express from 'express'
import UsuarioController from '../controllers/usuarioController.js'
import verificaToken from '../middlewares/verificaToken.js'

const router = express.Router()

router 
	.post('/cadastro', UsuarioController.newUsuario)
	.post('/login', UsuarioController.login)
	.post('/favoritos', verificaToken,  UsuarioController.setFavoritos)
	.get('/favoritos/:id', verificaToken, UsuarioController.getAllFavoritos)

export default router
   