import express from 'express'
import ImovelController from '../controllers/imovelController.js'

//middleware não utilizado 
// verificaToken, 
import verificaToken from '../middlewares/verificaToken.js'

const router = express.Router()
router 
	.get('/imoveis', ImovelController.getAllImoveis)
	.post('/imoveis',  ImovelController.newImovel)
	.put('/imoveis/:id', ImovelController.updateImovel)
	.delete('/imoveis/:id',  ImovelController.deleteImovel)
	.get('/imoveis/:id', ImovelController.getImovelById)
	.get('/imoveis_user/:id',  ImovelController.getImovelFromUser)

export default router


    