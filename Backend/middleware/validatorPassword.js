/*********************************************************************************/
//On importe ce dont nous avons besoin.

const passwordSchema = require('../models/password') //Le model de mot de passe

/*********************************************************************************/
//On créer et exporte notre module

module.exports = (req, res, next) => { 
    if (!passwordSchema.validate(req.body.password)) { //Si le mot de passe n'est pas valide d'après notre modele.
        res.status(400).json({message : 'Votre mot de passe doit avoir au moins un chiffre, et une majuscule, avec aucun espace!'}) //Message donner à l'utilisateur.
    } else {
        next();
    } 
}