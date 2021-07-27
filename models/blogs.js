var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogsSchema = new Schema({
    
    categories_id : {
        type: String,
        required : true
    },
    title: {
        type: String,
        required: true
    },
    description : {
        type : String,
        required : false

    },
    image : {
        type : String,
        required : false

    },
    shared_by : {
        type : String,
        required : false
       

    },
    writer_image : {
        type : String,
        required : false
        

    },
    video_link : {
        type : String,
        required : false

    },
    slider : {
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
    
    }, { collection: 'blogs' });
    
module.exports = mongoose.model('Blogs', blogsSchema);
  