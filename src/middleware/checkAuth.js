import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const checkAuth = async(req,res,next) =>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req. headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.usuario = await Usuario.findById(decoded.id).select('-password -confirmar');
            return next();
        } catch(error){
            return res.status(404).json({msg: 'Hubo un error con el token'});
        }
    }
    if(!token){
        const error = new Error('Token no válido o inexistente')
        return res.status(401).json({msg: error.message});
    }
    next();
}

export default checkAuth;
