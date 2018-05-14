// using express to handle routes
const express = require('express');
const app = express();

// using body-parser to read post requests
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})

// using bcrypt to hash and salt sensitive info

// set up a mock database we write to
let database = [];

// signup route - add user to our "database"
app.post('/signup', (req,res) => {
    console.log(req.body);
})

app.listen(8080, () => {
    console.log('server up on 8080');
})