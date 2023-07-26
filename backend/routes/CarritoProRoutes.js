const express = require('express')
const api = express.Router()
const CarritoController = require('../controllers/carritoproController')



api.get('/Carritopro/:idPedido/productos', CarritoController.VerProductosDePedido);






module.exports = api;

