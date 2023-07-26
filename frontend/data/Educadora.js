import axios from 'axios';

const BuscarEducadoras = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/Educadoras`);
    return response
}

const BuscarEducadora = async (id) => {
    const response = await axios.get(`${process.env.SERVIDOR}/Educadora/search/${id}`);
    return response
}
const CrearEducadora = (educadora) => {
    const response = axios.post(`${process.env.SERVIDOR}/Educadora`, educadora);
    return response
}

const UpdateEducadora = (id, educadora) => {
    const response = axios.put(`${process.env.SERVIDOR}/Educadora/update/${id}`, educadora);
    return response
}

const DeleteEducadora = async (id) => {
    const response = await axios.delete(`${process.env.SERVIDOR}/Educadora/delete/${id}`);
    return response
}

module.exports ={
    BuscarEducadoras,
    BuscarEducadora,
    CrearEducadora,
    UpdateEducadora,
    DeleteEducadora
}