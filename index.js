//index.js
//Import
let express = require('express')
let apiRoutes = require("./api/routes.js")
//Start App
let app = express();
//Assign port
var port = process.env.PORT || 8080;
// Welcome message
app.get('/', (req, res) => res.send('Welcome to Express'));
//Use API routes in the App
app.use('/api', apiRoutes)
// Launch app to the specified port
app.listen(port, function() {
    console.log("Running FirstRest on Port "+ port);
})
