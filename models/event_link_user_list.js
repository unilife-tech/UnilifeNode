var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var event_link_listSchema = new Schema({
    
   
    user_id: {
      type: String,
      required: true
    },    
    
    event_id: {
      type: String,
      required: false
      
    },
    count: {
      type: String,
      required: false
    }


  }, { collection: 'event_link_user_list' });
  
  module.exports = mongoose.model('Event_link_user_list', event_link_listSchema);
  
