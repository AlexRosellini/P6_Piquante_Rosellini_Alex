/*********************************************************************************/
//On importe ce dont nous avons besoin.

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator') //Unique validator permet de gêrer plus facilement les érreurs

/*********************************************************************************/
//Notre Schéma d'utilisateur

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true }, //'Unique: true' permet de n'avoir un utilisateur par email et pas plus.
    password: { type: String, required: true } //'Required: true' permet de forcer à avoir un password.
})

/*********************************************************************************/
//UniqueValidator vérifie les données et renvoie des érreur comprehensives.

userSchema.plugin(uniqueValidator, { message: 'Error,  {PATH} already in use.' })

/*********************************************************************************/
//On exporte notre module

module.exports = mongoose.model('User', userSchema)

