var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var brand_bannerSchema = new Schema({
    
    
    image : {
        type : String,
        required : false

    },
    status : {
        type : String,
        required : false
    }
    
    }, { collection: 'brand_banner' });
    
module.exports = mongoose.model('Brand_banner', brand_bannerSchema);
  