/*********************************************************************************/
//On importe ce dont nous avons besoin.

const bcrypt = require('bcrypt'); //Bcrypt sert à Hash (et donc sécuriser) les passwords
const jwt = require('jsonwebtoken'); //jsonwebtoken genère un token (pour que nos users ne se connectent qu'une fois)
const User = require('../models/user'); //on importe le schéma pour nos utilisateurs.

/*********************************************************************************/
//notre middleware signup, pour créer un compte

exports.signup = (req, res, next) => { 
  bcrypt.hash(req.body.password, 10) //on hash le password avec un salt de 10, le salt ajout du texte aléatoire au hash.
  .then(hash => { 
    const user = new User({ //on créer ensuite notre user 
      email: req.body.email, //on prend le mail envoyer par le frontend
      password: hash //et le password qui est maintenant hash
    });
    user.save() //on sauvegarde notre user sur la database.
    .then(() => res.status(200).json( {message: "Nouveau compte utilisateur créé !"})) //On renvoie une réponse positive 200
    .catch(error => res.status(400).json({ message : Object.keys(error.errors).map(key => error.errors[key].message).join('\n') })) //Sinon un message d'érreur (si même email)
  })
  .catch(error => res.status(500).json({ message : 'Something went wrong ...' }))  //Sinon un message d'érreur (si serveur)
}

/*********************************************************************************/
//notre middleware de login, pour ce connecter.

exports.login = (req, res, next) => { 
  User.findOne({ email: req.body.email}) //findOne, de mangoose, permet de trouver notre via l'Email
    .then(user => {
      if (!user) { //Si on ne trouve pas notre user, on envoie un message d'érreur
        return res.status(401).json({error : 'User not found'})
      }
      bcrypt.compare(req.body.password, user.password) //Bcrypt observe le mdp pour déterminer si il le hash sur la database provient des même caractères.
        .then(valid =>{ 
          if (!valid) { //Si ce n'est pas le cas, on renvoie un message d'érreur
            return res.status(401).json({error : 'Incorrect password'})
          }
          res.status(200).json({ //sinon on renvoie le User._id que le frontend demande, ainsi qu'un token.
            userId: user._id,
            token: jwt.sign( //on génère notre token via .sign de JsonWebToken
              {userId: user._id }, //le token est créer via le User._id.
              'RANDOM_TOKEN_SECRET', 
              {expiresIn: '24h'} //le dit token expire après 24h.
              )
          })
        })
      .catch(error => res.status(500).json({ error })); //Sinon un message d'érreur
    })
  .catch(error => res.status(500).json({ error })); //Sinon un message d'érreur
}
/*********************************************************************************/

