const Carrito = require('../models/carrito');

const CrearCarrito = (req, res) => {
    const { pedido, producto } = req.body;
    const newCarrito = new Carrito({
        pedido,
        producto
        
    });
    newCarrito.save((err, carrito) => {
        if (err) {
            return res.status(400).send({ message: "Error al ingresar Carrito" });
        }
        return res.status(200).send(carrito);
    });
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
    Carrito.findByIdAndDelete(id, (err, carrito) => {
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