import mongoose from 'mongoose'

mongoose.connect("mongodb+srv://jheniffero:123@cluster0.aoz3pvw.mongodb.net/livros")
// retryWrites=true&w=majority
// mongodb+srv://jheniffero:<password>@cluster0.aoz3pvw.mongodb.net/?retryWrites=true&w=majority
const db = mongoose.connection

export default db

