'use strict';

const users = require('./../controllers/users.js');
const bicycles = require('./../controllers/bicycles.js');
const images = require('./../controllers/images.js');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const tokenValidator = require('./middleware');

module.exports = app => {

    app.post('/register', tokenValidator.loginLimiter, (request, response) => {
        users.register(request, response);
    })

    app.post('/sellers/name', tokenValidator.checkToken, (request, response) => {

        users.getSellersName(request, response);
    })

	app.post('/user', tokenValidator.checkToken, (request, response, next) => {
    users.getLoggedInUser(request, response, next);
	})

  app.get('/user/token', tokenValidator.renewToken, (request, response, next) => {
    users.renewToken(request, response, next);
  })

    app.post('/login', tokenValidator.loginLimiter, (request, response) => {
        users.login(request, response);
    })

    app.delete('/logout', tokenValidator.loginLimiter, (request, response) => {

        users.logout(request, response);
    })

	app.put('/bicycles/update', tokenValidator.checkToken, (request, response) => {
		bicycles.update(request, response);
	})

  app.post('/bicycle/get', tokenValidator.checkToken, (request, response) => {
    bicycles.get(request, response);

  })

	 app.post('/bicycles/index', (request, response) => {

        bicycles.index(request, response);
    })

    app.post('/bicycles/create', tokenValidator.checkToken, (request, response) => {

        bicycles.create(request, response);
    })

    app.post('/bicycles/delete', tokenValidator.checkToken, (request, response) => {

        bicycles.destroy(request, response);
    })

	app.get('/image/:id', (request, response) => {

		images.get(request, response);
	})

	app.post('/image/create', tokenValidator.checkToken, upload.single('image'), (request, response) => {

        images.create(request, response);
    })

	app.post('/image/update', tokenValidator.checkToken, upload.single('image'), (request, response) => {

        images.update(request, response);
    })

    app.post('/image/delete', tokenValidator.checkToken, (request, response) => {
      images.destroy(request, response);
    })

	app.all('*', (request, response, next) => {
		users.all(request, response, next);
	})
}
