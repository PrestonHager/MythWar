const express = require('express')
const http = require('http')
const enforce = require('express-sslify')
const path = require('path')
const PORT = process.env.PORT || 5000

var app = express()
app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/login', (req, res) => res.render('pages/login'))
  .get('/dashboard', (req, res) => res.render('pages/dashboard'))
  .get('/play', (req, res) => res.render('pages/play'))
  .get('/signup', (req, res) => res.render('pages/signup'))

app.use(enforce.HTTPS({ trustProtoHeader: true }))

http.createServer(app).listen(PORT, function() {
    console.log('Express server listening on port ' + PORT);
})
