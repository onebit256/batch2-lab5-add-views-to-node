const router = require('express').Router()
const signup = require('../Controller/auth.controller')
const login = require('../Controller/auth.controller')
const getCurrentUser = require('../Controller/auth.controller')
// const {validateUser} = require('../Middleware/validation');
// const {loginValidation} = require('../Middleware/loginvalidation');
// const auth = require('../Middleware/auth')

router.post('/signup',signup.signup)
router.post('/login',login.login)
router.get('/user', getCurrentUser.getCurrentUser)

module.exports = router