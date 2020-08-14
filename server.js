// Create express app
var app = require('express')(),
    bodyParser = require('body-parser');

// Parse requests
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// Configure the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Simple backend test route
app.get('/', (req, res) => {
    res.json({"message": "Working"});
});

// Require routes
require('./app/routes/routes.js')(app);

// Listen for requests on Port 8000
app.listen(Number(process.env.PORT || 8000), () => {
    console.log("Server is listening on port 8000");
});