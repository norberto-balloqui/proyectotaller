import axios from "axios";

const CrearCarrito = async (carrito) => { 
    const response = await axios.post(`${process.env.SERVIDOR}/Carrito`, carrito);
    return response;
};

const VerCarrito = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/Carritos`);
    return response;
};

const EliminarCarrito = async (id) => {
    const response = await axios.delete(`${process.env.SERVIDOR}/Carrito/delete/${id}`);
    return response;
};

const ModificarCarrito = (id, carrito) => {
    const response = axios.put(`${process.env.SERVIDOR}/Carrito/update/${id}`, carrito);
    return response;
};

module.exports = {
    CrearCarrito,
    VerCarrito,
    ModificarCarrito,
    EliminarCarrito
};
