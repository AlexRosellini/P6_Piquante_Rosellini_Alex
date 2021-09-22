/*********************************************************************************/
//On importe ce dont nous avons besoin.

const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const ValPassword = require('../middleware/validatorPassword'); //Notre middleware de validation

/*********************************************************************************/
//On créer nos routes post.

router.post('/signup', ValPassword, userCtrl.signup) //Le middleware de validation vérifie le mot de passe et passe au signup.
router.post('/login',  userCtrl.login)

/*********************************************************************************/
//On exporte note router.

module.exports = router

