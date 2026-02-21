import Usuario from '../models/Usuario.js';
import generarJWT from '../helpers/generarJWT.js';

const registrar = async (req,res) =>{
    const {email} = req.body;

    const existeUser = await Usuario.findOne({email});
    if(existeUser){
        const error = new Error ('Usuario ya registrado');
        return res.status(400).json({msg:error.message});
    }
    try{
        const usuario = new Usuario(req.body);
        await usuario.save();
        res.json({msg: 'Usuario creado correctamente', ...usuario._doc});

    }catch (error){
        console.log(error);
        res.status(500).json({msg: 'Error al registrar al usuario'});
    }
};

const autenticar = async (req,res) =>{
    const {email, password} = req.body;
    const usuario = await Usuario.findOne({email});

    if(!usuario){
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg:error.message});
    }

    if(await usuario.comprobarPassword(password)){
        return res.json({
            _id:usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email:usuario.email,
            token: generarJWT(usuario.id)
        })
    }
    const error= new Error('Password incorrecto');
    return res.status(403).json({msg:error.message});
}

export{
    registrar,
    autenticar
}