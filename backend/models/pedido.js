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
            
            maxlength: 300,
            match: /^[A-Za-z0-9áéíóúñÑ\s#]+$/,
            required: false
        },

precio_total:{
            type: String,
            match: /^[0-9]{0,9}$/,
            required: false
        },

abono_total:{
            type: String,
            match: /^[0-9]{0,9}$/,
            required: false
        },

 cliente:{
            type:Schema.ObjectId,
            ref: 'Cliente',
            required: true
        },

        estado: {
          type: Schema.ObjectId,
          ref: 'Estado',
         
      }
});

module.exports = mongoose.model('Pedido', PedidoSchema);