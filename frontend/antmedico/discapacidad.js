import axios from "axios";



const CrearDiscapacidad = async (discapacidad) => {
    const response = await axios.post(`${process.env.SERVIDOR}/discapacidad`, discapacidad);
    return response
}
const VerDiscapacidad = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/discapacidades`);
    return response
}



module.exports = {
    CrearDiscapacidad,
    VerDiscapacidad
}