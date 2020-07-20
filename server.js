let express = require('express');
let app = express();
let port = 3000;
let bodyParser = require('body-parser');
let cors = require('cors');

const quotes = [
  'one',
  'two',
  'three',
  'four',
  'five'
];

//Utility Function to return a random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

//our server is delivering our client side content,
// no need for live-server
app.use(express.static('client'));

//allow CORS requests
//because of the express.static usage, 
//we no longer need this
// app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.redirect('/quote'); //status defaults to 302(Found)
})

app.get('/quote', (req, res, next) => {
  res.send(quotes[getRandomInt(0, quotes.length)]);
})

app.post('/quote', (req, res, next) => {
  //incoming request should include a quote key
  quotes.push(req.body.quote) // this step wasn't in the node mini sprint
  res.send(req.body.quote);
})
//catch all route
app.use((req, res, next) => {
  res.status(404).send("That's not a thing I can give you");
})


app.listen(port,() => {
  console.log(`listening on port ${port}`);
  
})