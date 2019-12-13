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

       /* let comment = new Comment({user_id: request.session.user._id, text: request.body.text});

        Secret.update({_id:request.params.secret_id}, {$push : {comments : comment}}, {runValidators: true}, err => {
            if(err){
                for(let error in err.errors.comments.errors) request.flash('errors', err.errors.comments.errors[`${error}`].message);
                response.redirect('back');
            }
            else {
                //console.log(`Secret successfully updated!`);
                response.redirect(`/secret/${request.params.secret_id}`);
            }
        })
        })*/
		
		console.log(request);
		let new_image = `${request.file.filename}.${request.file.mimetype.split('/')[1]}`;
		
		fs.unlink(`images/${request.file.originalname}`, err => err ? console.log(err) : null );
		
		fs.rename(`${request.file.destination}${request.file.filename}`, 
			`images/${new_image}`, err => { if(err) console.log(err); } );
		
		return response.json({message: 'Success', image: `${new_image}`});

    }
}