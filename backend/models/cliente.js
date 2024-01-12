const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClienteSchema = new Schema(
    {
        rut: {
            type: String,
            required: true,
            unique: true,
            match: /^[0-9]{6,9}[-|‐]{1}[0-9kK]{1}$/
        },
        nombre: {
            type: String,
            required: true,
            maxlength: 30,
            match: /^([\p{L} ]+)+$/u
        },
        direccion: {
            type: String,
            required: false,
            maxlength: 30,
            match: /^[A-Za-z0-9áéíóúñÑ\s#]+$/
        },
        telefono: {
            type: Number,
            required: false,
            match: /^[0-9]{1,12}$/       
        },

        notificacion:{
            type:Schema.ObjectId,
            ref: 'Notificacion',
            required: true
        },

    },
    
);

module.exports = mongoose.model('Cliente', ClienteSchema);
