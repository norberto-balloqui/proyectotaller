const Cliente = require('../models/cliente');

const CrearCliente = (req, res) => {
    const { rut, nombre, direccion, telefono, notificacion } = req.body;

    // Agregar guion al Rut si no está presente
    const rutConGuion = rut.includes('-') ? rut : rut.slice(0, -1) + '-' + rut.slice(-1);

    // Convertir el nombre a mayúsculas
    const nombreMayusculas = nombre.toUpperCase();
    const direccionMayusculas = direccion.toUpperCase();

    const newCliente = new Cliente({
        rut: rutConGuion,
        nombre: nombreMayusculas,
        direccion: direccionMayusculas,
        telefono,
        notificacion
    });

    newCliente.save((err, cliente) => {
        if (err) {
            // Verificar si el error es debido a una clave duplicada (Rut)
            if (err.code === 11000 && err.keyValue && err.keyValue.rut) {
                return res.status(400).send({ message: "El Rut ingresado ya existe. Por favor, ingresa un Rut único." });
            }

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

            // Ordenar el array de clientes por el campo 'nombre'
            clientes.sort((a, b) => {
                const nombreA = a.nombre.toUpperCase();
                const nombreB = b.nombre.toUpperCase();

                if (nombreA < nombreB) {
                    return -1;
                }
                if (nombreA > nombreB) {
                    return 1;
                }

                // Los nombres son iguales
                return 0;
            });

            return res.status(200).send(clientes);
        });
};


const VerClientePorId = (req, res) => {
    const { id } = req.params;
    Cliente.findById(id)
      .populate('notificacion', 'whatsapp')
      .exec((err, cliente) => {
        if (err) {
          return res.status(400).send({ message: "Error al obtener Cliente" });
        }
        if (!cliente) {
          return res.status(404).send({ message: "Cliente no encontrado" });
        }
        return res.status(200).send(cliente);
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
    VerClientePorId,
    ModificarCliente,
    EliminarCliente
};