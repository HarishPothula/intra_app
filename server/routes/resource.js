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
router.post("/postresourceInfo", function (req, res) {
  const info = req.body;
  var stringObj = JSON.stringify(info);
  let stmt = `INSERT INTO resource_data(record_id, resp_data)  VALUES ?  `;
  console.log('info.record_id', info.resourceId, req.body);
  let todos = [[info.resourceId, stringObj]];
  connection.query(stmt, [todos], (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    } else {
      res.end();
      console.log('Row inserted:' + results.affectedRows);
    }
  });
});

router.get('/getResourceInfo', function (req, res) {
  let sql = `SELECT * FROM resource_data`;
  connection.query(sql, (error, results, fields) => {
    res.send(results);
    return res;
    if (error) {
      return console.error(error.message);
    }
  });
});
router.post('/updateResourceById', function (req, res) {
  console.log(req.body.record_id);
  var stringObj = JSON.stringify(req.body.data$);
  // const stmt = 'UPDATE resource_data SET resp_data = ? WHERE record_id = ?' ? 'UPDATE resource_data SET resp_data = ? WHERE record_id = ?': 'INSERT INTO resource_data(record_id, resp_data)  VALUES ?';
  connection.query('UPDATE resource_data SET resp_data = ? WHERE record_id = ?', [stringObj,req.body.record_id], (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    } else {
      res.send(results);
      res.end();
      console.log('Deleted Row(s):', results.affectedRows);
    }
  });
});
router.post('/resourceAuditById', function (req, res) {
  let sql = `SELECT * FROM resource_audit WHERE record_id = ?`;
  connection.query(sql, req.body.record_id, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    } else {
      res.send(results);
      res.end();
      console.log('Resource Row(s):', results.affectedRows);
    }
  });
});

router.post('/deleteResourceRecord', function (req, res) {
  let sql = `DELETE FROM resource_data WHERE record_id = ?`;
  connection.query(sql, req.body.record_id, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    } else {
      res.end();
      console.log('Deleted Row(s):', results.affectedRows);
    }
  });
});
router.post('/resourcetById', function (req, res) {
  let sql = `SELECT * FROM resource_data WHERE record_id = ?`;
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
module.exports = router;
