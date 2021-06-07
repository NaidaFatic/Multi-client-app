let router = require('express').Router();

//Import Bio Controller
var userController = require('../controllers/userController');
// Bio routes
router.route('/user')
    .get(userController.index)
    .post(userController.add)
router.route('/user/login')
    .post(userController.login)
router.route('/user/:user_id')
    .get(userController.view)
router.route('/user/login')
    .get(userController.login)
//Export API routes
module.exports = router;
