const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Login } = require('../models/loginSchema');

const nodemailer = require('nodemailer');


const register = async (req, res) => {
  try {
    const { username, password, email, labName, labAddress } = req.body;

    const existingUser = await Login.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Login({
      username,
      password: hashedPassword,
      email,
      labName,
      labAddress,
    });

    await newUser.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'vinunarwal3@gmail.com',
        pass: 'aocvmkkllxlcjsbk'
      }
    });

    const mailOptions = {
      from: 'vinunarwal3@gmail.com',
      to: email, 
      subject: 'Registration Successful',
      text: `Dear ${username},\n\nCongratulations! You have successfully registered.\n\nUsername: ${username}\nPassword: ${password}\n\nThank you.`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'Error sending email' });
      } else {
        console.log('Email sent: ' + info.response);
        const token = jwt.sign({ username }, 'secretkey');
        res.status(201).json({ message: 'User registered successfully. Email sent!', token });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Login.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ username: user.username }, 'secretkey');

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

//const getAllUsers = async (req, res) => {
//  try {
//    const users = await Login.find({}, { password: 0 });
//    res.status(200).json(users);
//  } catch (error) {
//    res.status(500).json({ error: 'Internal server error' });
//  }
//};

module.exports = { register, login };

