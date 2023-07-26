import axios from "axios";

const getParvulos = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/parvulos`);
    return response
}

const addParvulo = (parvulo) => {
    const response = axios.post(`${process.env.SERVIDOR}/parvulo`, parvulo);
    return response
}

const findParvulo = async (id) => {
    const response = axios.get(`${process.env.SERVIDOR}/parvulo/search/${id.parvulo}`);
    return response
}

const delParvulo = async (parvulo) => {
    const response = axios.delete(`${process.env.SERVIDOR}/parvulo/delete/${parvulo}`);
    return response
}

const updateParvulo = async (id, parvulo) => {
    const response = axios.put(`${process.env.SERVIDOR}/parvulo/update/${id}`, parvulo);
    return response
}




module.exports = {
    getParvulos,
    addParvulo,
    findParvulo,
    delParvulo,
    updateParvulo
}