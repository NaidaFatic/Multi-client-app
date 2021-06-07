let router = require('express').Router();

//Import Bio Controller
var articleController = require('../controllers/articlesContorllers');
// Bio routes
router.route('/article')
    .get(articleController.index)
    .post(articleController.add);
router.route('/article/:article_id')
    .get(articleController.view)
router.route('/article/individual/:user_id')
    .get(articleController.getUserSpecificPosts)
//Export API routes
module.exports = router;
