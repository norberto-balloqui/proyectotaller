import axios from "axios";

const getMatriculas = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/matriculas`);
    return response
}

const addMatricula = (matricula) => {
    const response = axios.post(`${process.env.SERVIDOR}/matricula`, matricula);
    return response
}

const findMatricula = async (id) => {
    const response = axios.get(`${process.env.SERVIDOR}/matricula/search/${id.matricula}`);
    return response
}

const delMatricula = async (matricula) => {
    const response = axios.delete(`${process.env.SERVIDOR}/matricula/delete/${matricula}`);
    return response
}

const updateMatricula = async (id, matricula) => {
    const response = axios.put(`${process.env.SERVIDOR}/matricula/edit/${id}`, matricula);
    return response
}




module.exports = {
    getMatriculas,
    addMatricula,
    findMatricula,
    delMatricula,
    updateMatricula
}