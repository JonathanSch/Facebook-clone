const jwt = require('jsonwebtoken');
const DB_SECRET = process.env.DB_SECRET
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})

module.exports = {
    createToken: (payload) => {
        const token = jwt.sign(payload, DB_SECRET, { expiresIn: "1d" })
        return token;
    },
    uploadFile: (tempFile) => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(tempFile, (err, result) => {
                err ? reject(err) : resolve(result);
            })
        })
    }
}