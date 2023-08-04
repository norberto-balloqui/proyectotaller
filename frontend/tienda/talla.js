import axios from "axios";

const CrearTalla = async (talla) => { 
    const response = await axios.post(`${process.env.SERVIDOR}/Talla`, talla);
    return response;
};

const VerTalla = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/Tallas`);
    return response;
};

const EliminarTalla = async (id) => {
    const response = await axios.delete(`${process.env.SERVIDOR}/Talla/delete/${id}`);
    return response;
};

const ModificarTalla = (id, talla) => {
    const response = axios.put(`${process.env.SERVIDOR}/Talla/update/${id}`, talla);
    return response;
};

module.exports = {
    CrearTalla,
    VerTalla,
    ModificarTalla,
    EliminarTalla
};
