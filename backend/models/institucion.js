const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const InstitucionSchema = new Schema(
    {
        nombre:{
            type: String,
            required: true,
            maxlength: 50,
            match: /^[A-Za-z0-9áéíóúñÑ\s]+$/
        }
        
    }
);

module.exports = mongoose.model('Institucion', InstitucionSchema);