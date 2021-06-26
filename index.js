require('dotenv').config()
let express = require('express')
let app = express();

const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const collection = process.env.DB_COLLECTION;

//import body parser
let bodyParser = require('body-parser');
var port = process.env.PORT || 8080;
var cors = require('cors')

app.use(cors())

var corsOptions = {
  origin: 'https://multi-client-front.vercel.app/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/', cors(corsOptions), function (req, res, next) {
  res.json({msg: 'This is backend!'}) //CORS-enabled for all origins!
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})

//configure bodyparser to hande the post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
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
const dbPath = 'mongodb+srv://'+user+':'+pass+'@'+collection+'.4wxap.mongodb.net/multi-client?retryWrites=true&w=majority';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);
mongo.then(() => {
    console.log('Mongodb connected');
}, error => {
    console.log(error, 'error');
})
