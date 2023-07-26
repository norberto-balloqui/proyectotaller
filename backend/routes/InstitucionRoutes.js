const express = require('express')
const api = express.Router()
const AntecedenteController = require('../controllers/institucionController')

api.post('/Institucion', AntecedenteController.CrearInstitucion);
api.get('/Instituciones', AntecedenteController.VerInstitucion);
api.put('/Institucion/update/:id', AntecedenteController.ModificarInstitucion);
api.delete('/Institucion/delete/:id', AntecedenteController.EliminarInstitucion);


module.exports = api; 