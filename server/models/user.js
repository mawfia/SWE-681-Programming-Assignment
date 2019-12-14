const mongoose = require('./../config/mongoose.js');
const { BicycleSchema } = require('./bicycle.js');
let message = null;

const validateEmail = e => {
  return new Promise((resolve, reject) => {
    User.find( {email:e},(err,users) => {
      resolve(users);
      //reject(err);
      //if(err) console.log(err);
    })}

  ).then( users => {
    message = users.length !== 0 ? "Email already exists." : `${e} is not a valid email!`;
    return users.length === 0 && /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(e);
  });
}

const UserSchema = new mongoose.Schema({
    first_name: {type: String, required: [true, 'Missing first name.'], minlength: [2, `First Name is too short. (2-25 characters)`], maxlength : [25, 'First Name is too long. (2-25 characters)'], trim: true},
    last_name : {type: String, required: [true, 'Missing last name.'], minlength : [2, `Last Name is too short. (2-25 characters)`], maxlength : [25, 'Last Name is too long. (2-25 characters)'], trim: true},
    email: {
        type: String,
        validate: { validator: validateEmail, message: () => `${message}`},
        required: [true, 'Email field is blank.'], maxlength : [25, 'Email must be 25 characters or less in length.'],
	      trim: true
      },
  birthday : {
      type: Date,
      validate: { validator: d => {
          let current = new Date();
          return d < new Date(current.getFullYear()-18, current.getMonth(), current.getDate(), current.getHours(), current.getMinutes(), current.getSeconds(), current.getMilliseconds());
      }, message: `You must be 18 years or older to register.` },
      required: [true, 'Birthdate is missing.']
    },
  password : {
      type: String,
      validate: { validator: p => { return /^(?=.*[0-9])(?=.*[A-Z])([a-zA-Z0-9!@#$%^&*()]{8,16})$/.test(p); }, message: `Password must be 8-16 characters and contain atleast one number and uppercase letter.` },
      required: [true, 'Password field is blank.'],
      trim: true
    },
	address1: {type: String, required: [true, 'Missing address1.'], minlength: [2, `Address1 is too short. (2-25 characters)`], maxlength : [25, 'Address1 is too long. (2-25 characters)'], trim: true},
  address2 : {type: String, required: false, maxlength : [25, 'Address2 is too long. (25 characters or less)'], trim: true},
	city: {type: String, required: [true, 'Missing city.'], minlength: [2, `City name is too short. (2-25 characters)`], maxlength : [25, 'City ame is too long. (2-25 characters)'], trim: true},
  state: {type: String, required: [true, 'Missing state.'], minlength : [2, `State name is too short. (2-25 characters)`], maxlength : [25, 'State name is too long. (2-25 characters)']},
  key : {
        type: String
    },
	roles : {
		type: String,
		enum: ['ADMIN', 'BASIC'],
		default: 'BASIC'

	},
	bicycles : {type: [mongoose.Schema.Types.ObjectId], required: false}
}, {timestamps: true })

mongoose.model('User', UserSchema);
const User = mongoose.model('User');
module.exports = User;
