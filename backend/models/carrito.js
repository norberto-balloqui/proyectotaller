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
        }
       
    }
);

module.exports = mongoose.model('Carrito', CarritoSchema);