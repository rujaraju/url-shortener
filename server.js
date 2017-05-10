var express = require('express');
var app = express();
var path = require('path');
var mongo = require('mongodb').MongoClient;

app.get('/urlshortener1', function (req, res) {
  res.send('/home/ubuntu/workspace/urlshortener/hello.html');
});

 app.get('/urlshortener', function(req, res) {
     res.sendFile('/home/ubuntu/workspace/urlshortener/hello.html');
 });

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'templates'));

app.get('/urlshortener/:data', function (req, res) {
   var url = req.params.data;

  
  mongo.connect('mongodb://localhost:27017/URLs', function(err, db) {
      if (err) throw err;
      if (db) {
         res.send(url + "funkar"); 
        /*var collection = db.collection("prices");
      collection.aggregate([
       {$match: {size: size}},
       {$group: {_id: "prices", average: {$avg: '$price'}}}
       ]).toArray(function(err, results){
        if (err) throw err;
        console.log(results[0].average.toFixed(2));
        db.close();
       });
      
      */}  
    }) 
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})