const Bicycle = require('./../models/bicycle.js');
const Image = require('./../models/image.js');
const User = require('./../models/user.js');
const mongoose = require('./../config/mongoose.js');
const path = require('path');

module.exports = {

    index : (request, response) => {
            
			Bicycle.find({}, (err, bicycles) => {
                
				if(err) return response.json({message: 'Error', error: err});
				else return response.json({message: 'Success', bicycles});
            })
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
        
			User.updateOne({_id: mongoose.Types.ObjectId(request.body.user_id)}, {$push : {bicycles : bicycle._id}}, {runValidators: true}, (err) => {
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

        Bicycle.updateOne({_id:request.body._id}, 
			{$set: {user_id: request.body.user_id, 
					title: request.body.title, 
					description: request.body.description, 
					price: request.body.price, 
					image: request.body.image, 
					location: request.body.location}}, 
			{runValidators: true}, err => {
            if(err){
                let errors = {};
				for(let error in err.errors) errors[error] = (err.errors[error].message);
				return response.json({message: 'Error', errors: errors});
            }
            else return response.json({message: 'Success'});
        })
       
		
    }
}