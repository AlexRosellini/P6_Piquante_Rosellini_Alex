/*********************************************************************************/
//On importe ce dont nous avons besoin.

const jwt = require('jsonwebtoken'); //Jsonwebtoken nous sert à générer et décripter des tokens.

/*********************************************************************************/
//Notre module d'authentification

module.exports = ( req, res, next ) => { //Cette fonction empêche un autre utilisateur de changer ou supprimer une sauce.
    try {
        const token = req.headers.authorization.split(' ')[1]; //on split le header de la requête pour n'avoir que le token.
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //On décode le token via notre clef secrête
        const userId = decodedToken.userId; //on met le token dans une constante pour vérification.
        if (req.body.userId && req.body.userId !== userId) { //Si le userID de la requête ne correspond pas au token..
            throw 'Invalid user Id'; //..on renvoie un message qui indique un utilisateur non valide.
        } else {
            next(); //Sinon on appel notre prochain middleware.
        }
    }
    catch {
        res.status(401).json({error: new Error('Invalid Request!')}) //En cas d'érreur
    }
}