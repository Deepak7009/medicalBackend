const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
app.use(cors());
app.use(express.json())

const dbConnection = require('./config/dbConnection');
const { gets, addUser } = require('./controller/userController');

dbConnection();

app.get('/', gets);
app.post('/user', addUser);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
