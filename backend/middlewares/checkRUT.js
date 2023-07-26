const user = require('../models/asistente')

const checkRUT = (req, res, _next) => {
    user.findOne({rut: req.body.rut} , (err, user) => {
        if(err) {
            return res.status(400).send({message: "Error al obtener el usuario"})
        }
        if(!user){
            return res.status(404).send({message: "El usuario no existe"})
        }
        return res.status(200).send({message: "Usuario logeado correctamente", user})
    })
}



module.exports = checkRUT