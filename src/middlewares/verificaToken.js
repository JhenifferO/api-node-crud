import jwt from 'jsonwebtoken'

export default function verificaToken (req, res, next) {

    const header = req.headers['authorization']
    const token = header && header.split(' ')[1]

    console.log('token', token)

    if(!token) {
        return res.status(401).json({
            msg: 'Token não autorizado'
        })
    } else {
        
        const secret = process.env.SECRET
        
        jwt.verify(token, secret, (err, decoded)=>{
            if(err) {
                res.status(400).json({msg: "Token Inválido"})
            }

            req.useId = decoded.userId
            
            next()
        })
    }
}