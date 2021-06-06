Article = require('../models/articlesModel');
//For index
exports.index = function (req, res) {
    Article.get(function (err, article) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Got article Successfully!",
            data: article
        });
    });
};
//For creating new article
exports.add = function (req, res) {
    var article = new Article();
    article.name = req.body.name;
    article.description=req.body.description;
    article.price=req.body.price;
    article.date_of_post=req.body.date_of_post;
    article.user_id=req.body.user_id;
//Save and check error
article.save(function (err) {
    if (err)
        res.json(err);
res.json({
        message: "New User Added!",
        data: article
    });
});
};
// View article
exports.view = function (req, res) {
    Article.findById(req.params.article_id, function (err, article) {
        if (err)
            res.send(err);
        res.json({
            message: 'article Details',
            data: article
        });
    });
};
