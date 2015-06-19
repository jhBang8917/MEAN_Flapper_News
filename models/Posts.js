/**
 * Created by jhbang on 2015. 6. 15..
 */

var mongoose = require('mongoose');


var PostSchema = new mongoose.Schema({
    title : String,
    link : String,
    upvotes : {type: Number, default:0},
    comments:[{type:mongoose.Schema.Types.ObjectId, ref : 'Comment'}]
});

mongoose.model('Post', PostSchema); // post 모델 define