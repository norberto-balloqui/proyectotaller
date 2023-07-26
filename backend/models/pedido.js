const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PedidoSchema = new Schema({
  
  fecha_registro: {
    type: Date,
  required: true
  },

  fecha_despacho: {
    type: Date,
    required: true
  },

 comentario:{
            type: String,
            required: true,
            maxlength: 300,
            match: /^[A-Za-z0-9áéíóúñÑ\s#]+$/
        },

precio_total:{
            type: String,
            match: /^[0-9]{1,7}$/
        },

abono_total:{
            type: String,
            match: /^[0-9]{0,7}$/
        },

 cliente:{
            type:Schema.ObjectId,
            ref: 'Cliente',
            required: true
        },

 estado:{
            type:Schema.ObjectId,
            ref: 'Estado',
        }
});

module.exports = mongoose.model('Pedido', PedidoSchema);