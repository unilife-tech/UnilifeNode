var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blog_categoriesSchema = new Schema({
    
    
    categories_image : {
        type : String,
        required : false

    },
    categories_name : {
        type : String,
        required : false
       

    },
    status : {
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
    
    }, { collection: 'blog_categories' });
    
module.exports = mongoose.model('Blog_categories', blog_categoriesSchema);
  