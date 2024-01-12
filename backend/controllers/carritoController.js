const Carrito = require('../models/carrito');

const CrearCarrito = async (req, res) => {
    const { pedido, producto, cantidad } = req.body;

    try {
        // Buscar si ya existe un Carrito con el mismo pedido y producto
        const existingCarrito = await Carrito.findOne({ pedido, producto });

        if (existingCarrito) {
            // Si existe, suma la cantidad al carrito existente
            existingCarrito.cantidad += cantidad || 1; // Si cantidad es null o no está definida, establece en 1 por defecto
            const updatedCarrito = await existingCarrito.save();
            return res.status(200).send(updatedCarrito);
        } else {
            // Si no existe, crea un nuevo Carrito
            const newCarrito = new Carrito({
                pedido,
                producto,
                cantidad: cantidad || 1 // Si cantidad es null o no está definida, establece en 1 por defecto
            });

            const savedCarrito = await newCarrito.save();
            return res.status(200).send(savedCarrito);
        }
    } catch (err) {
        return res.status(400).send({ message: "Error al ingresar Carrito" });
    }
};
const VerCarrito = (req, res) => {
    Carrito.find({})
        .populate('pedido', 'fecha_registro' )
        .populate('producto', 'nombre' ) 
        .exec((err, carritos) => {
            if (err) {
                return res.status(400).send({ message: "Error al obtener Carritos" });
            }
            return res.status(200).send(carritos);
        });
};

const ModificarCarrito = (req, res) => {
    const { id } = req.params;
    Carrito.findByIdAndUpdate(id, req.body, (err, carrito) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener Carrito" });
        }
        if (!carrito) {
            return res.status(404).send({ message: "Error al encontrar Carrito" });
        }
        return res.status(200).send(carrito);
    });
};

const EliminarCarrito = (req, res) => {
    const { id } = req.params;

    // Buscar el carrito que contiene la relación con el producto
    Carrito.findOneAndDelete({ producto: id }, (err, carrito) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener Carrito" });
        }
        if (!carrito) {
            return res.status(404).send({ message: "Error al encontrar Carrito" });
        }
        return res.status(200).send(carrito);
    });
};

module.exports = {
    CrearCarrito,
    VerCarrito,
    ModificarCarrito,
    EliminarCarrito
};
