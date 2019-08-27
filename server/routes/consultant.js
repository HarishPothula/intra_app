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

router.post("/postConsultantInfo", function (req, res) {
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

router.get('/getConsultantsInfo', function (req, res) {
  let sql = `SELECT * FROM consultant_data`;
  connection.query(sql, (error, results, fields) => {
    res.send(results);
    return res;
    if (error) {
      return console.error(error.message);
    }
  });
});

router.post('/consultantById', function (req, res) {
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
router.post('/updateConsultantById', function (req, res) {
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

router.post('/deleteConsultantRecord', function (req, res) {
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
module.exports = router;
