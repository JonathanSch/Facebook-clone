const mongoose = require('mongoose');
const DB_URI = process.env.DB_URI
mongoose.connect(DB_URI , (error) =>{
    error ? console.error(error) : console.info('Database connected')
})