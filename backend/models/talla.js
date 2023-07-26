const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TallaSchema = new Schema(
    {
        nombre:{
            type: String,
            required: true,
            match: /^[a-zA-Z0-9\s]{1,4}$/
        }
    }
);

module.exports = mongoose.model('Talla', TallaSchema);