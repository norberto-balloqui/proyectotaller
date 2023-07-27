import axios from "axios";

const CrearInstitucion = async (institucion) => { 
    const response = await axios.post(`${process.env.SERVIDOR}/Institucion`, institucion);
    return response;
};

const VerInstitucion = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/Instituciones`);
    return response;
};

const EliminarInstitucion = async (id) => {
    const response = await axios.delete(`${process.env.SERVIDOR}/Institucion/delete/${id}`);
    return response;
};

const ModificarInstitucion = (id, institucion) => {
    const response = axios.put(`${process.env.SERVIDOR}/Institucion/update/${id}`, institucion);
    return response;
};

module.exports = {
    CrearInstitucion,
    VerInstitucion,
    ModificarInstitucion,
    EliminarInstitucion
};
