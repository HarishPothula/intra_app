const express    = require('express');
const path       = require('path');
const http       = require('http');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');
const cors = require('cors');
const multer = require('multer');
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
// const api = require('./server/routes/api');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));


// app.use('/api', api);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
app.post("/sendemail", cors(), (req, res) => {
  let transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'write2phreddy@gmail.com',
      pass: 'Harish@276'
    },
    secure:false,
    tls: {rejectUnauthorized: false},
  });

  var attachment = (typeof req.body.attachment != "undefined") ? req.body.attachment : '';
  var mailOptions = {
    from: "write2phreddy@gmail.com",
    to: "write2phreddy@gmail.com",
    subject: req.body.subject,
    html:  '<p> Hello,</p> \n' +
    req.body.firstName + req.body.lastName + '<p>has accepted the offer, please start his/her onboarding process on priority. </p> \n' +
    '<p>His/ Her details are as follows.</p> \n' + '<p>' + '<b>First Name: </b>' +  req.body.firstName + '</p>' +
      '<p>' + '<b>Last Name: </b>' + req.body.lastName + '</p>' +
      '<p>' + '<b>Date Of Birth: </b>' + req.body.dob + '</p>'  +
      '<p>' + '<b>SSN: </b>' + req.body.ssn + '</p>'  +
      '<p>' + '<b>Work Authorization Type: </b>' + req.body.visa + '</p>' +
    '<p>Thanks,</p>',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.json({status: 'error', res: error});
    } else {
      res.json({status: 'error'});
    }
  });
});
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));

var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
  }
});
var upload = multer({ //multer settings
  storage: storage,
  fileFilter : function(req, file, callback) { //file filter
    if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
      return callback(new Error('Wrong extension type'));
    }
    callback(null, true);
  }
}).single('file');
/** API path that will upload the files */
app.post('/upload', function(req, res) {
  var exceltojson;
  upload(req,res,function(err){
    if(err){
      res.json({error_code:1,err_desc:err});
      return;
    }
    /** Multer gives us file info in req.file object */
    if(!req.file){
      res.json({error_code:1,err_desc:"No file passed"});
      return;
    }
    /** Check the extension of the incoming file and
     *  use the appropriate module
     */
    if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
      exceltojson = xlsxtojson;
    } else {
      exceltojson = xlstojson;
    }
    try {
      exceltojson({
        input: req.file.path,
        output: null, //since we don't need output.json
        lowerCaseHeaders:true
      }, function(err,result){
        if(err) {
          return res.json({error_code:1,err_desc:err, data: null});
        }
        res.json({error_code:0,err_desc:null, data: result});
      });
    } catch (e){
      res.json({error_code:1,err_desc:"Corupted excel file"});
    }
  })
});
app.get('/',function(req,res){
  res.sendFile(__dirname + "/index.html");
});
