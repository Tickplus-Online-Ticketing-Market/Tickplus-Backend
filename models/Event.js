//sets up a schema for event

const mongoose = require("mongoose");

const Schema = mongoose.Schema;   //Destructures the Schema class from Mongoose

const eventSchema = new Schema({     //Defines a new schema for events with the following fields
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // downloadCount:{
  //   type: Number,
    
  // },
  
  // requestCount:{
  //   type: Number,
    
  // },
});

module.exports = mongoose.model("Event", eventSchema);
