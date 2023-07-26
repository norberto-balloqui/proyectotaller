import axios from "axios";

const BuscarRutinas = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/Rutinas`);
    return response
}

const BuscarRutina = async (id) => {
    const response = await axios.get(`${process.env.SERVIDOR}/Rutina/search/${id}`);
    return response
}

const CrearRutina = (rutina) => {
    const response = axios.post(`${process.env.SERVIDOR}/Rutina`, rutina);
    return response
}

const UpdateRutina = (id, rutina) => {
    const response = axios.put(`${process.env.SERVIDOR}/Rutina/update/${id}`, rutina);
    return response
}
const DeleteRutina = async (id) => {
    const response = await axios.delete(`${process.env.SERVIDOR}/Rutina/delete/${id}`);
    return response
}

module.exports ={
    BuscarRutinas,
    BuscarRutina,
    CrearRutina,
    UpdateRutina,
    DeleteRutina
}