const publicationServices = require('../services/publicationServices');
const Utils = require('../Utils')

module.exports = {
    find: async (req, res) => {
        try {
            const publications = await publicationServices.find();
            if (publications.length <= 0) res.status(409).send({ message: "No hay publicaciones" })
            res.status(200).send({ publications });
        } catch (error) {
            res.status(409).send({ error })
        }
    },
    findById: async (req, res) => {
        try {
            const publication = await publicationServices.findById(req.params.id)
            res.status(200).send({ publication });
        } catch (error) {
            res.status(409).send({ error });
        }


    },
    create: async (req, res) => {
        try {
            const publication = req.body;
            const newPublication = await publicationServices.create(publication)
            res.status(201).send({ newPublication })
        } catch (error) {
            res.status(409).send({ error })
        }
    },
    change: async (req, res) => {
        try {
            if(req.files){
                const { media } = req.files;
                const upload = await Utils.uploadFile(media.tempFilePath);
                if(upload) req.body.media = upload.url;
            }
            const publication = await publicationServices.findById(req.params.id)
            const modifiedPublication = await publicationServices.change(publication, req.body)
            res.status(200).send({ modifiedPublication})
        } catch (error) {
            res.status(409).send({ error })
        }
    },
    delete: async (req, res) => {
        try {
            const publication = await publicationServices.findById(req.params.id)
            const modifiedPublication = await publicationServices.change(publication, { is_active: false })
            res.status(200).send({ message: 'Publicación ya no existente' })
        } catch (error) {
            res.status(409).send({ error })
        }
    }
}