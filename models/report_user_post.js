var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reportuserSchema = new Schema({
    
   
    user_id: {
      type: String,
      required: true
    },
    report_user_id: {
        type: String,
        required: false,
        default : ""
    },
    report_post_id: {
        type: String,
        required: false,
        default : ""
    },
    type: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    created_at: {
        type: String,
        required: false
    },

    


  }, { collection: 'report_user_post' });
  
  module.exports = mongoose.model('Report_user', reportuserSchema);
  