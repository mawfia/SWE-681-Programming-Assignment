const Bicycle = require('./../models/bicycle.js');
const Image = require('./../models/image.js');
const mongoose = require('./../config/mongoose.js');
const path = require('path');
const fs = require('fs');

module.exports = {

    index : (request, response) => {

			Bicycle.find({}, (err, bicycles) => {

				if(err) return response.json({message: 'Error', error: err});
				else return response.json({message: 'Success', bicycles});
            })
	},

	get : (request, response) => {

		return response.sendFile(path.resolve(`./images/${request.params.id}`));

	},

	create : (request, response) => {

		fs.rename(`${request.file.destination}${request.file.filename}`,
			`images/${request.file.filename}.${request.file.mimetype.split('/')[1]}`, err => { if(err) console.log(err); } );

		return response.json({message: 'Success', image: `${request.file.filename}.${request.file.mimetype.split('/')[1]}`});
    },

    update : (request, response) => {


  		let new_image = `${request.file.filename}.${request.file.mimetype.split('/')[1]}`;

  		fs.unlink(`images/${request.file.originalname}`, err => err ? console.log(err) : null );

  		fs.rename(`${request.file.destination}${request.file.filename}`,`images/${new_image}`, err => { if(err) console.log(err); } );

  		return response.json({message: 'Success', image: `${new_image}`});

    },

    destroy : (request, response) => {

      fs.unlink(`images/${request.body.image}`, err => {
        if(err) console.log(err);

        return response.json({message: 'Success'});
      });



    }
}
