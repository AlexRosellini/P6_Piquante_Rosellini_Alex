/*********************************************************************************/
//On importe ce dont nous avons besoin.

require('dotenv').config(); //Dotenv nous permet de cacher certains elements dans un fichier gitignore (et ainsi ne pas donner nos mots de passes)
const express = require('express'); 

const helmet = require('helmet'); //Element de sécurité. Helmet securize les headers.
const xss = require('xss-clean'); //Element de sécurité. Aide contre les attaques XSS.
const cors = require('cors'); //Un middleware qui simplifie l'utilisation des Cors.
const rateLimit = require("express-rate-limit"); //Element de sécurité. contrôle le débit de requêttes.

const mongoose = require('mongoose'); //Notre database
const morgan = require('morgan'); //Logger pour remonter des informations

const userRoutes = require('./routes/user'); //Notre router utilisateur
const sauceRoutes = require('./routes/sauce'); //Notre routeur Sauce.
const path = require('path'); //Module node qui sert à cacher notre addresse Mongo (marche avec dotenv)

/*********************************************************************************/
//On créer notre application avec express

const app = express();

/****************************************************************/
//On se connecte à mongoose, notre database

mongoose.connect(process.env.MONGO_URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

/*********************************************************************************/
//Vu que l'on a deux origines, on ajoute un middleware pour éviter les érreurs CORS

app.use(cors())


/****************************************************************/
//Nos middlewares principaux.


app.use(express.json()); //Equivalent de bodyparser qui n'est plus utiliser.
app.use(express.urlencoded({
  extended: true
}));

app.use(helmet()); 
app.use(xss());
app.use(morgan('combined'))

app.use('/images', express.static(path.join(__dirname, 'images'))); //On indique le dossier pour multer

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

app.use('/api/sauces', sauceRoutes)
app.use('/api/auth', userRoutes);

/****************************************************************/
//on exporte notre application.

module.exports = app;


