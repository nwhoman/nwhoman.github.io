// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function(req, res) {
  const newDateUTC = new Date(req.params.date);
  const newDateUnix = new Date(Number(req.params.date))
  console.log(req.params.date, newDateUTC, newDateUnix);
  if (!req.params.date) {
    res.json({unix: Date.now().valueOf(), utc: Date.now().toUTCString()})
  } else if (!isNaN(Date.parse(newDateUTC))){
    console.log("utc", newDateUnix);
    res.json({unix: newDateUTC.valueOf(), utc: newDateUTC.toUTCString()})
  } else if (!isNaN(Date.parse(newDateUnix))) {
    console.log("unix",newDateUTC);
      res.json({unix: newDateUnix.valueOf(), utc: newDateUnix.toUTCString()})
  } else {
    res.json({error : "Invalid Date" })
  }

})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
