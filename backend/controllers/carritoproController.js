const Carrito = require('../models/carrito');
const Producto = require('../models/producto');

const VerProductosDePedido = (req, res) => {
  const { idPedido } = req.params; // obtener id

  // buscar los productos de los pedidos
  Carrito.find({ pedido: idPedido }, (err, carritos) => {
    if (err) {
      return res.status(400).send({ message: "Error al obtener el carrito" });
    }

    // Si no hay registro arroja vacio
    if (carritos.length === 0) {
      return res.status(200).send([]);
    }

    // aqui se obtienen las id de los productos
    const idsProductos = carritos.map((carrito) => carrito.producto);

    // con esta Id buscar los detalles
    Producto.find({ _id: { $in: idsProductos } }, (err, productos) => {
      if (err) {
        return res.status(400).send({ message: "Error al obtener los productos" });
      }

      // Retorna la lista
      return res.status(200).send(productos);
    });
  });
};

module.exports = {
  VerProductosDePedido,
};
