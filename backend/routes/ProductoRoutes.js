const express = require('express')
const api = express.Router()
const AntecedenteController = require('../controllers/productoController')

api.post('/Producto', AntecedenteController.CrearProducto);
api.get('/Productos', AntecedenteController.VerProducto);
api.put('/Producto/update/:id', AntecedenteController.ModificarProducto);
api.delete('/Producto/delete/:id', AntecedenteController.EliminarProducto);


module.exports = api;