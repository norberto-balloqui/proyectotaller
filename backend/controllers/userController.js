

const passport = require('../config/passport-config');
const User = require('../models/user');
const bcrypt = require('bcrypt');


// Controlador para el registro
function register(req, res) {
    console.log('Llegó a la función register del controlador');
  
    // Modelo de usuario (`User`) para interactuar con la base de datos
    // Crear usuario
    const newUser = new User({
        usuario: req.body.usuario,
        password: req.body.password
    });
  
    // Antes de guardar, cifra la contraseña
    bcrypt.genSalt(10, (saltError, salt) => {
        if (saltError) {
            console.error('Error al generar salt:', saltError);
            return res.status(500).send('Error al registrar el usuario');
        }

        bcrypt.hash(newUser.password, salt, (hashError, hash) => {
            if (hashError) {
                console.error('Error al cifrar la contraseña:', hashError);
                return res.status(500).send('Error al registrar el usuario');
            }

            newUser.password = hash;

            newUser.save()
                .then(() => {
                    res.send('Registro exitoso');
                })
                .catch((saveError) => {
                    console.error('Error al guardar el usuario:', saveError);
                    res.status(500).send('Error al registrar el usuario');
                });
        });
    });
}

function VerUser(req, res) {
    // Aquí puedes personalizar la lógica para obtener la lista de usuarios
    User.find()
      .then((usuarios) => {
        const veruser = usuarios.map((usuario) => ({
          id: usuario._id,
          usuario: usuario.usuario,
          
        }));
        res.json(veruser);
      })
      .catch((error) => {
        res.status(500).send('Error al obtener la lista de usuarios');
      });
  }



  function ModiUser(req, res) {
    const userId = req.params.id; // Obtén el ID del parámetro de la URL
    console.log('ID del usuario:', userId);
    console.log('Datos a actualizar:', req.body);
  
    if (userId) {
      // Verifica si se proporciona una nueva contraseña
      if (req.body.password) {
        // Si hay una nueva contraseña, cifra la nueva contraseña
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
              console.error('Error al cifrar la nueva contraseña:', err);
              return res.status(500).send('Error al actualizar la información del usuario');
            }
            
            // Actualiza la contraseña en el objeto req.body con la nueva contraseña cifrada
            req.body.password = hash;
  
            // Actualiza el usuario en la base de datos
            updateUser(userId, req.body, res);
          });
        });
      } else {
        // Si no hay nueva contraseña, actualiza directamente el usuario en la base de datos
        updateUser(userId, req.body, res);
      }
    } else {
      console.error('No se proporcionó un ID de usuario válido');
      res.status(401).send('No se proporcionó un ID de usuario válido');
    }
  }
  
  function updateUser(userId, data, res) {
    User.findByIdAndUpdate(userId, data, { new: true })
      .then((usuarioActualizado) => {
        if (!usuarioActualizado) {
          console.log('Usuario no encontrado');
          return res.status(404).send('Usuario no encontrado');
        }
  
        console.log('Información del usuario actualizada exitosamente');
        res.send('Información del usuario actualizada exitosamente');
      })
      .catch((error) => {
        console.error('Error al actualizar la información del usuario:', error);
        res.status(500).send('Error al actualizar la información del usuario');
      });
  }




// Controlador para el inicio de sesión
function login(req, res, next) {
  console.log('Contraseña ingresada en el controlador:', req.body.password);

  passport.authenticate('local', (err, user, info) => {
    console.log('Estrategia de Passport ejecutada');

    if (err) {
      console.error('Error de autenticación:', err);
      return next(err);
    }

    if (!user) {
      console.log('Credenciales incorrectas');
      return res.status(401).send('Credenciales incorrectas');
    }

    // La contraseña ya debería estar cifrada en este punto
    req.logIn(user, (err) => {
      if (err) {
        console.error('Error al iniciar sesión:', err);
        return next(err);
      }

      console.log('Inicio de sesión exitoso');
      return res.send('Inicio de sesión exitoso');
    });
  })(req, res, next);
}
// Controlador para cerrar sesión
function logout(req, res) {
  req.logout();
  res.send('Cierre de sesión exitoso');
}

module.exports = {
  register,
  login,
  logout,
  VerUser,
  ModiUser
};
