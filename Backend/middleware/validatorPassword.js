const passwordSchema = require('../models/password')

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({message : 'Votre mot de passe doit avoir au moins un chiffre, et une majuscule, avec aucun espace!'})
    } else {

    } next();
}