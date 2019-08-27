const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const email = require('./routes/email');
const vendor = require('./routes/vendor');
const consultant = require('./routes/consultant');
const resource = require('./routes/resource');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/email', email);
app.use('/vendor', vendor);
app.use('/consultant', consultant);
app.use('/resource', resource);

app.all('/!*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST", "PUT");
  next();
});

// app.use('/api', api);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
