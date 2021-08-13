var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var brandsSchema = new Schema({
    
    categories_id : {
        type: String,
        required : true
    },
    brand_name: {
        type: String,
        required: true
    },
    image : {
        type : String,
        required : false

    },
    type : {
        type : String,
        required : false,
        default : "online"

    },
    description : {
        type : String,
        required : false
       

    },
    facebook : {
        type : String,
        required : false
       

    },
    instagram : {
        type : String,
        required : false

    },
    twitter : {
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
    
    }, { collection: 'brands' });
    
module.exports = mongoose.model('Brands', brandsSchema);
  