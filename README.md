"# salesmgtapp" 

Node Token Authentication
This repo uses JSON Web Tokens and the jsonwebtoken package to implement token based authentication on a simple Node.js API.

This is a starting point to demonstrate the method of authentication by verifying a token using Express route middleware.

Requirements
node and npm
Usage

Install dependencies: npm install
Change SECRET in config.js
Add your own MongoDB database to config.js
Start the server: node server.js
Create sample user by visiting: http://localhost:3000/seeduser
Once everything is set up, we can begin to use our app by creating and verifying tokens.

Getting a Token
Send a POST request to http://localhost:8080/api/authenticate with test user parameters as x-www-form-urlencoded.

  {
    name: 'Aboki',
    password: 'shinemyshoe'
  }
Verifying a Token and Listing Users
Send a GET request to http://localhost:8080/api/users with a header parameter of x-access-token and the token.

You can also send the token as a URL parameter: http://localhost:3000/api/users?token=YOUR_TOKEN_HERE

Or you can send the token as a POST parameter of token.
