const { Publication } = require('../models/Publication');
const bcrypt = require('bcrypt');

module.exports = {
    find : () => Publication.find({ is_active:true }),
    findById : (id) => Publication.findById(id),
    create : (body) => {
        const newPublication = new Publication(body)
        return newPublication.save()
    },
    change : (publication,body) => {
        Object.assign(publication,body)
        return publication.save();
    }
}