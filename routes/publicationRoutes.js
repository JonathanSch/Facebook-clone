const express = require('express')
const router = express.Router();
const publicationControllers = require('../controllers/publicationControllers')
const middlewares = require('../middlewares')

router.post('/crear' , publicationControllers.create)

router.use(middlewares.validateToken)

router.get('/' , publicationControllers.find)
router.get('/:id' , publicationControllers.findById)
router.patch('/:id' , publicationControllers.change)
router.delete('/:id' , publicationControllers.delete)

module.exports = router;