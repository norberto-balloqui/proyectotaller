const Notificacion = require('../models/notificacion');



const CrearNotificacion = (req, res) => {
    const { whatsapp } = req.body;

    const newNotificacion = new Notificacion({   
        whatsapp     
    });

    newNotificacion.save((err, notificacion) => {
        if (err) {
            return res.status(400).send({ message: "Error al ingresar Notificacion" });
        }
        return res.status(200).send(notificacion);
    });
};

const VerNotificacion = (req, res) => {
    Notificacion.find({}, (err, notificaciones) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener Notificaciones" });
        }
        return res.status(200).send(notificaciones);
    });
};

const ModificarNotificacion = (req, res) => {
    const { id } = req.params;
    Notificacion.findByIdAndUpdate(id, req.body, (err, notificacion) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener Notificacion" });
        }
        if (!notificacion) {
            return res.status(404).send({ message: "Error al encontrar Notificacion" });
        }
        return res.status(200).send(notificacion);
    });
};

const EliminarNotificacion = (req, res) => {
    const { id } = req.params;
    Notificacion.findByIdAndDelete(id, (err, notificacion) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener Notificacion" });
        }
        if (!notificacion) {
            return res.status(404).send({ message: "Error al encontrar Notificacion" });
        }
        return res.status(200).send(notificacion);
    });
};

module.exports = {
    CrearNotificacion,
    VerNotificacion,
    ModificarNotificacion,
    EliminarNotificacion
};

