// server dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

//require Article schema
var Saved = require('./models/saved.js');

// Create Instance of Express
var app = express();
var PORT = process.env.PORT || 3000; // set initial port

// run morgan for logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));

// -------------------------------------------------

// MongoDB Configuration configuration (Change this URL to your own DB)
mongoose.connect('mongodb://heroku_6ccb9wbd:bK3QmR74e9DG@ds049446.mlab.com:49446/heroku_6ccb9wbd');
var db = mongoose.connection;

db.on('error', function (err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function () {
  console.log('Mongoose connection successful.');
});


// -------------------------------------------------

// root route
app.get('/', function(req, res){
  res.sendFile('./public/index.html');
})

// this route will send GET request to retrieve most recent saved articles
// call this route the moment our page gets rendered
app.get('/api/saved', function(req, res) {

  // find all records, sort in descending order, limit the records to 5
  Saved.find({}).sort([['date', 'descending']]).limit(5)
    .exec(function(err, doc){

      if(err){
        console.log(err);
      }
      else {
        res.send(doc);
      }
    })
});

// this route we will send POST request to save each search
app.post('/api/saved', function(req, res){

  Saved.create({title: req.body.title, date: Date.now(), url: req.body.url}, function(err){
    if(err){
      console.log(err);
    }
    else {
      res.send("Saved article.");
    }
  })
});

app.delete('/api/saved', function(req, res){
  Saved.findByIdAndRemove(
    { _id: req.params.id }, 
    function(err, doc){
    if(err){
      console.log(err);
    }else{
      res.redirect();
    }
  })
});


// -------------------------------------------------

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
