const Pedido = require('../models/pedido');
const { format } = require('date-fns');
const es = require('date-fns/locale/es');


const CrearPedido = (req, res) => {
    const { fecha_registro, fecha_despacho, comentario, precio_total, abono_total, cliente, estado } = req.body;

    // Crear la fecha de registro en formato JavaScript
    const fechaRegistro = new Date();

    // Obtener día, mes y año de la fecha de despacho ingresada
    const [dia, mes, anio] = fecha_despacho.split('-');

    // Crear la fecha de despacho en formato JavaScript
    const fechaDespacho = new Date(anio, mes - 1, dia);

    const newPedido = new Pedido({
        fecha_registro: fechaRegistro,
        fecha_despacho: fechaDespacho,
        comentario,
        precio_total,
        abono_total,
        cliente,
        estado: estado || null,
    });

    newPedido.save((err, pedido) => {
        if (err) {
            return res.status(400).send({ message: "Error al ingresar Pedido", error: err });
        }

        // Verifica si el estado es nulo o vacío y actualiza el pedido para establecer "En espera"
        if (!pedido.estado) {
            Pedido.findByIdAndUpdate(pedido._id, { estado: '64a6bbdddcbbe72b5ca9730f' }, { new: true }, (updateErr, updatedPedido) => {
                if (updateErr) {
                    return res.status(400).send({ message: "Error al actualizar el estado del Pedido", error: updateErr });
                }
                return res.status(200).send(updatedPedido);
            });
        } else {
            return res.status(200).send(pedido);
        }
    });
};


const VerPedido = (req, res) => {
    Pedido.find({})
      .populate({ path: 'estado', select: 'nombre' })
      .populate({ path: 'cliente', select: 'rut nombre' })
      .sort({ fecha_despacho: 1 })
      .exec((err, pedidos) => {
        if (err) {
          return res.status(400).send({ message: "Error al obtener Pedido" });
        }
  
        const pedidosFiltrados = pedidos.filter((pedido) => {
          return pedido.estado.nombre !== "Despachado";
        });
  
        const pedidosFormateados = pedidosFiltrados.map((pedido) => {
          // Asegurarse de que las fechas sean objetos Date
          const fechaRegistro = format(new Date(pedido.fecha_registro), 'dd/MM/yyyy', { locale: es });
          const fechaDespacho = format(new Date(pedido.fecha_despacho), 'dd/MM/yyyy', { locale: es });
          
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
      .sort({ fecha_despacho: 1 })
      .exec((err, pedidos) => {
        if (err) {
          return res.status(400).send({ message: "Error al obtener Pedido" });
        }
  
        const pedidosFiltrados = pedidos.filter((pedido) => {
          return pedido.estado.nombre == "Despachado";
        });
  
        const pedidosFormateados = pedidosFiltrados.map((pedido) => {
          // Asegurarse de que las fechas sean objetos Date
          const fechaRegistro = format(new Date(pedido.fecha_registro), 'dd/MM/yyyy', { locale: es });
          const fechaDespacho = format(new Date(pedido.fecha_despacho), 'dd/MM/yyyy', { locale: es });
          
          return {
            ...pedido.toObject(),
            fecha_registro: fechaRegistro,
            fecha_despacho: fechaDespacho
          };
        });
  
        return res.status(200).send(pedidosFormateados);
      });
  };
  
  const VerPedidoCalendario = (req, res) => {
    Pedido.find({})
      .populate({ path: 'estado', select: 'nombre' })
      .populate({ path: 'cliente', select: 'rut nombre' })
      .sort({ fecha_despacho: 1 })
      .exec((err, pedidos) => {
        if (err) {
          return res.status(400).send({ message: "Error al obtener Pedido" });
        }
  
        return res.status(200).send(pedidos);
      });
  };
  
  module.exports = { VerPedidoCalendario };
  

  const VerPedidoEsp = (req, res) => {
    const { idPedido } = req.params; // Obtén el ID del pedido desde los parámetros de la solicitud

    Pedido.findById(idPedido)
        .populate({ path: 'estado', select: 'nombre' })
        .populate({ path: 'cliente', select: 'rut nombre' })
        .exec((err, pedido) => {
            if (err) {
                return res.status(400).send({ message: "Error al obtener Pedido" });
            }

            // Si no se encuentra un pedido con el ID dado, retorna un mensaje de error
            if (!pedido) {
                return res.status(404).send({ message: "Pedido no encontrado" });
            }

            // Devolver el objeto del pedido sin formatear las fechas
            return res.status(200).send(pedido.toObject());
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
  



  const { parse } = require('date-fns');  // Importa solo parse de date-fns

  const ModificarPedido = (req, res) => {
    const { id } = req.params;
    const { fecha_registro, fecha_despacho, ...restoDatos } = req.body;

    // Formatear las fechas correctamente antes de actualizar el pedido
    const fechaRegistro = parse(fecha_registro, 'dd/MM/yyyy', new Date());
    const fechaDespacho = parse(fecha_despacho, 'dd/MM/yyyy', new Date());

    // Sumar un día a las fechas
    fechaRegistro.setDate(fechaRegistro.getDate() + 1);
    fechaDespacho.setDate(fechaDespacho.getDate() + 1);

    // Actualizar el pedido con las fechas formateadas y los demás datos
    Pedido.findOneAndUpdate(
        { _id: id },
        {
            ...restoDatos,
            fecha_registro: fechaRegistro,
            fecha_despacho: fechaDespacho,
        },
        { new: true },
        (err, pedido) => {
            if (err) {
                return res.status(400).send({ message: "Error al obtener Pedido", error: err });
            }
            if (!pedido) {
                return res.status(404).send({ message: "Error al encontrar Pedido" });
            }
            return res.status(200).send(pedido);
        }
    );
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
    VerPedidoCalendario,
    VerPedidoEsp,
    VerPedRut,
    ModificarPedido,
    EliminarPedido,
    
};