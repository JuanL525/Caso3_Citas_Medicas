import Paciente from '../models/Paciente.js';

const agregarPaciente = async(req,res) =>{
    const { cedula } = req.body;

    const existePaciente = await Paciente.findOne({cedula});
    if(existePaciente){
        const error = new Error('Paciente ya registrado');
        return res.status(400).json({msg:error.message});
    }

    try{
        const paciente = new Paciente(req.body);
        await paciente.save();
        res.json({msg: 'Paciente registrado correctamente', ...paciente._doc});
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al registrar paciente'});
    }
};

const obtenerPacientes = async(req,res)=>{
    try{
        const pacientes= await Paciente.find();
        res.json(pacientes);
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Hubo un error al obtneer los pacientes'});
    }
}

const obtenerPaciente = async(req,res) =>{
    const {id}= req.params;
    try{
        const paciente= await Paciente.findById(id);
        if(!paciente){
            return res.status(404).json({msg:'Paciente no encontrado'})
        }
        res.json(paciente);
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'ID no válido o no encontrado'});
    }
}

const actualizarPaciente = async(req,res)=>{
    const {id}=req.params;
    const paciente= await Paciente.findById(id);

    if(!paciente){
        return res.status(404).json({msg:'Paciente no encontrado'});
    }

    if(req.body.cedula && req.body.cedula !== paciente.cedula){
        const existecedula = await Paciente.findOne({cedula: req.body.cedula});
        if(existecedula){
            return res.status(400).json({msg: 'Esa cedula ya está en uso por otro paciente'});
        }
    }

    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.apellido = req.body.apellido || paciente.apellido;
    paciente.cedula = req.body.cedula || paciente.cedula;
    paciente.fecha_nacimiento = req.body.fecha_nacimiento || paciente.fecha_nacimiento;
    paciente.genero = req.body.genero || paciente.genero;
    paciente.ciudad = req.body.ciudad || paciente.ciudad;
    paciente.direccion = req.body.direccion || paciente.direccion;
    paciente.telefono = req.body.telefono || paciente.telefono;
    paciente.email = req.body.email || paciente.email;

    try{
        const pacienteAlmacenado = await paciente.save();
        res.json(pacienteAlmacenado)
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al actualizar al paciente'});
    }
};

const eliminarPaciente = async(req,res)=>{
    const{id} =req.params;

    try{
        const paciente = await Paciente.findById(id);
        if(!paciente){
            return res.status(404).json({msg:'El paciente no se ha encontrado'});
        }
        await paciente.deleteOne();
        res.json({msg:'Paciente eliminado correctamente'});
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al eliminar al paciente'});
    }
}

export{
    agregarPaciente,
    obtenerPaciente,
    obtenerPacientes,
    actualizarPaciente,
    eliminarPaciente
}