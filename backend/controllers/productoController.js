const Producto = require('../models/producto');

const CrearProducto = (req, res) => {
    const { nombre, talla, institucion} = req.body;
    const newProducto = new Producto({
        nombre,
        talla,
        institucion
    });
    newProducto.save((err, producto) => {
        if (err) {
            return res.status(400).send({ message: "Error al ingresar Producto" });
        }
        return res.status(200).send(producto);
    });
};

const VerProducto = (req, res) => {
    Producto.find({})
        .populate('institucion', 'nombre' ) 
        .populate('talla', 'nombre' ) // Populate muestra el nombre de otra entidad
        .exec((err, productos) => {
            if (err) {
                return res.status(400).send({ message: "Error al obtener Productos" });
            }
            return res.status(200).send(productos);
        });
};



const ModificarProducto = (req, res) => {
    const { id } = req.params;
    Producto.findByIdAndUpdate(id, req.body, (err, producto) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener Producto" });
        }
        if (!producto) {
            return res.status(404).send({ message: "Error al encontrar Producto" });
        }
        return res.status(200).send(producto);
    });
};

const EliminarProducto = (req, res) => {
    const { id } = req.params;
    Producto.findByIdAndDelete(id, (err, producto) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener Producto" });
        }
        if (!producto) {
            return res.status(404).send({ message: "Error al encontrar Producto" });
        }
        return res.status(200).send(producto);
    });
};

module.exports = {
    CrearProducto,
    VerProducto,
    ModificarProducto,
    EliminarProducto
};