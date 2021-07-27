var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categoriesSchema = new Schema({
    
   
    image: {
      type: String,
      required: false
    },    
    
    name: {
      type: String,
      required: true
      
    },
    status: {
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


  }, { collection: 'categories' });
  
  module.exports = mongoose.model('Categories', categoriesSchema);
  
