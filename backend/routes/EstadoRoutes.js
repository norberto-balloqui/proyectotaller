const express = require('express');
const api = express.Router();
const EstadoController = require('../controllers/estadoController');

api.post('/Estado', EstadoController.CrearEstado);
api.get('/Estados', EstadoController.VerEstado);
api.put('/Estado/update/:id', EstadoController.ModificarEstado);
api.delete('/Estado/delete/:id', EstadoController.EliminarEstado);

module.exports = api;
