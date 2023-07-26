const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EstadoSchema = new Schema(
    {
    
        nombre:{
            type: String,
            required: true,
            maxlength: 30,
            match: /^([\p{L} ]+)+$/u
        }
   
    }
);

module.exports = mongoose.model('Estado', EstadoSchema);