const express = require('express');
const api = express.Router();
const NotificacionController = require('../controllers/notificacionController');

api.post('/Notificacion', NotificacionController.CrearNotificacion);
api.get('/Notificaciones', NotificacionController.VerNotificacion);
api.put('/Notificacion/update/:id', NotificacionController.ModificarNotificacion);
api.delete('/Notificacion/delete/:id', NotificacionController.EliminarNotificacion);

module.exports = api;
