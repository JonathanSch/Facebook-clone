const express = require('express');
const router = express.Router();
const personRouter = require('./personRoutes')

router.get('/' , (req,res) =>{
    res.send({message:'valla valla tacubaya, todo salio bien'}).status(200)
})
router.use('/rutas' , personRouter)

module.exports = router