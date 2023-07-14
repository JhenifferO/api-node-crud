import mongoose from 'mongoose'

const usuarioSchema = new mongoose.Schema (
	{
		id: {
			type: String
		},
		nome: {
			type: String,
			required: [true, 'O nome é obrigatório']
		},
		senha: {
			type: String,
			required: [true, 'A senha é obrigatória']
		},
		salvos: {
			type: Array
		}
	}
)

const usuario = mongoose.model('usuario', usuarioSchema)

export default usuario
