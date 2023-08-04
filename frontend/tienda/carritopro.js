import axios from "axios";


const VerProductosDePedido = async (idPedido) => {
    const response = await axios.get(`${process.env.SERVIDOR}/Carritopro/${idPedido}/productos`);
    return response
}





module.exports = {
    VerProductosDePedido
}