'use strict';

const fs = require('fs');
const jwt = require('jsonwebtoken');
const PRIVATE_KEY = fs.readFileSync('server.key', 'utf8');
const PUBLIC_KEY = fs.readFileSync('public.key', 'utf8');
const rateLimit = require("express-rate-limit");
const eventLogger = require('./eventLogger');

const checkToken = (req, res, next) => {

  let token = req.headers['xrl-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token) {
    jwt.verify(token, PUBLIC_KEY, (err, decoded) => {
      if (err) {

        let event = JSON.stringify({date: new Date().toString(), message: "Attempt to access restricted endpoint with invalid token.", ip: req.ip, URL: req.originalUrl});
        eventLogger.logEvent('endpoints',event).then( () => console.log("done")).catch( (ex) => console.log(ex.message) );
        return res.status(403).redirect('back');

      } else { next(); }
    });
  } else {
    let event = JSON.stringify({date: new Date().toString(), message: "Attempt to access restricted endpoint without token.", ip: req.ip, URL: req.originalUrl});
    eventLogger.logEvent('endpoints',event).then( () => console.log("done")).catch( (ex) => console.log(ex.message) );

    return res.status(403).json({
      success: false,
      message: 'Unauthorized access.' // Auth token is not supplied
    });
  }
};





const renewToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if(token){
    jwt.verify(token, PUBLIC_KEY, {algorithm: ['RSA384']}, (err, decoded) => {
    	if(decoded) {
        //res.json({success : true});
        res.setHeader('token', jwt.sign({ userID : decoded.userID, first_name : decoded.first_name }, PRIVATE_KEY, { algorithm: 'RS384', expiresIn: '30 minutes'}));
        res.json({success : true});
        //next();
      }
    	else if(err) {

        let event = JSON.stringify({date: new Date().toString(), message: "Token renewl error.", ip: req.ip, URL: req.originalUrl});
        eventLogger.logEvent('tokens',event).then( () => console.log("done")).catch( (ex) => console.log(ex.message) );
        return res.sendStatus(403).json({ success: false, message: err });
      }
    });
  }
  else {
    let event = JSON.stringify({date: new Date().toString(), message: "Attempt to access renewal token endpoint without token.", ip: req.ip, URL: req.originalUrl});
    eventLogger.logEvent('tokens',event).then( () => console.log("done")).catch( (ex) => console.log(ex.message) );
    return res.json({success: false, message: 'Auth token is not supplied'});
  }
  next();

}

  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 hour window
    max: 4, // start blocking after 5 requests
    message: "Too many logins from this IP, please try again after 15 minutes.",
    skipSuccessfulRequests: false,
    onLimitReached: (req, res, options) => { /*console.log(req.rateLimit);*/ },
    handler: (req, res, next) => {
      let event = JSON.stringify({date: new Date().toString(), message: "Too many invalid login/registeration attempts", ip: req.ip, URL: req.originalUrl});
      eventLogger.logEvent('login-register',event).then( () => console.log("done")).catch( (ex) => console.log(ex.message) );
      res.json({success: false,
        error: req.path === '/login' ? `Too many invalid login attempts, please try again after 15 minutes or ${new Date(req.rateLimit.resetTime)}.` : `Too many invalid registration attempts, please try again after 15 minutes.`});
    }
  });


module.exports = {
  checkToken: checkToken,
  renewToken: renewToken,
  loginLimiter: loginLimiter
}
