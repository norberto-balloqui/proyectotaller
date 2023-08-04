import axios from "axios";



const CrearNotificacion = async (notificacion) => { 
    const response = await axios.post(`${process.env.SERVIDOR}/Notificacion`, notificacion);
    return response
}
const VerNotificacion = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/Notificaciones`);
    return response
}

const EliminarNotificacion = async (id) => {
    const response = await axios.delete(`${process.env.SERVIDOR}/Notificacion/delete/${id}`);
    return response
}

const ModificarNotificacion = (id, cliente) => {
    const response = axios.put(`${process.env.SERVIDOR}/Notificacion/update/${id}`, notificacion);
    return response
}

module.exports = {
    CrearNotificacion,
    VerNotificacion,
    ModificarNotificacion,
    EliminarNotificacion
}