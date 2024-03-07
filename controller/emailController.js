const nodemailer = require('nodemailer');

const sendMail = (req, res) =>{

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'deepak7009verma@gmail.com',
    pass: 'jfuftrqutqgmnwfe'
  }
});

const mailOptions = {
  from: 'deepak7009verma@gmail.com',
  to: 'ashishbahar987@gmail.com',
  subject: 'Deepak Sending Email using Node.js',
  text: 'Hello from Node Mailer '
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
    res.send(error)
  } else {
    console.log('Email sent: ' + info.response);
    res.status(200).send({"Email sent!": info});
  }
});
}

module.exports = {sendMail}