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
app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});
// Launch app to the specified port
app.listen(port, function() {
    console.log("Running on Port "+ port);
})
//Import routes
let usersRoutes = require("./api/routes/users.js")
let articlesRoutes = require("./api/routes/articles.js")
//Use API routes in the App
app.use('/api/users', usersRoutes)
app.use('/api/articles', articlesRoutes)
//import mongoose
let mongoose = require('mongoose');

//connect to mongoose
const dbPath = 'mongodb+srv://naida:naida@test.4wxap.mongodb.net/multi-client?retryWrites=true&w=majority';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);
mongo.then(() => {
    console.log('Mongodb connected');
}, error => {
    console.log(error, 'error');
})
