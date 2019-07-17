const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');
const cors = require('cors');
const multer = require('multer');
const router = express.Router();
// const api = require('./server/routes/api');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: 'hari1234',
  database: 'intraedge'
});
const corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
};
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'dist')));

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

// Send an email start;
app.post("/sendemail", cors(), (req, res) => {
  let transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'write2phreddy@gmail.com',
      pass: '*****'
    },
    secure: false,
    tls: {rejectUnauthorized: false},
  });

  var attachment = (typeof req.body.attachment != "undefined") ? req.body.attachment : '';
  var mailOptions = {
    from: "write2phreddy@gmail.com",
    to: "write2phreddy@gmail.com",
    subject: req.body.subject,
    html: '<p> Hello,</p> \n' +
      req.body.firstName + req.body.lastName + '<p>has accepted the offer, please start his/her onboarding process on priority. </p> \n' +
      '<p>His/ Her details are as follows.</p> \n' + '<p>' + '<b>First Name: </b>' + req.body.firstName + '</p>' +
      '<p>' + '<b>Last Name: </b>' + req.body.lastName + '</p>' +
      '<p>' + '<b>Date Of Birth: </b>' + req.body.dob + '</p>' +
      '<p>' + '<b>SSN: </b>' + req.body.ssn + '</p>' +
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
// Send an email end;

// DB connectivity start;
connection.connect(function (err) {
  if (!err) {
    console.log("Database is connected ... nn");
  } else {
    console.log("Error connecting database ... nn");
  }
});
// DB connectivity End;

// Start Vendors Service calls;
app.post("/postVendorInfo", function (req, res) {
  const info = req.body;
  let stmt = `INSERT INTO vendor(vendorName,contactPerson,contact,email,region,scopeOfServices,newSubmittal,street,city,state,zip,record_id,createdBy,createdOn,updatedBy,updatedOn)  VALUES ?  `;
  let todos = [
    [info.vendorName, info.contactPerson, info.contact, info.email, info.region.name, info.scopeOfServices, info.newSubmittal.value, info.street, info.city, info.state.name, info.zip, info.record_id, info.createdBy, info.createdOn, info.updatedBy, info.updatedOn],
  ];
  connection.query(stmt, [todos], (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    } else {
      res.end();
      console.log('Row inserted:' + results.affectedRows);
    }
  });
});

app.get('/getVendorInfo', function (req, res) {
  let sql = `SELECT * FROM vendor`;
  connection.query(sql, (error, results, fields) => {
    res.send(results);
    return res;
    if (error) {
      return console.error(error.message);
    }
  });
});

app.post('/deleteVendorRecord', function (req, res) {
  let sql = `DELETE FROM vendor WHERE record_id = ?`;
  connection.query(sql, req.body.record_id, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    } else {
      res.end();
      console.log('Deleted Row(s):', results.affectedRows);
    }
  });
});
app.post('/vendorById', function (req, res) {
  let sql = `SELECT * FROM vendor WHERE record_id = ?`;
  connection.query(sql, req.body.record_id, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    } else {
      res.send(results);
      res.end();
      console.log('Vendor Row(s):', results.affectedRows);
    }
  });
});
app.post('/updatevendorById', function (req, res) {
  let sql = `UPDATE vendor SET address = 'Canyon 123' WHERE address = 'Valley 345'`;
  connection.query(sql, req.body.record_id, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    } else {
      res.send(results);
      res.end();
      console.log('Vendor Row(s):', results.affectedRows);
    }
  });
});
// End vendors service calls;

// File Upload Starts;
var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
  }
});
var upload = multer({ //multer settings
  storage: storage,
  fileFilter: function (req, file, callback) { //file filter
    if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
      return callback(new Error('Wrong extension type'));
    }
    callback(null, true);
  }
}).single('file');
// File upload ends;


// Consultant service calls start;

app.post("/postConsultantInfo", function (req, res) {
  // const info = req.body;
  // var stringObj = JSON.stringify(info);
  // let stmt = `INSERT INTO consultant(clientName,recruiter,accountManager,uuid,firstName,lastName,dob,ssn,phNo,email,visa,expiration,i94Date,employmentType,offerStatus,bgvstartDate,bgvendDate,drugTeststartDate,drugTestendDate,ndastartDate,ndaendDate,ads,client_email,role,sow,sowSubmittedBy,sowSubmittedOn,cafeNumber,po,poLineNumber,rate,startDate,endDate,laptopNo,employer)  VALUES ?  `;
  // let todos = [[info.clientName.name, info.recruiter.name, info.accountManager.name, info.personal.uuid, info.personal.firstName, info.personal.lastName, info.personal.dob,
  //   info.personal.ssn, info.personal.phNo, info.personal.email, info.personal.visa, info.personal.expiration, info.personal.i94date,
  //   info.internal.employmentType.name, info.internal.offerStatus.value, info.internal.bgvstartDate, info.internal.bgvendDate, info.internal.drugTeststartDate, info.internal.drugTestendDate,
  //   info.internal.ndastartDate, info.internal.ndaendDate,
  //   info.client.ads, info.client.email, info.client.role, info.client.sow.type, info.client.sowSubmittedBy.name, info.client.sowSubmittedOn, info.client.cafeNumber, info.client.po, info.client.poLineNumber,
  //   info.client.rate, info.client.startDate, info.client.endDate, info.client.laptopNo, stringObj]];
  // connection.query(stmt, [todos], (err, results, fields) => {
  //   if (err) {
  //     return console.error(err.message);
  //   } else {
  //     res.end();
  //     console.log('Row inserted:' + results.affectedRows);
  //   }
  // });
  const info = req.body;
  var stringObj = JSON.stringify(info);
  let stmt = `INSERT INTO consultant_data(record_id,data)  VALUES ?  `;
  console.log('info.record_id', info.recordId, req.body);
  let todos = [[info.recordId, stringObj]];
  connection.query(stmt, [todos], (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    } else {
      res.end();
      console.log('Row inserted:' + results.affectedRows);
    }
  });
});

app.get('/getConsultantsInfo', function (req, res) {
  let sql = `SELECT * FROM consultant_data`;
  connection.query(sql, (error, results, fields) => {
    res.send(results);
    return res;
    if (error) {
      return console.error(error.message);
    }
  });
});

app.post('/consultantById', function (req, res) {
  let sql = `SELECT * FROM consultant_data WHERE record_id = ?`;
  connection.query(sql, req.body.record_id, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    } else {
      res.send(results);
      res.end();
      console.log('Vendor Row(s):', results.affectedRows);
    }
  });
});
app.post('/updateConsultantById', function (req, res) {
  var stringObj = JSON.stringify(req.body.data$);
  connection.query('UPDATE consultant_data SET data = ? WHERE record_id = ?', [stringObj,req.body.record_id], (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    } else {
      res.send(results);
      res.end();
      console.log('Deleted Row(s):', results.affectedRows);
    }
  });
});

app.post('/deleteConsultantRecord', function (req, res) {
  let sql = `DELETE FROM consultant_data WHERE record_id = ?`;
  connection.query(sql, req.body.record_id, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    } else {
      res.end();
      console.log('Deleted Row(s):', results.affectedRows);
    }
  });
});
//Consultant service calls end;
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
