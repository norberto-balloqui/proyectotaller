const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CarritoSchema = new Schema(
    {
        pedido:{
            type:Schema.ObjectId,
            ref: 'Pedido',
            required: true
        },
        
        producto:{
            type:Schema.ObjectId,
            ref: 'Producto',
            required: true
        },

        cantidad: {
            type: Number,
            required: false,
            match: /^[0-9]{1,12}$/       
        }


       
    }
);

module.exports = mongoose.model('Carrito', CarritoSchema);