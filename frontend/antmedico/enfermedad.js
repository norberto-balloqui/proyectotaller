import axios from "axios";



const CrearEnfermedad = async (enfermedad) => { 
    const response = await axios.post(`${process.env.SERVIDOR}/enfermedad`, enfermedad);
    return response
}
const VerEnfermedad = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/enfermedades`);
    return response
}

const EliminarEnfermedad = async (id) => {
    const response = await axios.delete(`${process.env.SERVIDOR}/enfermedad/delete/${id}`);
    return response
}

const ModificarEnfermedad = (id, enfermedad) => {
    const response = axios.put(`${process.env.SERVIDOR}/enfermedad/update/${id}`, enfermedad);
    return response
}

module.exports = {
    CrearEnfermedad,
    VerEnfermedad,
    EliminarEnfermedad,
    ModificarEnfermedad
}