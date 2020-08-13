const express = require('express')
const router = express.Router();
const personControllers = require('../controllers/personControllers')
const middlewares = require('../middlewares')

router.post('/crear' , personControllers.create)
router.post('/login/:id' , personControllers.login)

router.use(middlewares.validateToken)

router.get('/persona' , personControllers.find)
router.get('/persona/:id' , personControllers.findById)
router.patch('/persona/:id' , personControllers.change)
router.delete('/persona/:id' , personControllers.delete)

module.exports = router;