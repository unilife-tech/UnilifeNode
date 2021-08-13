var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedbackSchema = new Schema({
    
    
    user_id : {
        type : String,
        required : true

    },
    rating : {
        type : String,
        required : true
    },
    feedback : {
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
    
    }, { collection: 'feedback' });
    
module.exports = mongoose.model('Feedback', feedbackSchema);
  