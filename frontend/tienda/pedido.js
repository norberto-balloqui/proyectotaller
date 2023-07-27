import axios from "axios";

const CrearPedido = async (pedido) => { 
    const response = await axios.post(`${process.env.SERVIDOR}/Pedido`, pedido);
    return response;
};

const VerPedido = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/Pedidos`);
    return response;
};

const VerDesp = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/Despachados`);
    return response;
};

const VerPedidoEsp = async (idPedido) => {
    const response = await axios.get(`${process.env.SERVIDOR}/Pedido/${idPedido}`);
    return response;
};

const EliminarPedido = async (id) => {
    const response = await axios.delete(`${process.env.SERVIDOR}/Pedido/delete/${id}`);
    return response;
};

const ModificarPedido = (id, pedido) => {
    const response = axios.put(`${process.env.SERVIDOR}/Pedido/update/${id}`, pedido);
    return response;
};

module.exports = {
    CrearPedido,
    VerPedido,
    VerDesp,
    VerPedidoEsp,
    ModificarPedido,
    EliminarPedido
};
