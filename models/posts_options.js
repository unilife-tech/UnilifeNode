var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postoptionsSchema = new Schema({
    
   
    post_id: {
      type: String,
      required: true
    },    
    
    user_id: {
      type: String,
      required: true
      
    },
    options: {
      type: String,
      required: false
    }


  }, { collection: 'posts_options' });
  
  module.exports = mongoose.model('Post_options', postoptionsSchema);
  
