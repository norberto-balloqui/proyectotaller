import axios from "axios";



const CrearAntecedente = async (antecedente) => {
    const response = await axios.post(`${process.env.SERVIDOR}/antecedente`, antecedente);
    return response
}
const VerAntecedente = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/antecedentes`);
    return response
}
const EliminarAntecedente = async (id) => {
    const response = await axios.delete(`${process.env.SERVIDOR}/antecedente/delete/${id}`);
    return response
}


module.exports = {
    CrearAntecedente,
    VerAntecedente,
    EliminarAntecedente
}