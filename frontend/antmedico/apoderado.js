import axios from "axios";



const CrearApoderado = async (apoderado) => {
    const response = await axios.post(`${process.env.SERVIDOR}/apoderado`, apoderado);
    return response
    console.log(apoderado)


}
const VerApoderado = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/apoderados`);
    return response
}

const EliminarApoderado = async (id) => {
    const response = await axios.delete(`${process.env.SERVIDOR}/apoderado/delete/${id}`);
    return response
}


module.exports = {
    CrearApoderado,
    VerApoderado,
    EliminarApoderado
}
