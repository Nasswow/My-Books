const mongoose = require("mongoose");

//rticle Schema
let bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});
let Book = (module.exports = mongoose.model("Book", bookSchema));
