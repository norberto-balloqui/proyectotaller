import axios from "axios";



const CrearCliente = async (cliente) => { 
    const response = await axios.post(`${process.env.SERVIDOR}/Cliente`, cliente);
    return response
}
const VerCliente = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/Clientes`);
    return response
}

const VerClientePorId = async (id) => {
    try {
      const response = await axios.get(`${process.env.SERVIDOR}/Cliente/find/${id}`);
      console.log('Datos recibidos:', response.data); // Agregamos el console.log para verificar los datos recibidos
      return response;
    } catch (error) {
      console.error('Error al obtener el cliente por ID:', error);
      throw error;
    }
  };
  



const EliminarCliente = async (id) => {
    const response = await axios.delete(`${process.env.SERVIDOR}/Cliente/delete/${id}`);
    return response
}

const ModificarCliente = (id, cliente) => {
    const response = axios.put(`${process.env.SERVIDOR}/Cliente/update/${id}`, cliente);
    return response
}

module.exports = {
    CrearCliente,
    VerCliente,
    VerClientePorId,
    ModificarCliente,
    EliminarCliente
}