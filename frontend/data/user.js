import axios from "axios"

const loginEducadora = (rut) => {
    const response = axios.post(`${process.env.SERVIDOR}/educadora/login`, {rut})
    return response
}

const loginAsistente = (rut) => {
    console.log(rut)
    const response = axios.post(`${process.env.SERVIDOR}/asistente/login`, {rut})
    return response
}

const loginApoderado = (rut) => {
    const response = axios.post(`${process.env.SERVIDOR}/apoderado/login`, {rut})
    return response
}

module.exports = {
    loginApoderado,
    loginAsistente,
    loginEducadora
}