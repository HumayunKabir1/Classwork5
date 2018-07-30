var http = require('http');
var express = require ('express');
var app= express();
var bodyParser = require('body-parser');
//var mongo =require ('mongodb');
//var db,uri="mongodb://localhost:27017";
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/node-cw8');
var db,uri="mongodb://"+process.env.IP+":27017";
mongoose.connection.on('error', function(){
  console.log('Could not connect to mongodb');
});
var userSchema=new mongoose.Schema({
  name: {
    type: String,
    require: "Name is required"
  },
    email:String
});
var User=mongoose.model('User', userSchema);

/*mongo.MongoClient.connect(uri,
{useNewUrlParser:true},
function(err,client){
  if(err){
    console.log('Could not connect to mongodb');
  }else{
    db=client.db('node-cw8');
  }

});*/


/*var save =function(email_data){
  db.createCollection('users', function(err,collection){});
  var collection=db.collection('users');
  collection.save(email_data);
};*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
var server =http.Server(app);

app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html');
});
app.get('/about', function(req,res){
  res.sendFile(__dirname+'/about.html');
});
app.get('/email',function(req,res){
  res.sendFile(__dirname+'/email.html');
});
app.post('/submit_user',function(req,res){
  console.log(req.body);
  var new_user =new User(req.body);
  new_user.save(function(err,data){
    if(err){
      return res.status(400)
      .json({messege:"Couldn't save user"});
    }
     res.status(200).json(data);
  });
});

  server.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server running');
  });