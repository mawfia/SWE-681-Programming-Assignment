'use strict';

const express = require('express');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');
const noCache = require('nocache');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const PRIVATE_KEY = fs.readFileSync('server.key', 'utf8');
const PUBLIC_KEY = fs.readFileSync('public.key', 'utf8');
const PRIVATE_CERT = fs.readFileSync('server.cert', 'utf8');
const options = {
	//key: fs.readFileSync('/etc/letsencrypt/live/mawfia.eastus.cloudapp.azure.com/privkey.pem'),
	//cert: fs.readFileSync('/etc/letsencrypt/live/mawfia.eastus.cloudapp.azure.com/fullchain.pem'),
	//dhparam: fs.readFileSync('/etc/letsencrypt/live/mawfia.eastus.cloudapp.azure.com/dh-strong.pem')
	//dhparam: fs.readFileSync('/etc/letsencrypt/live/mawfia.eastus.cloudapp.azure.com/dhparam4096.pem')
	key: PRIVATE_KEY,
	cert: PRIVATE_CERT
};

app.use(helmet.noCache()); // use HSTS to effectively force the client to direct all traffic through HTTPS
app.use(noCache());
app.use(express.static(path.resolve('dist')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser('asfgdkaljieaienvonwcnpwefef'));
app.set('trust proxy', 1);
app.use(
	session({
		secret: 'Davidssecrect',
		resave: false,
		proxy: true,
		saveUninitialized: false,
		rolling: true,
		name: 'session',
		cookie: {
			secure: true,
			httpOnly: false,
			maxAge: 6000000000,
			sameSite: true
		}
	})
);


const server = https.createServer(options, app).listen(8000);
const io = require('socket.io')(server);

require('./server/config/routes.js')(app);
require('./server/config/sockets.js')(io, app);
