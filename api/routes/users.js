let router = require('express').Router();

//Import Bio Controller
var userController = require('../controllers/userController');

// Bio routes
router.route('/')
.post(userController.register)
.get(userController.getAll)

router.route('/login')
.post(userController.login)

router.route('/:user_id')
.get(userController.getUser)

//Export API routes
module.exports = router;
