const Producto = require('../models/producto');

const CrearProducto = async (req, res) => {
    const { nombre, talla, institucion } = req.body;

    // Convertir el nombre a mayúsculas
    const nombreMayusculas = nombre.toUpperCase();

    try {
        // Verificar si ya existe un producto con el mismo nombre, talla e institución
        const productoExistente = await Producto.findOne({
            nombre: nombreMayusculas,
            talla,
            institucion
        });

        if (productoExistente) {
            // Si el producto ya existe con la misma talla e institución, devolver una alerta
            return res.status(400).send({ message: "Este producto ya existe con la misma talla e institución." });
        }

        // Si no existe con la misma talla e institución, crear un nuevo producto
        const newProducto = new Producto({
            nombre: nombreMayusculas,
            talla,
            institucion
        });

        // Guardar el nuevo producto en la base de datos
        const productoGuardado = await newProducto.save();

        return res.status(200).send(productoGuardado);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Error al ingresar Producto" });
    }
};

const VerProducto = (req, res) => {
    Producto.find({})
        .populate('institucion', 'nombre' ) 
        .populate('talla', 'nombre' ) // Populate muestra el nombre de otra entidad
        .sort({ nombre: 1 }) // Ordenar por nombre de forma ascendente (1) o descendente (-1)
        .exec((err, productos) => {
            if (err) {
                return res.status(400).send({ message: "Error al obtener Productos" });
            }
            return res.status(200).send(productos);
        });
};


const VerProductoPorId = (req, res) => {
    const { id } = req.params;
    Producto.findById(id)
      .populate('notificacion', 'whatsapp')
      .exec((err, producto) => {
        if (err) {
          return res.status(400).send({ message: "Error al obtener Producto" });
        }
        if (!producto) {
          return res.status(404).send({ message: "Producto no encontrado" });
        }
        return res.status(200).send(producto);
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
    VerProductoPorId,
    ModificarProducto,
    EliminarProducto
};