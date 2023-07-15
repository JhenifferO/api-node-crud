import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import  usuario from '../models/usuario.js'

class UsuarioController {

    static async newUsuario (req, res) {
       
        const { nome, senha, confirmacaoSenha } = req.body

        if(!nome || !senha){
            return res.status(422).json({
                msg: 'Nome e senha são obrigatórios',
                erro: true
            })
        }

        if(senha != confirmacaoSenha) {
            return res.status(422).json({
                msg: 'Senhas não conferem',
                erro: true
            })
        } 

        const existeUsuario = await usuario.findOne({ nome: nome })

        if(existeUsuario) {
            return res.status(422).json(
                {msg: 'Usuário já existe',
                erro: true
            })
        }

        const salt = await bcrypt.genSalt(12)

        const senhaHash = await bcrypt.hash(senha, salt)
        
        const novoUsuario = new usuario({
            nome, 
            senha: senhaHash
        })

        try {
            await novoUsuario.save()

            res.status(201).json({
                msg: 'Usuário criado com sucesso!',
                erro: false
            })

        } catch (erro) {
            res.status(500).json({ 
                msg: 'Ocorreu um erro no servidor, tente novamente mais tarde!',
                erro: true
            })
        }
      
    }

    static async login(req, res) {

        const { nome, senha } = req.body

        if(!nome || !senha){
            return res.status(422).json({
                msg: 'Nome e senha são obrigatórios',
                erro: true
            })
        }

        const loginUsuario = await usuario.findOne({ nome: nome })

        if(!loginUsuario) {
            return res.status(422).json({
                msg: 'Usuário não encontrado',
                erro: true
            })
        }
   
        const confereSenha = await bcrypt.compare(senha, loginUsuario.senha)

        if(!confereSenha) {
            return res.status(422).json({
                msg: 'Senha inválida',
                erro: true
            })
        }

        try {
            const secret = iuansubfusf26578bdiuasFAF732FUIABFI78EBWUAFENMI8973YUWGEHJEFKGL

            const token = jwt.sign(
                {
                    id: loginUsuario._id
                },
                secret,
                {
                    expiresIn: '1h'
                }
            )

            res.status(200).json({
                msg: 'Usuário autenticado', 
                token, 
                idUsuario: loginUsuario._id
            })

        } catch (erro) {
            next(erro)
        }


    }

    static async setFavoritos (req, res) {
        
        const { idUsuario, idImovel } = req.body
      
        const user = await usuario.findOne({_id: idUsuario})

        let arr = user.salvos
   
        let i = arr.indexOf(idImovel)

        if(i !== -1) {
            arr.splice(i, 1)
        } else {
            arr.push(idImovel)
        }

        const result = await usuario.findByIdAndUpdate(idUsuario, { salvos: arr })

        if(result !== null) {
            res.status(200).send({ 
                msg: 'Concluído',
                erro: false 
            })
        } else {
            next(new NaoEncontrado('Erro'))
        }

    }

    static async getAllFavoritos (req, res) {
        const { id } = req.params

        const result = await usuario.findById({_id: id})

        if(result) {
            res.status(200).json({
                msg: 'Sucesso',
                erro: false,
                data: result.salvos
            })
        } else {
            next(new NaoEncontrado('Id do usuário não localizado'))
        }
    }
}

export default UsuarioController
