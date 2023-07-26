const express = require('express')
const api = express.Router()
const AntecedenteController = require('../controllers/carritoController')


api.post('/Carrito', AntecedenteController.CrearCarrito);
api.get('/Carritos', AntecedenteController.VerCarrito);
api.put('/Carrito/update/:id', AntecedenteController.ModificarCarrito);
api.delete('/Carrito/delete/:id', AntecedenteController.EliminarCarrito);




module.exports = api;