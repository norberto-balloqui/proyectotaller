import axios from "axios";

const VerParvulo = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/parvulo/search`);
    return response
}

module.exports ={
    VerParvulo
}