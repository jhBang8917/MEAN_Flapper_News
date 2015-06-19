/**
 * Created by jhbang on 2015. 6. 15..
 */

var mongoose = require('mongoose');


var CommentSchema = new mongoose.Schema({
    title : String,
    link : String,
    upvotes : {type: Number, default:0},
    Post :[{type:mongoose.Schema.Types.ObjectId, ref : 'Post'}]
});

mongoose.model('Comment', CommentSchema); // post 모델 define