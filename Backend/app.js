/*********************************************************************************/
//On importe ce dont nous avons besoin.

require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoose = require('mongoose');
const rateLimit = require("express-rate-limit");
const morgan = require('morgan');
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
const path = require('path');

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

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(helmet());
app.use(xss());
app.use(morgan('combined'))
app.use('/images', express.static(path.join(__dirname, 'images')));

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


