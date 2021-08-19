var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deluserSchema = new Schema({
    
   
    user_type: {
      type: String,
      required: true
    },
    username: {
        type: String,
        required: true
      },
    profile_image: {
        type: String,
        required: true
    },
    university_school_id: {
        type: String,
   
    },
    university_school_email: {
        type: String,
        default : ""
    },
    created_at : {
        type: String,
        required: false,
        default : ""

    },
    updated_at : {
        type: String,
        required: false,
        default : ""

    }

  }, { collection: 'delete_users' });
  
  module.exports = mongoose.model('Delete_users', deluserSchema);
  