'use strict';

const crypto = require('crypto');
const User = require('./../models/user.js');
const mongoose = require('./../config/mongoose.js');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const PRIVATE_KEY = fs.readFileSync('server.key', 'utf8');

const createKey = () => {
    let key = '';
    for(let x = 0; x < 10; x++) key += Math.random() > .5 ? Math.floor(Math.random()*10).toString() : String.fromCharCode(122 - Math.floor(Math.random()*26));
    return key;
}

const completeLogin = (request, response, user) => {
	user.password = null;
	user.key = null;
	user.__v = null;
  request.session.user = user;
	response.cookie('userID', user._id.toString());
	response.cookie('expiration', Date.now() + 86400 * 1000);
  response.setHeader('token', jwt.sign({ userID : user._id, first_name : user.first_name }, PRIVATE_KEY, { algorithm: 'RS384', expiresIn: '1 hour'}));
}

module.exports = {

    register : (request, response) => {

		    delete request.body.cpassword;
        let user = new User();
        for(let field in request.body) user[field] = request.body[field];

        user.save( err => {
            if(err) {
                let errors = {};
                for(let error in err.errors) errors[error] = (err.errors[error].message);
		            return response.json({message: 'Error', errors: errors});
            }
            else {
                user.key = createKey();
                let hpassword = crypto.createHmac('sha256', user.key).update(request.body.password).digest('hex');

                User.updateOne({_id:user._id},{$set:{password:hpassword, key:user.key}}, err => {
                    completeLogin(request, response, user);
                    return response.json({message: 'Success', user: user});;
                });
            }
        });
    },

    login : (request, response, next) => {

        User.findOne({email:request.body.email},(err, user) => {

          if(err) {
    				let errors = {};
    				for(let error in err.errors) errors[error] = (err.errors[error].message);
    				return response.json({message: 'Error', errors : errors});
    			}

          if(user){
              if(user.password == crypto.createHmac('sha256', user.key).update(request.body.password).digest('hex')){
                  completeLogin(request, response, user);
                  return response.json({message: 'Success', user: user});
              }
              else{
                  return response.json({message: 'Error', error : "Invalid Password Entered."});
              }
          }
          else {
              return response.json({message: 'Error', error : "User not found."});
          }
        });

    },

	getLoggedInUser: (request, response) => {

		User.findOne({_id: mongoose.Types.ObjectId(request.body.id) }, (err, user) => {

        if(user){
          user.password = null;
  				user.key = null;
  				user.__v = null;
  				return response.json({user:user});
        }
			});
	},

  renewToken: (request, response, next) => {

    //console.log("In user controllers renewtoken");
  },

  getSellersName: (request, response) => {

    User.find({_id: { $in: request.body.ids}},
              {"roles":0, "bicycles":0, "birthday":0, "createdAt":0, "updatedAt":0, "key":0, "password":0, "__v":0}, // omit the following fields in query response
              {sort: {'_id': 0}}, // sort in ascending order
              function(err, docs){
                return response.json({docs});
              });

  },

    logout : (request, response) => {

        request.session.destroy();
        response.clearCookie('url');
    		response.clearCookie('userID');
    		response.clearCookie('expiration');
    		return response.json(true);
    },

	all : (request, response) => {
		return response.sendFile(path.resolve("./dist/index.html"));
	}

}
