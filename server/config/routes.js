const users = require('./../controllers/users.js');
const bicycles = require('./../controllers/bicycles.js');
const images = require('./../controllers/images.js');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

module.exports = app => {

    /*app.get('/', (request, response) => {

        users.index(request, response);
    })*/

    app.post('/register', (request, response) => {

        users.register(request, response);
    })

    /*app.get('/profile', (request, response) => {

        users.profile(request, response);
    })*/
	
	app.post('/user', (request, response) => {
		users.getLoggedInUser(request, response);
	})

    app.post('/login', (request, response) => {

        users.login(request, response);
    })

    app.delete('/logout', (request, response) => {

        users.logout(request, response);
    })
	
	app.put('/bicycle/update', (request, response) => {
		bicycles.update(request, response);
	})
	
	 app.get('/bicycles/index', (request, response) => {

        bicycles.index(request, response);
    })

    app.post('/bicycle/create', (request, response) => {

		//console.log(request.file);
        bicycles.create(request, response);
    })
	
	app.get('/image/:id', (request, response) => {
		
		images.get(request, response);
	})
	
	app.post('/image/create', upload.single('image'), (request, response) => {
		// request.file contains image
		
        images.create(request, response);
    })
	
	app.post('/image/update', upload.single('image'), (request, response) => {
		// request.file contains image
		
        images.update(request, response);
    })
	
	app.all('*', (request, response) => {
		
		users.all(request, response);
	})

    /*app.get('/secret/:secret_id', (request, response) => {

        secrets.show(request, response);
    })

    app.get('/secret/destroy/:secret_id', (request, response) => {

        secrets.destroy(request, response);
    })

    app.post('/comment/new/:secret_id', (request, response) => {

        comments.new(request, response);
    })*/
}