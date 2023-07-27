import axios from "axios";



const CrearEstado = async (estado) => { 
    const response = await axios.post(`${process.env.SERVIDOR}/Estado`, estado);
    return response
}
const VerEstado = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/Estados`);
    return response
}

const EliminarEstado = async (id) => {
    const response = await axios.delete(`${process.env.SERVIDOR}/Estado/delete/${id}`);
    return response
}

const ModificarEstado = (id, estado) => {
    const response = axios.put(`${process.env.SERVIDOR}/Estado/update/${id}`, estado);
    return response
}

module.exports = {
    CrearEstado,
    VerEstado,
    ModificarEstado,
    EliminarEstado
}