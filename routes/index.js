var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/post',function(req,res){
  var name= req.param("name");
  var rollno= req.param("rollno");
  var math= req.param("math");
  var sci= req.param("sci");
  var eng= req.param("eng");
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect("mongodb://localhost:27017/marksDb", function(err, db) {
    if(!err) {
      console.log("We are connected");
    } else {
      console.log('Not connected');
    }
    var collection= db.collection('newdb');
    var docs= [{name:name,rollno:rollno,math:math,sci:sci,eng:eng}];
    collection.insert(docs,{W:1},function(err,result){
      if(!err){console.log("data entered");}
    });
    console.log(collection);
    res.send({status:"success"});
  });
});

router.get('/get',function(req,res){
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect("mongodb://localhost:27017/marksDb", function(err, db) {
    if(!err) {
      console.log("We are connected");
    } else {
      console.log('Not connected');
    }
    var collection= db.collection('newdb');
    collection.find().toArray(function(err,items){
      if(!err){
        console.log(items);
      }
      res.send(items);
    });
  });
  router.get('/gets',function(req,res) {
    var rno= req.param("rno");
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect("mongodb://localhost:27017/marksDb", function (err, db) {
      if (!err) {
        console.log("We are connected");
      } else {
        console.log('Not connected');
      }
      var collection = db.collection('newdb');
      collection.remove({rollno:rno},{w:1},function(err,result){
        if(!err){
          console.log("data deleted");
        }
      });


    });
  });
});
router.post('/update',function(req,res){
  var roll= req.param("roll");
  var math1= req.param("math1");
  var sci1= req.param("sci1");
  var eng1= req.param("eng1");
  console.log(roll+" "+ math1+" "+sci1+" "+eng1);
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect("mongodb://localhost:27017/marksDb", function (err, db) {
    if (!err) {
      console.log("We are connected");
    } else {
      console.log('Not connected');
    }
    var collection = db.collection('newdb');
    collection.update({rollno:roll},{$set:{math:math1,sci:sci1,eng:eng1}},function(err,result){
      if(!err){
        console.log("data updated");
      }
    });
  res.send({status:'success'});

  });
});



module.exports = router;
