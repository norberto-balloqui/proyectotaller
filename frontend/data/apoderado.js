import axios from "axios";

const getApoderados = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/Apoderados`);
    return response
}










module.exports = {
    getApoderados
}