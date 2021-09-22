/*********************************************************************************/
//On importe ce dont nous avons besoin.

const mongoose = require('mongoose')

/*********************************************************************************/
//Notre Schéma Sauce


const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true }, //Required True: On en a besoin
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, default: 0 }, //Valeur de défaut like et dislike: 0.
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String] }, //On créer un tableau pour nos utilisateurs, vide par défaut.
    usersDisliked: { type: [String] },
})


/*********************************************************************************/
//On exporte notre module.

module.exports = mongoose.model('Sauce', sauceSchema)