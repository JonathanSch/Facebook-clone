const services = require('../services/personServices');
const Utils = require('../Utils')

module.exports = {
    find: async (req, res) => {
        try {
            const persons = await services.find();
            if (persons.length <= 0) res.send({ message: "No hay usuarios" }).status(200)
            res.send({ persons }).status(200);
        } catch (error) {
            res.send({ error }).status(409)
        }
    },
    findById: async (req, res) => {
        try {
            const person = await services.findById(req.params.id)
            res.send({ person }).status(200);
        } catch (error) {
            res.send(error).status(400);
        }


    },
    create: async (req, res) => {
        try {
            const person = req.body;
            const nuevo = await services.create(person)
            res.send({ nuevo }).status(201)
        } catch (error) {
            console.error(error)
        }
    },
    change: async (req, res) => {
        try {
            if(req.files){
                const { photo } = req.files;
                const upload = await Utils.uploadFile(photo.tempFilePath);
                if(upload) req.body.photo = upload.url;
            }
            const person = await services.findById(req.params.id)
            const modifiedPerson = await services.change(person, req.body)
            res.send({ modifiedPerson}).status(201)
        } catch (error) {
            res.send({ error }).status(400)
        }
    },
    delete: async (req, res) => {
        try {
            const person = await services.findById(req.params.id)
            const modifiedPerson = await services.change(person, { is_active: false })
            res.send({ message: 'Usuario ya no existente' }).status(201)
        } catch (error) {
            res.send({ error }).status(400)
        }

    },
    login: async (req, res) => {
        try {
            const person = await services.getPersonByEmail(req.body.email);
            const isMatch = services.checkPassword(req.body.password, person.password)

            if (!isMatch) res.send({ message: 'contrasena incorrecta' }).status(400)

            const paylod = {
                name: person.name,
                id: person._id,
                email: person.email
            }

            const token = Utils.createToken(paylod);
            res.status(200).send({person, token});
        } catch (error) {
            res.send({ error }).status(400)
        }


    },
    getPersonByEmail : async(req,res) => {
        try {
            
            const person = await services.getPersonByEmail(req.body.email)
            if(!person) res.send({message:"Necesitas un email"}).status(404);
        } catch (error) {
            res.send({ error }).status(400)
        }
    }
}