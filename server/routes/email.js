var express = require('express');
var router = express.Router();
const nodeMailer = require('nodemailer');
// Send an email start;
router.post("/sendemail", (req, res) => {
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
module.exports = router;
