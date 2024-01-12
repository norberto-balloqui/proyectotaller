import axios from "axios"

const loginUser = (usuario) => {
    const response = axios.post(`${process.env.SERVIDOR}/User/login`, {usuario})
    return response
}


module.exports = {
    loginUser
}