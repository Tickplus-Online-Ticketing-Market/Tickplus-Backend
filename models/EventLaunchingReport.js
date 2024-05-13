const mongoose = require("mongoose");

const Schema = mongoose.Schema;   //Destructures the Schema class from Mongoose


const reportSchema = new Schema({     //Defines a new schema for report with the following fields
    user_id: {
      type: String,
      required: true,
    },
    temp_count: {
      type: Number,
      required: true,
    },
    req_count: {
      type: Number,
      required: true,
    },
    
  });
  
  module.exports = mongoose.model("Report", reportSchema);
  