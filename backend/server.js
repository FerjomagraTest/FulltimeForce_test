const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use(morgan('dev'));


const uri = 'mongodb://localhost/github_project';
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const commitsRouter = require('./routes/commits');

app.use('', commitsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});