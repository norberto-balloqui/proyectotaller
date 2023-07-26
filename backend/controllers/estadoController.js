const Estado = require('../models/estado');

const CrearEstado = (req, res) => {
    const { nombre } = req.body;
    
    if (!regex.test(nombre)) {
        return res.status(400).send({ message: "El nombre contiene caracteres no permitidos" });
    }

    const newEstado = new Estado({   
        nombre     
    });

    newEstado.save((err, estado) => {
        if (err) {
            return res.status(400).send({ message: "Error al ingresar Estado" });
        }
        return res.status(200).send(estado);
    });
};


const VerEstado = (req, res) => {
    Estado.find({}, (err, estados) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener Estados" });
        }
        return res.status(200).send(estados);
    });
};

const ModificarEstado = (req, res) => {
    const { id } = req.params;
    Estado.findByIdAndUpdate(id, req.body, (err, estado) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener Estado" });
        }
        if (!estado) {
            return res.status(404).send({ message: "Error al encontrar Estado" });
        }
        return res.status(200).send(estado);
    });
};

const EliminarEstado = (req, res) => {
    const { id } = req.params;
    Estado.findByIdAndDelete(id, (err, estado) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener Estado" });
        }
        if (!estado) {
            return res.status(404).send({ message: "Error al encontrar Estado" });
        }
        return res.status(200).send(estado);
    });
};

module.exports = {
    CrearEstado,
    VerEstado,
    ModificarEstado,
    EliminarEstado
};