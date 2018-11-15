var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// set up a mongoose model
module.exports = mongoose.model('Product', new Schema({ 
 name: {
       type: String,
       required: true
   },
   sellingPrice: {
       type: Number,
       required: true
   },
   openingStock:{
       type: Number,
       required: true
   }
}));