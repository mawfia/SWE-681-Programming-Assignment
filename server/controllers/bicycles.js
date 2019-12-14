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

      //if(!request.session.user) return response.redirect('/');  NOT necessary but will need to send secret word from front end to authenticate
			Bicycle.find({}, (err, bicycles) => {

  				if(err) return response.json({message: 'Error', error: err});
  				else {
            /*bicycles.filter( b1 => b1.status === 'active' && b1.close_date <= new Date())
                    .forEach( b2 => {
                      //console.log("testing madone bike.");
                      b2.status = b2.bid_amount >= b2.min_price ? 'accession' : 'inactive';
                      Bicycle.updateOne({_id: mongoose.Types.ObjectId(b2._id)}, {$set:{status:b2.status}}, {runValidators: false}, () => {  })
                    })*/

            return response.json({message: 'Success', bicycles});

          }
        })
	},

  get: (request, response) => {

    /*return request.session.user ?
        Bicycle.findOne({_id: mongoose.Types.ObjectId(request.params.id)}, (err, bicycle) => {
            bicycle ?
                response.json({message: 'Success', bicycle}) :
                response.redirect('back');
        }) : response.redirect('/');*/
        //console.log(request.params.id);

        //if(!request.session.user) return response.redirect('/');

        //console.log(/^[a-fA-F0-9]{24}$/.test(request.body.id));
        //console.log(test);
        Bicycle.findOne({_id: mongoose.Types.ObjectId(request.body.id)}, (err, bicycle) => {
              //console.log(`in the get part. return: ${bicycle===null}`);
              //if(bicycle == null) return response.redirect('/bicycles');
              if(err) return response.json({message: 'Error', error: err});
              else return response.json({message: 'Success', bicycle});
        });
  },

	create : (request, response) => {

		let bicycle = new Bicycle();
		//image.data = fs.readFileSync(`${request.body.image.destination}${request.body.image.filename}`);
		//fs.writeFileSync(`images/${request.body.image.filename}.${request.body.image.mimetype.split('/')[1]}`, image.data);
		//console.log(path.resolve(`images/${request.body.image.filename}.${request.body.image.mimetype.split('/')[1]}`));

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
      //console.log(mongoose.Types.ObjectId(request.body._id));
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
