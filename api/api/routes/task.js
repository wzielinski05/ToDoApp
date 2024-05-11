const express = require('express')
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

const TaskController = require('../controllers/task')


router.get('/', checkAuth, TaskController.getAll)

router.get('/:taskId', checkAuth, TaskController.getOne)

router.post('/', checkAuth, TaskController.create)

router.delete('/:taskId', checkAuth, TaskController.delete)

router.patch('/:taskId', checkAuth, TaskController.update)


module.exports = router
