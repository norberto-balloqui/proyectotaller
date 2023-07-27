import axios from "axios";

const CrearProducto = async (producto) => { 
    const response = await axios.post(`${process.env.SERVIDOR}/Producto`, producto);
    return response;
};

const VerProducto = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/Productos`);
    return response;
};

const EliminarProducto = async (id) => {
    const response = await axios.delete(`${process.env.SERVIDOR}/Producto/delete/${id}`);
    return response;
};

const ModificarProducto = (id, producto) => {
    const response = axios.put(`${process.env.SERVIDOR}/Producto/update/${id}`, producto);
    return response;
};

module.exports = {
    CrearProducto,
    VerProducto,
    ModificarProducto,
    EliminarProducto
};
