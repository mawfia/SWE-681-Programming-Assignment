'use strict';

const mongoose = require('./../config/mongoose.js');
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour : 'numeric' , minute : 'numeric'};
let message = null;

const BicycleSchema = new mongoose.Schema({
  seller_id : {type: mongoose.Schema.Types.ObjectId, required : true},
  title : {type: String, required: [true, 'Title missing.'], minlength : [2, 'Title length must be atleast 2 charaters.'], maxlength : [35, 'Title length must 35 characters or less.'], trim : true},
	description : {type: String, required : [true, 'Description missing.'], minlength : [2, 'Description length must be atleast 2 charaters.'], maxlength : [250, 'Description length must 250 characters or less.'], trim : true},
	start_price : {type: Number, required : [true, 'Starting price is missing.'], min : 0, validate : [
    { validator : sp => /^(0|[1-9][0-9]{0,5})$/.test(sp) && sp <= 1000000, message : "Start price must be less than $1,000,000 and a whole dollar amount."},
    { validator : function(sp){
                    let min_price = this.min_price || this.getUpdate().$set.min_price;
                    return sp < min_price;
                  }, message : "Starting price must be less than minimum closing price."
    }
  ]},
  min_price : {type: Number, required : [true, 'Minimum bidding price is missing.'], min : 1, validate : [
    { validator : mp => /^[1-9][0-9]{0,5}$/.test(mp) && mp <= 1000000, message : "Minimun closing price must be bewtween $0 - $1,000,000 and a whole dollar amount."},
    { validator : function(mp){
                    let start_price = this.start_price || this.getUpdate().$set.start_price;
                    return mp > start_price;
                  }, message : "Minimum closing price must be greater than starting price."
    }
  ]},
	location : {type: String, required : [true, 'Location is missing.'], trim : true},
	image : {type: String, required : true},
  buyer_id : {type: mongoose.Schema.Types.ObjectId, required : false},
  bid_date : {type: Date, required : false},
  close_date : {type: Date, required : [false, 'Auction closing date and time missing.'], validate : [
    { validator : cd => new Date(cd) >= limit(0,5), message : () => `Auction closing date and time must start ${new Intl.DateTimeFormat('en-US', options).format(limit(0,5))} or later.`},
    { validator : cd => new Date(cd) <= limit(3,0), message : () => `Auction closing date and time must end within 90 days or by ${new Intl.DateTimeFormat('en-US', options).format(limit(3,0))}.`}
  ]},
  bid_amount : {type: Number, required: false, validate : [
    {validator : validate2, message: (ba) => `${message}`},
    {validator : ba => /^[1-9][0-9]{0,6}$/.test(ba), message: "Invalid amount entered for bid."}
  ]},
  status : {type: String, required : true, enum : ['active','inactive','accession'], lowercase: true, trim: true, validate : {
    validator : function(s) { return ((s !== 'active') || (s === 'active' && this.getUpdate().$set.close_date != null)); }, message : "Auction closing date and time missing!"
  }}
}, {timestamps: true })

mongoose.model('Bicycle', BicycleSchema);
const Bicycle = mongoose.model('Bicycle');

module.exports = Bicycle;

const limit = (months=0, minutes=0) => {
  return new Date(
    new Date().getFullYear(),
    new Date().getMonth()+months,
    new Date().getDate(),
    new Date().getHours(),
    new Date().getMinutes()+minutes,
    new Date().getSeconds(),
    new Date().getMilliseconds());
}

function validate2(ba){
  return new Promise((resolve, reject) => {
    Bicycle.findOne({_id:this.getUpdate().$set._id}, (err,b) => {
      resolve(b);
      //reject(err);
      if(err) console.log(err);
    })}

  ).then( b => {
    b.bid_amount = b.bid_amount || 0;
    message = ba < b.start_price ? `Bid amount must be greater than starting price of bicycle $${b.start_price}.` : `Bid must be greater than current bid of $${b.bid_amount}.`;
    return ba >= b.start_price && (ba > b.bid_amount || ((ba === b.bid_amount) && (this.getUpdate().$set.buyer_id == b.buyer_id.toString() && (new Date() - b.bid_date <= 3000) )));
  });
}
