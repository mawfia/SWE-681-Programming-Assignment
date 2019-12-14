'use strict';

const mongoose = require('./mongoose.js');
const Bicycle = require('../models/bicycle.js');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const PUBLIC_KEY = fs.readFileSync('public.key', 'utf8');
const eventLogger = require('./eventLogger');

let active = [];
let users = [];
let poll = true;
let user = false;
var disconnect_users;
var poll_users;
var poll_users2;
var poll_server;

const index = () => new Promise((resolve, reject) => Bicycle.find({status:"active"}, (err, bicycles) => {
  active = bicycles;
  resolve(bicycles);
}));
index();

module.exports = (io, app) => {

  io.use( (socket, next) => {
    if(socket.handshake.query && socket.handshake.query.token != 'null'){
      jwt.verify(socket.handshake.query.token, PUBLIC_KEY, (err, decoded) => {
        if(err) {
          //let event = JSON.stringify({client_ip: socket.handshake.ip, date: new Date().toString(), message: "Socket connection failure with invalid token."});
          //eventLogger.logEvent('sockets',event).then( () => console.log("done")).catch( (ex) => console.log(ex.message) );
          return next(new Error('Authentication error'));
        }

        //console.log("User connected: " + socket.id);

        next();
      });
    }else return next(new Error('Authentication error'));
  }).on('connection', (socket) => {

  socket.emit('greeting', {msg : `There are ${active.length} active bicycles available.`});

  socket.on('reconnect_attempt', () => {
    //console.log('user reconnected: ' + socket.id)
  })

  socket.on('disconnect', (reason) => {
    //console.log('user disconnected: ' + socket.id + ` ${reason}`);
  });

  socket.on('activate', () => {
    index().then( () => { poll = true; poll_server(); });

    socket.broadcast.emit('update', {msg: "update activated listing"});

  });

  socket.on('token', (token) => {
    let dtoken = jwt.decode(token);

    users.find( (u) => u.uid === dtoken.userID).exp = dtoken.exp;
  })

  socket.on('deactivate', () => {
    socket.broadcast.emit('update', {msg: "update deactivated listing"});
  })

  socket.on('bid', (data) => {
    //let event = JSON.stringify({bicycle_id: data.bicycle._id, dateTime: data.bid.bid_date, message: "Bid on auction", seller_id: data.bicycle.seller_id, buyer_id: data.bid.buyer_id, bid_amount: data.bid_amount, client_ip: socket.handshake.ip});
    //eventLogger.logEvent('bids',event).then( () => console.log("done")).catch( (ex) => console.log(ex.message) );
    index().then( () => {if(!poll){ poll = true; poll_server(); }} );
    socket.broadcast.emit('update', {msg: "bid update"});
  })

  socket.on('add-message', (message) => {
    io.emit('message', {type:'new-message', text: message});
  });

poll_users = () =>  (function poll2(){

      //console.log("poll users called.");
        io.emit('update', {type:'new-message', text: "Just testing second polling."});

  })();

  disconnect_users = (sid) => {
    io.to(sid).emit('logout', {msg: "logout"});
    users.pop({sid: sid});
  }

});


poll_server = () => (function poll1(){
 setTimeout(function(){
   if(poll) {
     //console.log("polling started");
     active.filter(b => new Date(b.close_date) <= new Date() ).forEach( b2 => {
       b2.status = b2.bid_amount >= b2.min_price ? 'accession' : 'inactive';
       if(b2.status === "inactive") { b2.buyer_id = b2.bid_date = null; b2.bid_amount = 0; }
       Bicycle.updateOne({_id:b2._id}, {$set: b2}, {runValidators: false}, err => { index(); poll_users(); });
     })

     if(active.length === 0) { index().then( b => {poll = b.length > 0 ? true : false; }) }
     else poll = true;

     poll1();
   }

}, 2000);
})(); poll_server();

poll_users2 = () => (function poll(){
 setTimeout(function(){
   if(user) {
      users.filter(u => new Date(u.exp * 1000) <= new Date()).forEach( u => {
        //console.log("user session expired.");
        disconnect_users(u.sid);
      })

    user = users.length > 0;

     poll();
   }

}, 5000);
})();


}
