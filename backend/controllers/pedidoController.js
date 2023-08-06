const Pedido = require('../models/pedido');


const CrearPedido = (req, res) => {
    const { fecha_registro, fecha_despacho, comentario, precio_total, abono_total, cliente, estado } = req.body;

    // Obtener día, mes y año de la fecha de despacho ingresada
    const [dia, mes, anio] = fecha_despacho.split('-');

    // Crear la fecha de despacho en formato JavaScript (mes - 1 porque los meses en JavaScript son indexados desde 0)
    const fechaDespacho = new Date(anio, mes - 1, dia);

    const newPedido = new Pedido({
        fecha_registro: new Date(),
        fecha_despacho: fechaDespacho,
        comentario,
        precio_total,
        abono_total,
        cliente,
        estado
    });

    newPedido.save((err, pedido) => {
        if (err) {
            return res.status(400).send({ message: "Error al ingresar Pedido" });
        }
        return res.status(200).send(pedido);
    });
};

const VerPedido = (req, res) => {
    Pedido.find({})
        .populate({ path: 'estado', select: 'nombre' })
        .populate({ path: 'cliente', select: 'rut nombre' }) // Aquí especificamos los campos que queremos mostrar: 'rut' y 'nombre'
        .sort({ fecha_despacho: 1 }) // Ordenar por fecha_despacho de menor a mayor
        .exec((err, pedidos) => {
            if (err) {
                return res.status(400).send({ message: "Error al obtener Pedido" });
            }

            // Filtrar los pedidos que tienen el estado "Despachado"
            const pedidosFiltrados = pedidos.filter((pedido) => {
                return pedido.estado.nombre !== "Despachado";
            });

            // Formatear las fechas de fecha_registro y fecha_despacho al formato latinoamericano
            const pedidosFormateados = pedidosFiltrados.map((pedido) => {
                const fechaRegistro = pedido.fecha_registro.toLocaleDateString('es-AR');
                const fechaDespacho = pedido.fecha_despacho.toLocaleDateString('es-AR');
                return {
                    ...pedido.toObject(),
                    fecha_registro: fechaRegistro,
                    fecha_despacho: fechaDespacho
                };
            });

            return res.status(200).send(pedidosFormateados);
        });
};


const VerDesp = (req, res) => {
    Pedido.find({})
        .populate({ path: 'estado', select: 'nombre' })
        .populate({ path: 'cliente', select: 'rut nombre' })
        .sort({ fecha_despacho: 1 }) // Ordenar por fecha_despacho de menor a mayor
        .exec((err, pedidos) => {
            if (err) {
                return res.status(400).send({ message: "Error al obtener Pedido" });
            }

            // Filtrar los pedidos que tienen el estado "Despachado"
            const pedidosFiltrados = pedidos.filter((pedido) => {
                return pedido.estado.nombre === "Despachado";
            });

            // Formatear las fechas de fecha_registro y fecha_despacho al formato latinoamericano
            const pedidosFormateados = pedidosFiltrados.map((pedido) => {
                const fechaRegistro = pedido.fecha_registro.toLocaleDateString('es-AR');
                const fechaDespacho = pedido.fecha_despacho.toLocaleDateString('es-AR');
                return {
                    ...pedido.toObject(),
                    fecha_registro: fechaRegistro,
                    fecha_despacho: fechaDespacho
                };
            });

            return res.status(200).send(pedidosFormateados);
        });
};


const VerPedidoEsp = (req, res) => {
    const { idPedido } = req.params; // Obtén el ID del pedido desde los parámetros de la solicitud

    Pedido.findById(idPedido)
        .populate({ path: 'estado', select: 'nombre' })
        .populate({ path: 'cliente', select: 'rut' })
        .exec((err, pedido) => {
            if (err) {
                return res.status(400).send({ message: "Error al obtener Pedido" });
            }

            // Si no se encuentra un pedido con el ID dado, retorna un mensaje de error
            if (!pedido) {
                return res.status(404).send({ message: "Pedido no encontrado" });
            }

            // Formatear las fechas de fecha_registro y fecha_despacho al formato latinoamericano
            const fechaRegistro = pedido.fecha_registro.toLocaleDateString('es-AR');
            const fechaDespacho = pedido.fecha_despacho.toLocaleDateString('es-AR');

            // Crear un objeto con los datos formateados del pedido
            const pedidoFormateado = {
                ...pedido.toObject(),
                fecha_registro: fechaRegistro,
                fecha_despacho: fechaDespacho
            };

            return res.status(200).send(pedidoFormateado);
        });
};

const VerPedRut = (req, res) => {
    const rutEspecifico = req.query.rut; // Obtener el rut desde la solicitud
  
    Pedido.find({ 'cliente.rut': rutEspecifico }) // Filtrar por el rut específico
      .populate({ path: 'estado', select: 'nombre' })
      .populate({ path: 'cliente', select: 'rut nombre' })
      .sort({ fecha_despacho: 1 }) // Ordenar por fecha_despacho de menor a mayor
      .exec((err, pedidos) => {
        if (err) {
          return res.status(400).send({ message: "Error al obtener Pedido" });
        }
  
        // Filtrar los pedidos que tienen el estado "Despachado"
        const pedidosFiltrados = pedidos.filter((pedido) => {
          return pedido.estado.nombre === "Despachado";
        });
  
        // Formatear las fechas de fecha_registro y fecha_despacho al formato latinoamericano
        const pedidosFormateados = pedidosFiltrados.map((pedido) => {
          const fechaRegistro = pedido.fecha_registro.toLocaleDateString('es-AR');
          const fechaDespacho = pedido.fecha_despacho.toLocaleDateString('es-AR');
          return {
            ...pedido.toObject(),
            fecha_registro: fechaRegistro,
            fecha_despacho: fechaDespacho
          };
        });
  
        return res.status(200).send(pedidosFormateados);
      });
  };
  



const ModificarPedido = (req, res) => {
    const { id } = req.params;
    Pedido.findByIdAndUpdate(id, req.body, (err, pedido) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener Pedido" });
        }
        if (!pedido) {
            return res.status(404).send({ message: "Error al encontrar Pedido" });
        }
        return res.status(200).send(pedido);
    });
};

const EliminarPedido = (req, res) => {
    const { id } = req.params;
    Pedido.findByIdAndDelete(id, (err, pedido) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener Pedido" });
        }
        if (!pedido) {
            return res.status(404).send({ message: "Error al encontrar Pedido" });
        }
        return res.status(200).send(pedido);
    });
};

module.exports = {
    CrearPedido,
    VerPedido,
    VerDesp,
    VerPedidoEsp,
    VerPedRut,
    ModificarPedido,
    EliminarPedido,
    
};