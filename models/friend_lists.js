var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var friend_listsSchema = new Schema({
    
   
    friend_id: {
      type: String,
      required: true
    },    
    user_id: {
      type: String,
      required: true
    },
   created_at: {
      type: String,
      required: false
      
    },
    updated_at: {
      type: String,
      required: false
    }

  }, { collection: 'friend_lists' });
  
  module.exports = mongoose.model('Friend_lists', friend_listsSchema);
  
