import mongoose from "mongoose";

const especialidadSchema = mongoose.Schema({
    codigo:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },

    nombre:{
        type:String,
        required:true,
        trim:true,
    },

    descripcion:{
        type:String,
        trim:true,
    }
},
{
    timestamps:true
});

const Especialidad = mongoose.model('Especialidad', especialidadSchema);
export default Especialidad;