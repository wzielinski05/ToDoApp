const express = require('express')
const router = express.Router();
const checkAuth = require('../middleware/check-auth')


const UsersController = require('../controllers/user')

router.post('/signup', UsersController.signup)

router.post('/login', UsersController.login)

router.delete('/:userId', checkAuth, UsersController.delete)


module.exports = router
