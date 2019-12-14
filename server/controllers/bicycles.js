'use strict';

const Bicycle = require('./../models/bicycle.js');
const Image = require('./../models/image.js');
const User = require('./../models/user.js');
const mongoose = require('./../config/mongoose.js');
const path = require('path');
const test = require('./../config/sockets.js');
const fs = require('fs');

module.exports = {

    index : (request, response) => {

			Bicycle.find({}, (err, bicycles) => {

  				if(err) return response.json({message: 'Error', error: err});
  				else {
            return response.json({message: 'Success', bicycles});

          }
        })
	},

  get: (request, response) => {


        Bicycle.findOne({_id: mongoose.Types.ObjectId(request.body.id)}, (err, bicycle) => {

              if(err) return response.json({message: 'Error', error: err});
              else return response.json({message: 'Success', bicycle});
        });
  },

	create : (request, response) => {

		let bicycle = new Bicycle();

		for(let field in request.body) bicycle[field] = request.body[field];

		 bicycle.save( err => {
			if(err) {
				let errors = {};
				for(let error in err.errors) errors[error] = (err.errors[error].message);

				return response.json({message: 'Error', errors: errors});
			}

			User.updateOne({_id: mongoose.Types.ObjectId(request.body.seller_id)}, {$push : {bicycles : bicycle._id}}, {runValidators: true}, (err) => {
					if(err){
						let errors = {};
						for(let error in err.errors) errors[error] = (err.errors[error].message);
						return response.json({message: 'Error', errors: errors});
					}
					else return response.json({message: 'Success'});
				}
			)
		})
    },

    update : (request, response) => {

      let bicycle = new Bicycle();
      for(let field in request.body) bicycle[field] = request.body[field];
        Bicycle.findOneAndUpdate({_id: mongoose.Types.ObjectId(request.body._id)}, {$set: bicycle}, {runValidators: true, context: 'query', new: true }, (err, b) => {
            if(err){
                let errors = {};
        				for(let error in err.errors) errors[error] = (err.errors[error].message);

                return response.json({message: 'Error', errors: errors});
              }
            else return response.json({message: 'Success', b});
        });
    },

    destroy : (request, response) => {

      User.updateOne({_id: mongoose.Types.ObjectId(request.body.seller_id)}, {$pull : {bicycles : request.body._id}}, err => {});
      Bicycle.deleteOne({_id: mongoose.Types.ObjectId(request.body._id)}, (err) => {
        if(err) return response.json({message: 'Error'});
        else {
          fs.unlink(`images/${request.body.image}`, err => err ? console.log(err) : null );
          return response.json({message: 'Success'});
        }
      })
    }
}
