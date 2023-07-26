const Institucion = require('../models/institucion');

const CrearInstitucion = (req, res) => {
    const { nombre } = req.body;
    const newInstitucion = new Institucion({
        nombre
    
    });
    newInstitucion.save((err, institucion) => {
        if (err) {
            return res.status(400).send({ message: "Error al ingresar Institucion" });
        }
        return res.status(200).send(institucion);
    });
};

const VerInstitucion = (req, res) => {
    Institucion.find({}, (err, instituciones) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener Instituciones" });
        }
        return res.status(200).send(instituciones);
    });
};

const ModificarInstitucion = (req, res) => {
    const { id } = req.params;
    Institucion.findByIdAndUpdate(id, req.body, (err, institucion) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener Institucion" });
        }
        if (!institucion) {
            return res.status(404).send({ message: "Error al encontrar Institucion" });
        }
        return res.status(200).send(institucion);
    });
};

const EliminarInstitucion = (req, res) => {
    const { id } = req.params;
    Institucion.findByIdAndDelete(id, (err, institucion) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener Institucion" });
        }
        if (!institucion) {
            return res.status(404).send({ message: "Error al encontrar Institucion" });
        }
        return res.status(200).send(institucion);
    });
};

module.exports = {
    CrearInstitucion,
    VerInstitucion,
    ModificarInstitucion,
    EliminarInstitucion
};