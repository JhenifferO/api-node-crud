import mongoose from 'mongoose'

mongoose.connect(process.env.STRING_CONEXAO_BD)

const db = mongoose.connection

export default db

