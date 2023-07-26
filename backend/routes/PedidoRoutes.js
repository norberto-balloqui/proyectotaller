const express = require('express')
const api = express.Router()
const AntecedenteController = require('../controllers/pedidoController')

api.post('/Pedido', AntecedenteController.CrearPedido);
api.get('/Pedidos', AntecedenteController.VerPedido);
api.get('/Despachados', AntecedenteController.VerDesp);
api.get('/Pedido/:idPedido', AntecedenteController.VerPedidoEsp);
api.put('/Pedido/update/:id', AntecedenteController.ModificarPedido);
api.delete('/Pedido/delete/:id', AntecedenteController.EliminarPedido);


module.exports = api;