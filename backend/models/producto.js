const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductoSchema = new Schema(
    {
        
        nombre:{
            type: String,
            required: true,
            maxlength: 30,
            match: /^[A-Za-z0-9áéíóúñÑ\s#]+$/
        },
        talla:{
            type:Schema.ObjectId,
            ref: 'Talla',
            required: true
        },
        institucion:{
            type:Schema.ObjectId,
            ref: 'Institucion',
            required: true
        }
    }
);

module.exports = mongoose.model('Producto', ProductoSchema);