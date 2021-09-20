/*********************************************************************************/
//On importe ce dont nous avons besoin.

const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const ValPassword = require('../middleware/validatorPassword');

/*********************************************************************************/
//On créer nos routes post.

router.post('/signup', ValPassword, userCtrl.signup)
router.post('/login',  userCtrl.login)

/*********************************************************************************/
//On exporte note router.

module.exports = router

