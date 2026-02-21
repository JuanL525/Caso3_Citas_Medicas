import mongoose from 'mongoose';

const citasSchema = mongoose.Schema({
    codigo:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },

    descripcion:{
        type:String,
        trim:true
    },

    id_paciente:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Paciente',
        required:true
    },

    id_especialidad:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Especialidad',
        required:true
    }
},
{
    timestamps:true
});

const Citas = mongoose.model('Cita', citasSchema);
export default Citas;