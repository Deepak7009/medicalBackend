const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
app.use(cors());
app.use(express.json())

const dbConnection = require('./config/dbConnection');
// const { gets, addUser, getAllUsers } = require('./controller/userController');
const { gets, addUser, getAllUsers } = require('./controller/user2Controller');
const { sendMail } = require('./controller/emailController');

dbConnection();

app.get('/', gets);
app.post('/user', addUser);
app.get('/users', getAllUsers);

app.post('/send-mail', sendMail);
// app.post('/patient', addData);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
