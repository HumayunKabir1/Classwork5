var http = require('http');
var express = require ('express');
var app= express();
var bodyParser = require('body-parser');
var mongo =require ('mongodb');
//var db,uri="mongodb://localhost:27017";
var db,uri="mongodb://"+process.env.IP+"27017";
mongo.MongoClient.connect(uri,
{useNewUrlParser:true},
function(err,client){
  if(err){
    console.log('Could not connect to mongodb');
  }else{
    db=client.db('node-cw8');
  }

});
var save =function(email_data){
  db.createCollection('users', function(err,collection){});
  var collection=db.collection('users');
  collection.save(email_data);
}
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
  save(req.body);
  res.state(200);
});

  server.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server running');
  });