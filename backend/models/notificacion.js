const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NotificacionSchema = new Schema(
    {
    
        whatsapp:{
            type: String,
            required: true,
            maxlength: 10,
            match: /^([\p{L} ]+)+$/u
        }
   
    }
);

module.exports = mongoose.model('Notificacion', NotificacionSchema);