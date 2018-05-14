// using express to handle routes
const express = require('express');
const app = express();

app.use(express.static('public'))

// using body-parser to read post requests
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

// using bcrypt to hash and salt sensitive info
const bcrypt = require('bcrypt');

// set up a mock database we write to
let database = [];

// index route
app.get('/',(req, res) => {
    console.log('index loaded');
    res.json('index');
})

// signup route - add user to our "database"
app.post('/signup', (req,res) => {;
    // destructuring req body object
    let { user, password } = req.body;
    // here, we apply salt to further randomize hash
    bcrypt.genSalt(10, (err, salt) => {
        console.log(`bcrypt is applying this salt: ${salt}`)
        if (err) {
            res.send(`error in generating salt: ${err}`);
        }
        bcrypt.hash(password, salt, (error, hash) => {
            if (error) {
                res.send(`error in hashing password: ${error}`)
            }
            database.push({user : user, password:hash});
            console.log(`New database of users:`);
            console.log(database);
            res.send('success');
        })
    })
})

// login route
app.post('/login', (req, res) => {
    let { user, password } = req.body;
    console.log('login hit', req.body)
    for (let i = 0; i < database.length; i++) {
        bcrypt.compare(password, database[i].password, (error, result) => {
            console.log(`Looping through database and comparing user ${i}`);
            if (error) {
                res.send('error comparing passwords');
            }
            if (result === true) {
                res.send('user found in db');
            }
            else {
                res.status(403).send('user not found in db');
            }
        })
    }
})

app.listen(8080, () => {
    console.log('server up on 8080');
})