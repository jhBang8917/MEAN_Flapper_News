

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/*
 * GET /posts : post 리스트
 * POST /posts : 새로운 post
 * GET /posts/:id
 * PUT /posts/:id/upvote : upvote a post
 * POST  /posts/:id/comments
 * PUT /posts/:id/comments/upvote
 * */
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

router.get('/posts', function(req,res,next){
   Post.find(function(err, posts){
     if(err){return next(err);}

       res.json(posts);
   });
});

router.post('/posts', function(req,res,next){
   var post = new Post(req.body);

    post.save(function(err, post){
        if(err){return next(err);}

        res.json(post);
    });
});




module.exports = router;
