// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const e = require('express');
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

app.get('/api', (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  });
});

app.get('/api/:timestamp', (req, res) => {
  const timestamp = req.params.timestamp;

  if (!isNaN(Number(timestamp)) && timestamp.length === 13) {
    return res.json({
      unix: Number(timestamp),
      utc: new Date(Number(timestamp)).toUTCString(),
    });
  }

  const dateObject = new Date(timestamp);
  
  if (!isNaN(dateObject.getTime())) {
    return res.json({
      unix: dateObject.getTime(),
      utc: dateObject.toUTCString(),
    });
  }

  res.json({ error: 'Invalid Date' });
});


// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + 3000);
});
