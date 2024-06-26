// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/', function (req, res) {
  const date = new Date();
  const unix = date.valueOf();
  const utc = date.toUTCString();
  res.json({unix, utc})
})

app.get('/api/:date', function (req, res) {
  process.env.TZ = 'Etc/UTC';
  const dateStr = req.params.date;
  let date;
  if (parseInt(dateStr).toString() == dateStr) {
    date = new Date(parseInt(dateStr));
  } else {
    date = new Date(dateStr);
  }
  const unix = date.valueOf();
  const utc = date.toUTCString();
  if (unix) res.json({unix, utc})
  else res.json({error: 'Invalid Date'})
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
