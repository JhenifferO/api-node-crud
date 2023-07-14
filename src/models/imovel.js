import mongoose from 'mongoose'

const imovelSchema = new mongoose.Schema(
	{
		id: {type: String},
		categoria: {type: String, required: [true, 'A categoria do imóvel é obrigatória']},
		estado: {type: String, required: [true, 'O estado é obrigatório']},
		cidade: {type: String, required: [true, 'A cidade é obrigatória']},
		comodos: {type: Number},
		quartos: {type: Number},
		banheiros: {type: Number},
		preco: {type: Number},
		imagem: {type: String},
		usuarioId: {type: String}
	},
	{
		versionKey: false
	}
)

const imovel = mongoose.model('imovel', imovelSchema)

export default imovel