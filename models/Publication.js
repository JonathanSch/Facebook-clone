const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    media: {
        type: String,
    },
    is_active : {
        default: true,
        type: Boolean
    }
}, { timestamps:true })

const Publication = mongoose.model('Publication' , publicationSchema)

module.exports = { Publication }