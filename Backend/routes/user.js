/*********************************************************************************/
//On importe ce dont nous avons besoin.

const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')

/*********************************************************************************/
//On créer nos routes post.

router.post('/signup', userCtrl.signup)
router.post('/login',  userCtrl.login)

/*********************************************************************************/
//On exporte note router.

module.exports = router

