const express = require('express')
const api = express.Router()
const AntecedenteController = require('../controllers/clienteController')

api.post('/Cliente', AntecedenteController.CrearCliente);
api.get('/Clientes', AntecedenteController.VerCliente);
api.get('/Cliente/find/:id', AntecedenteController.VerClientePorId);
api.put('/Cliente/update/:id', AntecedenteController.ModificarCliente);
api.delete('/Cliente/delete/:id', AntecedenteController.EliminarCliente);


module.exports = api;