import jwt from 'jsonwebtoken'; //to verify token set during login
import express from 'express';


import path from 'path';  
import logger from 'morgan'; 
import bodyParser from  'body-parser'; 
import cookieParser from  'cookie-parser'; 
import http from 'http';
var app = express();


// view engine setup
 app.use(express.static(path.join(__dirname, 'public/views')));
 app.use("/styles",  express.static(__dirname + '/public/css/'));
 app.use("/scripts", express.static(__dirname + '/public/js/'));
 app.use("/images",  express.static(__dirname + '/public/images/'));




 app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  

app.get("/", (req, res) => res.json({message: "Welcome to our shop!"}));

app.route("/book")
	.get(book.getBooks)
	.post(book.postBook);
app.route("/book/:id")
	.get(book.getBook)
	.delete(book.deleteBook)
	.put(book.updateBook);


// *** server config *** //process.env.PORT , process.env.IP,
var server   = http.createServer(app);
var port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log(`Node server running on http://localhost:${port}`);
});

export default app;