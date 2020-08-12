const jwt = require('jsonwebtoken')

module.exports = {
    validateToken : (req,res,next) =>{
        try {
            if(!req.headers.authorization) res.status(403).send({message : "Necesitas un token para continuar"})

            const {authorization} = req.headers;
            const splitted = authorization.split(' ')

            if(splitted[0] !== "myapp") res.status(403).send({error:"Tu bearer es incorrecto"})

            const decoded = jwt.verify(splitted[1] , process.env.DB_SECRET);
            req.decoded = decoded
            next();
        } catch (error) {
            res.status(403).send({ error })
        }
    }
}