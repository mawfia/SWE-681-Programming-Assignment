const mongoose = require('./../config/mongoose.js');

const ImageSchema = mongoose.Schema({
	data: {type: Buffer, data: Buffer, required : [true, 'Image data is missing.']},
	contentType : {
		type: String, required : [true, 'Content type is missing.']
	}
},{timestamps: true });

mongoose.model('Image', ImageSchema);
const Image = mongoose.model('Image');

module.exports = Image;