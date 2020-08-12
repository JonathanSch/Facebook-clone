const express = require('express')
const router = express.Router();
const personControllers = require('../controllers/personControllers')
const middlewares = require('../middlewares')

router.post('/crear' , personControllers.create)
router.post('/login/:id' , personControllers.login)

router.use(middlewares.validateToken)

router.get('/' , personControllers.find)
router.get('/:id' , personControllers.findById)
router.patch('/:id' , personControllers.change)
router.delete('/:id' , personControllers.delete)

module.exports = router;