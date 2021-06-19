let router = require('express').Router();

//Import Bio Controller
var articleController = require('../controllers/articlesContorllers');

// Bio routes
router.route('/')
.get(articleController.index)
.post(articleController.add)

router.route('/:article_id')
.get(articleController.view)

router.route('/individual/:user_id')
.get(articleController.getUserSpecificArticle)

//Export API routes
module.exports = router;
