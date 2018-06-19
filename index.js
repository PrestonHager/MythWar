const fs = require('fs')
const express = require('express')
const http = require('http')
const enforce = require('express-sslify')
const path = require('path')
const aws = require('aws-sdk')
const PORT = process.env.PORT || 5000

var match_requests = []
// get the profiles database from aws.
aws.config.update({
  region: 'us-west-2'
})
var dynamodb = new aws.DynamoDB.DocumentClient();
var defaultCards = JSON.parse(fs.readFileSync('defaultCards.json', 'utf-8'))

var app = express()
app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/login', (req, res) => res.render('pages/login'))
  .get('/dashboard', (req, res) => res.render('pages/dashboard'))
  .get('/play', (req, res) => res.render('pages/play'))
  .get('/signup', (req, res) => res.render('pages/signup'))
  .get('/logout', (req, res) => res.render('pages/logout'))

app.use(express.urlencoded())
app.use(express.json())
app.post('/dashboard', function(req, res) {
  var profile = JSON.parse(req.body.profile)
  dynamodb.get({TableName: "BattleCorpProfiles", Key: {"id": profile.id}}, function(err, data){
    if (err) {
      console.log("Creating profile because, it was not found for id: " + profile.id)
      var item = {
        "id": profile.id,
        "name": profile.name,
        "email": profile.email,
        "level": 1,
        "rank": 1,
        "cards": defaultCards
      }
      dynamodb.query({TableName: "BattleCorpProfiles", Item: item}, function(err, data){
        if (err) {
          console.error("Failed to create profile item with error: " + JSON.stringify(err, null, 2))
        }
      })
    } else {
      console.log("Found the profile with id: " + profile.id)
    }
  });
  res.render('pages/dashboard')
})
app.post('/play', function(req, res) {
  var id = req.body.id
  var cmd = req.body.command
  var json_res = {}
  if (cmd == "match") {
    match_requests.push({id: id, level: profiles[id].level})
  }
  res.render('pages/json_response', {json_res: json_res})
});

app.use(enforce.HTTPS({ trustProtoHeader: true }))

http.createServer(app).listen(PORT, function() {
    console.log('Express server listening on port ' + PORT);
})
