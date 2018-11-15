
// =================================================================
// get the packages we need ========================================
// =================================================================


var config = require('./config'); // get our config file
var User   = require('./app/models/user'); // get our mongoose model
var Product = require('./app/models/product');
import jwt from 'jsonwebtoken'; //to verify token set during login
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';  
import logger from 'morgan'; 
import bodyParser from  'body-parser'; 
import cookieParser from  'cookie-parser'; 
import http from 'http';

var ProductRoute = require('./app/routes/product');

let app = express();


// =================================================================
// configuration ===================================================
// =================================================================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable



// use morgan to log requests to the console
app.use(morgan('dev'));
//parse application/json and look for raw text  
// use body parser so we can get info from POST and/or URL parameters                                      
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  


// view engine setup
 app.use(express.static(path.join(__dirname, 'UI')));

 app.use("/styles",  express.static(__dirname + 'UI/css/'));
 app.use("/scripts", express.static(__dirname + 'UI/js/'));
 app.use("/images",  express.static(__dirname + 'UI/images/'));




// =================================================================
// test the build up user routes ==========================================================
// =================================================================
app.get('/seeduser', function(req, res) {

	// create a sample user
	var nick = new User({ 
		name: 'Victor', 
		password: 'saladin',
		admin: true 
	});
	nick.save(function(err) {
		if (err) throw err;

		console.log('User saved successfully');
		res.json({ success: true });
	});
});



// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router(); 

// ---------------------------------------------------------
// authentication (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------
// http://localhost:8080/api/v1/authenticate
apiRoutes.post('/authenticate', function(req, res) {

	// find the user
	User.findOne({
		name: req.body.name
	}, function(err, user) {

		if (err) throw err;

		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {

			// check if password matches
			if (user.password != req.body.password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} else {

				// if user is found and password is right
				// create a token
				var payload = {
					admin: user.admin	
				}
				var token = jwt.sign(payload, app.get('superSecret'), {
					expiresIn: 86400 // expires in 24 hours
				});

				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}		

		}

	});
});

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
apiRoutes.use(function(req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];

	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {			
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });		
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;	
				next();
			}
		});

	} else {

		// if there is no token
		// return an error
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});
		
	}
	
});

// ---------------------------------------------------------
// authenticated routes
// ---------------------------------------------------------
apiRoutes.get('/', function(req, res) {
	res.json({ message: 'Welcome to the coolest API on earth!' });
});

apiRoutes.get('/users', function(req, res) {
	User.find({}, function(err, users) {
		res.json(users);
	});
});

apiRoutes.get('/check', function(req, res) {
	res.json(req.decoded);
});

app.use('/api/v1/', apiRoutes);

apiRoutes.route("/products")
	.get(ProductRoute.getProducts)
	.post(ProductRoute.postProduct);
apiRoutes.route("/products/:id")
	.get(ProductRoute.getProduct)
	.delete(ProductRoute.deleteProduct)
	.put(ProductRoute.updateProduct);
// =================================================================
// front end routes for user==========================================================
// =================================================================

app.get('/', function(req, res) {
    res.sendFile(path.join(`${__dirname}/UI/index.html`));
});


app.get('/login', function(req, res) {
    res.sendFile(path.join(`${__dirname}/UI/login.html`));
});

app.get('/register', function(req, res) {
    res.sendFile(path.join(`${__dirname}/UI/register.html`));
});

app.get('/testing', function(req, res) {
	Product.find({}, function(err, users) {
			res.json(users);
		});

});


app.get('/testuser', function(req, res) {
	User.find({}, function(err, users) {
			res.json(users);
		});

});
// =================================================================
// start the server ================================================
// =================================================================

app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing
