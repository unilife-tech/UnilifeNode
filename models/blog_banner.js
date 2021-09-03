var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blog_bannerSchema = new Schema({
    
    
    image : {
        type : String,
        required : false

    },
    status : {
        type : String,
        required : false
       

    },
    created_date : {
        type : String,
        required : false

    }
    
    }, { collection: 'blog_banner' });
    
module.exports = mongoose.model('Blog_banner', blog_bannerSchema);
  