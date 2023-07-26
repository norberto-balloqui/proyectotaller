const Cliente = require('../models/cliente');

const CrearCliente = (req, res) => {
    const { rut,nombre,direccion,telefono,notificacion } = req.body;
    const newCliente = new Cliente(
    {
        rut,
        nombre,
        direccion,
        telefono,
        notificacion
        
    });
    newCliente.save((err, cliente) => {
        if (err) {
            return res.status(400).send({ message: "Error al ingresar Cliente" });
        }
        return res.status(200).send(cliente);
    });
};

const VerCliente = (req, res) => {
    Cliente.find({})
        .populate('notificacion', 'whatsapp') 
        .exec((err, clientes) => {
            if (err) {
                return res.status(400).send({ message: "Error al obtener Clientes" });
            }
            return res.status(200).send(clientes);
        });
};


const ModificarCliente = (req, res) => {
    const { id } = req.params;
    Cliente.findByIdAndUpdate(id, req.body, (err, cliente) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener Cliente" });
        }
        if (!cliente) {
            return res.status(404).send({ message: "Error al encontrar Cliente" });
        }
        return res.status(200).send(cliente);
    });
};

const EliminarCliente = (req, res) => {
    const { id } = req.params;
    Cliente.findByIdAndDelete(id, (err, cliente) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener Cliente" });
        }
        if (!cliente) {
            return res.status(404).send({ message: "Error al encontrar Cliente" });
        }
        return res.status(200).send(cliente);
    });
};

module.exports = {
    CrearCliente,
    VerCliente,
    ModificarCliente,
    EliminarCliente
};