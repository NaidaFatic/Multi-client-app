let express = require('express')
let app = express();
//import body parser
let bodyParser = require('body-parser');
var port = process.env.PORT || 8080;
//configure bodyparser to hande the post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Welcome message
app.get('/', (req, res) => res.send('Welcome to Express'));
// Launch app to the specified port
app.listen(port, function() {
    console.log("Running FirstRest on Port "+ port);
})
//Import routes
let apiRoutes = require("./api/routes/routes.js")
let usersRoutes = require("./api/routes/users.js")
let articlesRoutes = require("./api/routes/articles.js")
//Use API routes in the App
app.use('/test', apiRoutes) 
app.use('/api/users', usersRoutes)
app.use('/api/articles', articlesRoutes)
//import mongoose
let mongoose = require('mongoose');

//connect to mongoose
const dbPath = 'mongodb://127.0.0.1:27017/multi-client';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);
mongo.then(() => {
    console.log('connected');
}, error => {
    console.log(error, 'error');
})
