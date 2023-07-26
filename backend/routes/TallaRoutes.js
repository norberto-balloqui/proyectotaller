const express = require('express')
const api = express.Router()
const AntecedenteController = require('../controllers/tallaController')

api.post('/Talla', AntecedenteController.CrearTalla);
api.get('/Tallas', AntecedenteController.VerTalla);
api.put('/Talla/update/:id', AntecedenteController.ModificarTalla);
api.delete('/Talla/delete/:id', AntecedenteController.EliminarTalla);


module.exports = api;