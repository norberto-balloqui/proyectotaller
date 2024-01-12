const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({ usernameField: 'usuario' }, (usuario, password, done) => {
    console.log('Intento de inicio de sesión con usuario:', usuario); // Agrega este console.log
    User.findOne({ usuario: usuario }, (err, user) => {
      if (err) { 
        console.error('Error al buscar usuario:', err);
        return done(err); 
      }
      if (!user) { 
        console.log('Usuario no encontrado'); // Agrega este console.log
        return done(null, false, { message: 'Usuario no encontrado' }); 
      }
      if (!user.validPassword(password)) { 
        console.log('Contraseña incorrecta'); // Agrega este console.log
        return done(null, false, { message: 'Contraseña incorrecta' }); 
      }
      console.log('Inicio de sesión exitoso'); // Agrega este console.log
      return done(null, user);
    });
  }));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
