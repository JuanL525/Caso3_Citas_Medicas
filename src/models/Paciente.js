import mongoose from  'mongoose';

const pacienteSchema = mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        trim:true
    },

    apeliido:{
        type:String,
        trim:true
    },

    cedula:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },

    fecha_nacimiento:{
        type:Date,
        trim:true
    },

    genero:{
        type:String,
        required:true,
        trim:true
    },

    ciudad:{
        type:String,
        trim:true
    },

    direccion:{
        type:String,
        trim:true
    },

    telefono:{
        type:String,
        trim:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    }
},
{
    timestamps:true,
});

const Paciente = mongoose.model('Paciente', pacienteSchema);
export default Paciente;