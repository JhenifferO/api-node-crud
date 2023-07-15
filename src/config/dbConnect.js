import mongoose from 'mongoose'

mongoose.connect("mongodb+srv://jheniffero:123@cluster0.aoz3pvw.mongodb.net/livros")

const db = mongoose.connection

export default db

