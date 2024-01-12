
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Necesitarás instalar 'bcrypt'

const userSchema = new mongoose.Schema({
  usuario: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Método para comparar contraseñas
userSchema.methods.validPassword = function(password) {
    const isPasswordValid = bcrypt.compareSync(password, this.password);
    console.log('Contraseña válida:', isPasswordValid);
    return isPasswordValid;
  };

const User = mongoose.model('User', userSchema);

module.exports = User;
