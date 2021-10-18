var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var post_optionSchema = new Schema({
    
    post_id : {
        type: String,
        required : true
    },
    option_id: {
        type: String,
        required: true
    },
    user_id : {
        type : String,
        required : true

    }
    
    }, { collection: 'post_options_select_by_user' });
    
module.exports = mongoose.model('Post_options_select_by_user', post_optionSchema);
  