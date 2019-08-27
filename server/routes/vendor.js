var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: 'hari1234',
  database: 'intraedge'
});

connection.connect(function (err) {
  if (!err) {
    console.log("Database is connected ... nn");
  } else {
    console.log("Error connecting database ... nn");
  }
});
router.post("/postVendorInfo", function (req, res) {
  const info = req.body;
  let stmt = `INSERT INTO vendor(vendorName,contactPerson,contact,email,region,scopeOfServices,newSubmittal,address,createdBy,createdOn,updatedBy,updatedOn)  VALUES ?  `;
  let todos = [
    [info.vendorName, info.contactPerson, info.contact, info.email, info.region.name, info.scopeOfServices, info.newSubmittal.value, info.address, info.createdBy, info.createdOn, info.updatedBy, info.updatedOn],
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

router.get('/getVendorInfo', function (req, res) {
  let sql = `SELECT * FROM vendor`;
  connection.query(sql, (error, results, fields) => {
    res.send(results);
    return res;
    if (error) {
      return console.error(error.message);
    }
  });
});

router.post('/deleteVendorRecord', function (req, res) {
  let sql = `DELETE FROM vendor WHERE vendorName = ?`;
  connection.query(sql, req.body.vendorName, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    } else {
      res.end();
      console.log('Deleted Row(s):', results.affectedRows);
    }
  });
});
router.post('/vendorById', function (req, res) {
  let sql = `SELECT * FROM vendor WHERE vendorName = ?`;
  connection.query(sql, req.body.vendorName, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    } else {
      res.send(results);
      res.end();
      console.log('Vendor Row(s):', results.affectedRows);
    }
  });
});
router.post('/updatevendorById', function (req, res) {
  const info = req.body.data$;
  var post  = {vendorName: info.vendorName, contactPerson: info.contactPerson, contact: info.contact, email: info.email, region: info.region.name, scopeOfServices: info.scopeOfServices,
    newSubmittal: info.newSubmittal.value, address: info.address, createdBy: info.createdOn,
    createdOn: info.createdBy, updatedBy: info.updatedBy, updatedOn: info.updatedOn};
  var condition = {vendorName: info.vendorName};
  connection.query('UPDATE vendor SET ? WHERE ?', [post, condition] , (error, results, fields) => {
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
module.exports = router;
