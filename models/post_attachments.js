var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postattachSchema = new Schema({
    
   
    post_id: {
      type: String,
      required: true
    },    
    
    attachment_type: {
      type: String,
      required: false
      
    },
    attachment: {
      type: String,
      required: false
    },
    created_at: {
        type: String,
        required: false
      },
      updated_at: {
        type: String,
        required: false
      }


  }, { collection: 'post_attachments' });
  
  module.exports = mongoose.model('Post_attachment', postattachSchema);
  
