var express = require('express');
var app = express();
var path = require('path');
var mongo = require('mongodb').MongoClient;

 app.get('/urlshortener', function(req, res) {
     res.sendFile('/home/ubuntu/workspace/urlshortener/hello.html');
 });

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'templates'));

app.get('/urlshortener/:url(*)', function (req, res) {
   //var url = req.params.data;
   var url = req.params.url;
  
  mongo.connect('mongodb://localhost:27017/URLs', function(err, db) {
      if (err) throw err;
      if (db) {
          if (url.substring(0,8) == "https://" || url.substring(0,7) == "http://")
          {db.collection("url").count({}, 
          function(err, count){if (err) throw err;
          var shortUrl = "https://api-developments-ruja.c9users.io/urlshortener/" + (count + 1);
          var toAdd = {"original_url": url, 
          "short_url": shortUrl};
          res.send(JSON.stringify(toAdd));
          db.collection("url").insert(toAdd);
              
          });
         
      }
      else {db.collection("url").count({"short_url" : "https://api-developments-ruja.c9users.io/urlshortener/" + url}, function(err, count) {
      if (err) throw err;
      if (count == 0) {res.send("There is no such url, I'm afraid...")}
      else {db.collection("url").find(
          {"short_url" : "https://api-developments-ruja.c9users.io/urlshortener/" + url}).forEach(
              function(data){res.redirect(data.original_url)})}
      });
          }
      }  
    }); 
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})