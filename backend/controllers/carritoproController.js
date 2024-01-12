const Carrito = require('../models/carrito');
const Producto = require('../models/producto');

const VerProductosDePedido = (req, res) => {
    const { idPedido } = req.params;

    Carrito.find({ pedido: idPedido }, (err, carritos) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener el carrito" });
        }

        if (carritos.length === 0) {
            return res.status(200).send([]);
        }

        const idsProductos = carritos.map((carrito) => carrito.producto);

        Producto.find({ _id: { $in: idsProductos } })
            .populate('talla') // Agregar populate para obtener información de la talla
            .populate('institucion') // Agregar populate para obtener información de la institución
            .exec((err, productos) => {
                if (err) {
                    return res.status(400).send({ message: "Error al obtener los productos" });
                }

                // Mapea los resultados para incluir la cantidad y detalles
                const productosConDetalles = productos.map((producto) => {
                    const carrito = carritos.find((c) => c.producto.toString() === producto._id.toString());
                    return {
                        _id: producto._id,
                        nombre: producto.nombre,
                        cantidad: carrito ? carrito.cantidad : 0,
                        talla: producto.talla ? producto.talla.nombre : 'N/A', // Verifica si hay talla
                        institucion: producto.institucion ? producto.institucion.nombre : 'N/A', // Verifica si hay institución
                    };
                });

                return res.status(200).send(productosConDetalles);
            });
    });
};

module.exports = {
    VerProductosDePedido,
};
