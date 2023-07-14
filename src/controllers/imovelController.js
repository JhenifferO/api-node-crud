import NaoEncontrado from '../erros/naoEncontrado.js'
import { imovel } from '../models/index.js'

class ImovelController {

	static getAllImoveis = async (req, res, next) => {

		try {
			const result = await imovel.find()

			res.status(200).json({
					msg: 'Sucesso',
					erro: false,
					data: result
				})
				
			next()
			
		} catch (erro) {
			next(erro)
		}

	}

	static newImovel = async (req, res, next) => {
		try {
			let newImovel = new imovel(req.body)

			const imovelResultado = await newImovel.save()

			if(imovelResultado !== null) {
				res.status(200).json({
					msg: 'Imóvel cadastrado com sucesso!', 
					erro: false,
					data: imovelResultado.toJSON()
				})
		
			} 

			next()

		} catch (erro) {
			next(erro)
		}
	}

	static updateImovel = async (req, res, next) => {
		try {
			const id = req.params.id

			const result = await imovel.findByIdAndUpdate(id, { $set: req.body })
			
			if(result !== null) {
				res.status(200).send({ 
					msg: 'Imóvel editado com sucesso',
					erro: false 
				})
			} else {
				next(new NaoEncontrado('Id do imóvel não localizado'))
			}

		} catch (erro) {
			next(erro)
		}
	}

	static deleteImovel = async (req, res, next) => {
		try {
			const id = req.params.id

			const result = await imovel.findByIdAndDelete(id)

			if(result !== null) {
				res.status(200).send({
					msg: 'Excluído com sucesso', 
					erro: false
				})
			} 

		} catch (erro) {
			next(new NaoEncontrado('Id do imóvel não localizado'))

		}
	}

	static getImovelFromUser = async (req, res) => {

		try {
			const { id } = req.params
			
			const result = await imovel.find({usuarioId: id})
			
			if(result !== null) {
				res.status(200).json({
					msg: 'Sucesso',
					data: result,
					erro: false
				})
			} 
			
		} catch (erro) {
			next(erro)
		}
	}

	static getImovelById = async (req, res) => {

		try {
			const { id } = req.params
			const result = await imovel.find({_id: id})
			
			if(result !== null) {
				res.status(200).json({
					msg: 'Sucesso',
					erro: false,
					data: result
				})
			} 

		} catch (erro) {
			next(erro)
		}
	}
}

export default ImovelController

