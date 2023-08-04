import axios from "axios";



const CrearCliente = async (cliente) => { 
    const response = await axios.post(`${process.env.SERVIDOR}/Cliente`, cliente);
    return response
}
const VerCliente = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/Clientes`);
    return response
}

const EliminarCliente = async (id) => {
    const response = await axios.delete(`${process.env.SERVIDOR}/Cliente/delete/${id}`);
    return response
}

const ModificarCliente = (id, cliente) => {
    const response = axios.put(`${process.env.SERVIDOR}/Cliente/update/${id}`, cliente);
    return response
}

module.exports = {
    CrearCliente,
    VerCliente,
    ModificarCliente,
    EliminarCliente
}