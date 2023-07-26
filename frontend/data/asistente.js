import axios from "axios";

const getAsistentes = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/asistentes`);
    return response
}

const addAsistente = (asistente) => {
    const response = axios.post(`${process.env.SERVIDOR}/asistente`, asistente);
    return response
}

const findAsistente = async (id) => {
    const response = axios.get(`${process.env.SERVIDOR}/asistente/find/${id.asistente}`);
    return response
}

const delAsistente = async (asistente) => {
    const response = axios.delete(`${process.env.SERVIDOR}/asistente/delete/${asistente}`);
    return response
}

const updateAsistente = async (id, asistente) => {
    const response = axios.put(`${process.env.SERVIDOR}/asistente/edit/${id}`, asistente);
    return response
}


module.exports = {
    getAsistentes,
    addAsistente,
    findAsistente,
    delAsistente,
    updateAsistente
}