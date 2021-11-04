const cloudinary = require('cloudinary').v2;

const Keys = require('./keys')

const cloudinaryConfig = cloudinary.config(Keys.cloudinary);

module.exports = cloudinaryConfig;
 