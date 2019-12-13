const mongoose = require('./../config/mongoose.js');
//const { ImageSchema } = require('./image.js');

const BicycleSchema = new mongoose.Schema({
    user_id : {type: mongoose.Schema.Types.ObjectId, required: true},
    title : {type: String, required: [true, 'Title missing.'], minlength : [2, 'Title length must be atleast 2 charaters.'], maxlength : [25, 'Title length must be shorter than 26 characters.']},
	description : {type: String, required: [true, 'Description missing.'], minlength : [2, 'Description length must be atleast 2 charaters.'], maxlength : [200, 'Description length must be shorter than 201 characters.']},
	price : {type: Number, required: [true, 'Price is missing.'], min : 1},
	location : {type: String, required : [true, 'Location is missing.']},
	image : {type: String, required: true}
}, {timestamps: true })

mongoose.model('Bicycle', BicycleSchema);
const Bicycle = mongoose.model('Bicycle');

module.exports = Bicycle;