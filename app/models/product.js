var mongoose = require("mongoose");




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