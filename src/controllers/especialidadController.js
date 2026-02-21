import Especialidad from "../models/Especialidad.js";

const agregarEspecialidad = async(req,res)=>{
    const {codigo} = req.body;

    const existeEspecialidad = await Especialidad.findOne({codigo});
    if(existeEspecialidad){
        const error = new Error('La especialidad ya se ha registrado');
        return res.status(400).json({msg: error.message});
    }

    try{
        const especialidad = new Especialidad(req.body);
        await especialidad.save();
        res.json({msg: 'Especialidad registrada correctamente'});
    } catch(error){
        console.log(error);
        res.status(500).json({msg: 'Error al registrar la especialidad'});
    }
};

const obtenerEspecialidades = async(req,res) =>{
    try{
        const especialidades = await Especialidad.find();
        res.json(especialidades);
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al buscar las especialidades'});
    }
};

const obtenerEspecialidad = async(req,res) =>{
    const {id}= req.params;
    try{
        const especialidad = await Especialidad.findById(id);
        if(!especialidad){
            return res.status(404).json({msg:'La especialidad no existe'});
        }
        res.json(especialidad);
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'ID no válido'});
    }
}

const actualizarEspecialidad = async(req,res)=> {
    const{id}=req.params;
    const especialidad = await Especialidad.findById(id);

    if(!especialidad){
        return res.status(404).json({msg:'Especialidad no encontrada'});
    }

    if(req.body.codigo && req.body.codigo !== especialidad.codigo){
        const existeCodigo=await Especialidad.findOne({codigo: req.body.codigo});
        if(existeCodigo){
            return res.status(400).json({msg:'Ese codigo está utilizado por otra especialidad'});
        }
    }
    
    especialidad.codigo = req.body.codigo || especialidad.codigo;
    especialidad.nombre = req.body.nombre || especialidad.nombre;
    especialidad.descripcion = req.body.descripcion || especialidad.descripcion;

    try{
        const especialidadAlmacenada = await especialidad.save();
        res.json(especialidadAlmacenada);
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al actualizar la especialidad'});
    }
};

const eliminarEspecialidad = async(req,res)=>{
    const{id}=req.params;
    try{
        const especialidad=await Especialidad.findById(id);
        if(!especialidad){
            return res.status(404).json({msg:'Especialidad no encontrada'});
        }
        await especialidad.deleteOne();
        res.json({msg:'Especialidad eliminada con exito'})
    } catch(error){
        console.log(error);
        res.status(500).json({msg: 'Error al eliminar la especialidad'});
    }
}

export{
    agregarEspecialidad,
    obtenerEspecialidad,
    obtenerEspecialidades,
    actualizarEspecialidad,
    eliminarEspecialidad
}

