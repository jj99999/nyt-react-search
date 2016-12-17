// server dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

//require Article schema
var Article = require('./models/History.js');

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
mongoose.connect('');
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
app.get('/api/', function(req, res) {

  // We will find all the records, sort it in descending order, then limit the records to 5
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
app.post('/api/', function(req, res){
  var newSearch = new Saved(req.body);
  console.log("BODY: " + req.body.location);

  // save the article result based on JSON input
  // use Date.now() to always get the current date time
  Saved.create({"location": req.body.location, "date": Date.now()}, function(err){
    if(err){
      console.log(err);
    }
    else {
      res.send("Saved Search");
    }
  })
});


// -------------------------------------------------

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
