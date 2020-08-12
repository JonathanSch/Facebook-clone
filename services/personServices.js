const {Person} = require('../models/Person');
const bcrypt = require('bcrypt');

module.exports = {
    find : () => Person.find({is_active:true}),
    findById : (id) => Person.findById(id),
    create : (body) => {
        const newPerson = new Person(body)
        return newPerson.save()
    },
    change : (person,body) => {
        Object.assign(person,body)
        return person.save();
    },
    checkPassword : (sent,real) => {
        return bcrypt.compareSync(sent,real)
    },
    getPersonByEmail : (mail) =>{
        return Person.findOne({email:mail})
    }
}