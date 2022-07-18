const express = require('express');
const router = express.Router();
const cors = require('cors');

const TodoTaskModel = require('../models/TodoTask.Model');

router.get('/gettodotasks', function(req, res, next) {
  TodoTaskModel.find({Status: 0},(err,tasks) => {
    if(err){
      res.send(err);
    }else{
      res.send(tasks);
    }
  })
});
router.get('/getinprogresstasks', function(req, res, next) {
  TodoTaskModel.find({Status: 1},(err,tasks) => {
    if(err){
      res.send(err);
    }else{
      res.send(tasks);
    }
  })
});
router.get('/getmarkedforreviewtasks', function(req, res, next) {
  TodoTaskModel.find({Status: 2},(err,tasks) => {
    if(err){
      res.send(err);
    }else{
      res.send(tasks);
    }
  })
});
router.get('/getdonetasks', function(req, res, next) {
  TodoTaskModel.find({Status: 3},(err,tasks) => {
    if(err){
      res.send(err);
    }else{
      res.send(tasks);
    }
  })
});

router.post('/updatetask',cors(),(req,res,next) => {
  let todoTask = new TodoTaskModel({
    Title: req.body.Title,
    Description: req.body.Description,
    ExpectedCompletion: req.body.ExpectedCompletion,
    Priority: req.body.Priority,
    Status: req.body.Status
  });
  //TodoTaskModel.replaceOne({_id:req.body._id},todoTask)
  TodoTaskModel.findByIdAndUpdate(req.body._id,todoTask)
  .then(()=>{
    res.send('Successfully Saved');
  })
  .catch((err)=>{
    res.status(400).send(err);
  })
})
router.post('/',cors(),(req,res,next)=>{
  console.log(req.body);
  let newTask = new TodoTaskModel(req.body);
  // let newTask = new TodoTaskModel({
  //   Title: req.body.Title,
  //   Description: req.body.Description,
  //   ExpectedCompletion: req.body.ExpectedCompletion,
  //   Priority: req.body.Priority,
  //   Status: req.body.Status
  // });

  newTask.save()
  .then((blog)=>{
    res.status(200).send(blog);
  }).catch((err)=>{
    res.status(400).send(err);
  })
})

router.patch('/setstatus',(req,res,next) => {
  TodoTaskModel.updateOne({_id:req.query.id},{Status: req.query.status},null,(err,result) => {
    if(err){
      res.status(400).send({error: err});
    }else{
      res.status(200).send('ok');
    }
  })
})

router.delete('/',(req,res,next) => {
  TodoTaskModel.deleteOne({_id: req.query.id}).then(()=>{
    res.status(200).send('ok');
  })
})

module.exports = router;
