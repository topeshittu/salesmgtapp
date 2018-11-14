let mongoose = require('mongoose');
let products = require('../models/products');

/*
 * GET /api/v1/products route to retrieve all the productss.
 */
function getproducts(req, res) {
	//Query the DB and if no errors, send all the productss
	let query = products.find({});
	query.exec((err, found_products) => {
		if(err) res.send(err);
		//If no errors, send them back to the client
		res.json(found_products);
	});
}

/*
 * POST /api/v1/products to save a new product.
 */
function postproduct(req, res) {
	//Creates a new products
	var newproducts = new products(req.body);
	//Save it into the DB.
	newproducts.save((err,products) => {
		if(err) {
			res.send(err);
		}
		else { //If no errors, send it back to the client
			res.json({message: "products successfully added!", products });
		}
	});
}

/*
 * GET /api/v1/products/:id route to retrieve a products given its id.
 */
function getproduct(req, res) {
	products.findById(req.params.id, (err, products) => {
		if(err) res.send(err);
		//If no errors, send it back to the client
		res.json(products);
	});		
}

/*
 * DELETE /api/v1/products/:id to delete a products given its id.
 */
function deleteproduct(req, res) {
	products.remove({_id : req.params.id}, (err, result) => {
		res.json({ message: "products successfully deleted!", result });
	});
}

/*
 * PUT /api/v1/products/:id to updatea a products given its id
 */
function updateproduct(req, res) {
	products.findById({_id: req.params.id}, (err, products) => {
		if(err) res.send(err);
		Object.assign(products, req.body).save((err, products) => {
			if(err) res.send(err);
			res.json({ message: 'products updated!', products });
		});	
	});
}

//export all the functions
export defaults { getproducts, postproduct, getproducts, deleteproduct, updateproduct };