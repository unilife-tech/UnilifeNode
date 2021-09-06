var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentsSchema = new Schema({
    
    
    user_id : {
        type : String,
        required : true
    },
    post_id : {
        type : String,
        required : true
    },
    
    comment : {
        type : String,
        required : false
    },
    created_at : {
        type : String,
        required : false
    },
    updated_at : {
        type : String,
        required : false
    }
    
    }, { collection: 'comments' });
    
module.exports = mongoose.model('Comments',commentsSchema);
  