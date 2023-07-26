import axios from "axios";

const BuscarGrados = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/Grados`);
    return response
}

module.exports ={
    BuscarGrados
}