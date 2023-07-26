const Talla = require('../models/talla');

const CrearTalla = (req, res) => {
    const { nombre } = req.body;
    const newTalla = new Talla({
        nombre
    });
    newTalla.save((err, talla) => {
        if (err) {
            return res.status(400).send({ message: "Error al ingresar Talla" });
        }
        return res.status(200).send(talla);
    });
};

const VerTalla = (req, res) => {
    Talla.find({}, (err, tallas) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener Tallas" });
        }
        return res.status(200).send(tallas);
    });
};

const ModificarTalla = (req, res) => {
    const { id } = req.params;
    Talla.findByIdAndUpdate(id, req.body, (err, talla) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener Talla" });
        }
        if (!talla) {
            return res.status(404).send({ message: "Error al encontrar Talla" });
        }
        return res.status(200).send(talla);
    });
};

const EliminarTalla = (req, res) => {
    const { id } = req.params;
    Talla.findByIdAndDelete(id, (err, talla) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener Talla" });
        }
        if (!talla) {
            return res.status(404).send({ message: "Error al encontrar Talla" });
        }
        return res.status(200).send(talla);
    });
};

module.exports = {
    CrearTalla,
    VerTalla,
    ModificarTalla,
    EliminarTalla
};