const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Login } = require("../models/loginSchema");
const mongoose = require('mongoose');

const nodemailer = require("nodemailer");

const register = async (req, res) => {
  try {
    const { username, password, email, labName, labAddress } = req.body;

    const existingUsername = await Login.findOne({ username });
    const existingEmail = await Login.findOne({ email });

    if (existingUsername) {
      return res.status(400).json({ error: "Username already exists" });
    }

    if (existingEmail) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Login({
      username,
      password: hashedPassword,
      email,
      labName,
      labAddress,
      plainPassword: password,
    });

    await newUser.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "vinunarwal3@gmail.com",
        pass: "aocvmkkllxlcjsbk",
      },
    });

    const mailOptions = {
      from: "vinunarwal3@gmail.com",
      to: email,
      subject: "Registration Successful",
      text: `Dear ${username},\n\nCongratulations! You have successfully registered.\n\nUsername: ${username}\nPassword: ${password}\n\nThank you.`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).json({ error: "Error sending email" });
      } else {
        console.log("Email sent: " + info.response);
        const token = jwt.sign({ username }, "secretkey");
        res.status(201).json({
          message: "User registered successfully. Email sent!",
          token,
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Login.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ username: user.username }, "secretkey");

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
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

const forgetPassword = async (req, res) => {
  try {
    const { username, email } = req.body;

    const user = await Login.findOne({ username, email });

    if (!user) {
      return res.status(400).json({ error: "Invalid username or email" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "vinunarwal3@gmail.com",
        pass: "aocvmkkllxlcjsbk",
      },
    });

    const mailOptions = {
      from: "vinunarwal3@gmail.com",
      to: email,
      subject: "Password Recovery",
      text: `Your password is: ${user.plainPassword}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Error sending email" });
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({ message: "Password sent to registered email" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await Login.findOne(
      { username: req.user.username },
      { password: 0 }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const updateUsername = async (req, res) => {
  try {
    const { username, userId } = req.body;
    const _id = req.body.userId;
    // const { user } = req;
    
    console.log('username, userId', username, userId); // Debugging: Log the request body
    // console.log('User Object:', user); // Debugging: Log the user object

    // if (!user) {
    //   console.log('User not found');
    //   return res.status(404).json({ error: 'User not found' });
    // }

    // Find the user by username to check if it exists
    const updatedUser = await Login.findByIdAndUpdate(_id, { username }, { new: true });
    console.log("updatedUser=>", updatedUser)
    if (!updatedUser) {
      console.log('User with username not found');
      return res.status(404).json({ error: 'User with username not found' });
    }

    // Update the username
    // user.username = username;
    // await user.save();

    console.log('Username updated successfully');
    res.status(200).json({ message: 'Username updated successfully', updatedUser });
  } catch (error) {
    console.error('Error updating username:', error);
    res.status(500).json({ error: 'Error updating username', details: error.message });
  }
};




module.exports = { register, login, forgetPassword, getUserDetails, updateUsername };
