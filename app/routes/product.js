let mongoose = require('mongoose');
let Product = require('../models/product');

/*
 * GET /Product route to retrieve all the Products.
 */
function getProducts(req, res) {
	//Query the DB and if no errors, send all the Products
	let query = Product.find({});
	query.exec((err, products) => {
		if(err) res.send(err);
		//If no errors, send them back to the client
		res.json(products);
	});
}

/*
 * POST /Product to save a new Product.
 */
function postProduct(req, res) {
	//Creates a new Product
	var newProduct = new Product(req.body);
	//Save it into the DB.
	newProduct.save((err,product) => {
		if(err) {
			res.send(err);
		}
		else { //If no errors, send it back to the client
			res.json({message: "Product successfully added!", product });
		}
	});
}

/*
 * GET /Product/:id route to retrieve a Product given its id.
 */
function getProduct(req, res) {
	Product.findById(req.params.id, (err, product) => {
		if(err) res.send(err);
		//If no errors, send it back to the client
		res.json(product);
	});		
}

/*
 * DELETE /Product/:id to delete a Product given its id.
 */
function deleteProduct(req, res) {
	Product.remove({_id : req.params.id}, (err, result) => {
		res.json({ message: "Product successfully deleted!", result });
	});
}

/*
 * PUT /Product/:id to updatea a Product given its id
 */
function updateProduct(req, res) {
	Product.findById({_id: req.params.id}, (err, product) => {
		if(err) res.send(err);
		Object.assign(product, req.body).save((err, product) => {
			if(err) res.send(err);
			res.json({ message: 'Product updated!', product });
		});	
	});
}

//export all the functions
module.exports = { getProducts, postProduct, getProduct, deleteProduct, updateProduct };