var express = require('express');
var path = require('path');
var cors = require('cors');
var taskRouter = require('./routes/TodoTask');
var app = express();
var mongoose = require('mongoose');
var properties = require('./properties');

mongoose.connect(properties.DB_URL);
mongoose.connection.on("connected",()=>{
  console.log("connected to mongodb");
})

//app.use(express.urlencoded());
app.use(cors());
app.use(express.json());
app.use('/api/taskservice', taskRouter);

module.exports = app;
