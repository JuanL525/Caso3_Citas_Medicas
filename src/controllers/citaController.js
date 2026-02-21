import Cita from '../models/Cita.js';

const agregarCita = async(req,res) =>{
    const {codigo} = req.body;
    
    const existeCodigo = await Cita.findOne({codigo});
    if(existeCodigo){
        const error =  new Error('Cita ya existente');
        return res.status(400).json({msg:error.message});
    }
    try{
        const cita= new Cita(req.body);
        await cita.save();
        res.json({msg: 'Cita registrada exitosamente', ...cita._doc});
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al agendar cita'});
    }
};

const obtenerCitas = async(req,res)=>{
    try{
        const citas=await Cita.find()
            .populate('id_paciente','nombre apellido cedula email')
            .populate('id_especialidad', 'codigo nombre descripcion');
        res.json(citas);
    } catch(error){
        console.log(error);
        res.status(500).json({msg: 'Hubo un error al obtener las citas'})
    }
};

const obtenerCita = async(req,res)=>{
    const {id} = req.params;
    try{
        const cita = await Cita.findById(id)
            .populate('id_paciente','nombre apellido cedula email')
            .populate('id_especialidad', 'codigo nombre descripcion');

        if(!cita){
            return res.status(404).json({msg:'Cita no encontrada'});
        }
        res.json(cita);
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'ID no válido o no encontrado'});
    }
};

const actualizarCitas = async(req,res)=>{
    const{id}=req.params;
    const cita = await Cita.findById(id);

    if(!cita){
        return res.status(404).json({msg:'La cita a actualizar no existe'});
    }

    if(req.body.codigo && req.body.codigo !== cita.codigo){
        const existeCodigo=await Cita.findOne({codigo: req.body.codigo});
        if(existeCodigo){
            return res.status(400).json({msg:'Ese codigo ya esta en uso'});
        }
    }

    cita.codigo = req.body.codigo || cita.codigo;
    cita.descripcion = req.body.descripcion || cita.descripcion;
    cita.id_paciente = req.body.id_paciente || cita.id_paciente;
    cita.id_especialidad = req.body.id_especialidad || cita.id_especialidad;

    try{
        const citaActualizada = await cita.save();
        res.json(citaActualizada);
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al actualizar la cita'});
    }
};

const eliminarCita = async(req,res) =>{
    const {id}= req.params;
    try{
        const cita = await Cita.findById(id);
        if(!cita){
            return res.status(404).json({msg:'Cita no encontrada'});
        }
        await cita.deleteOne();
        res.json({msg:'Cita eliminada correctamente'});
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al eliminar la cita'})
    }
}

export{
    agregarCita,
    obtenerCita,
    obtenerCitas,
    actualizarCitas,
    eliminarCita,
}