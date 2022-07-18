var mongoose = require('mongoose');

var TodoTaskSchema = mongoose.Schema({
  Title: String,
  Description: String,
  Priority: Number,
  Status: Number,
  ExpectedCompletion: Date
});

var TodoTaskModel = mongoose.model("TodoTaskModel",TodoTaskSchema);

module.exports = TodoTaskModel;