
var express = require('express');
var app = express();


var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  


app.use(express.static('public'));


app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


unixRegex = /^\d+$/

app.get("/api/timestamp/:date", 
(req, res) => {
  if (req.params.date.match(unixRegex)) {
    unix = Number(req.params.date)
    date = new Date(unix);
    utc = date.toUTCString();
    res.json({unix: unix, utc: utc})
  } else if ((new Date(req.params.date))!='Invalid Date') {
    date = new Date(req.params.date);
    utc = date.toUTCString();
    unix = date.getTime();
    res.json({unix: unix, utc: utc})
  } else res.json({ error : "Invalid Date" })
})

app.get("/api/timestamp/", 
  (req, res) => {
    date = new Date(Date.now());
    console.log(date)
    unix = date.getTime();
    utc = date.toUTCString();
    res.json({unix: unix, utc: utc})
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
