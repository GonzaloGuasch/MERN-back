const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

const port = 8888;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
MongoClient.connect(db.url, (err, client) => {if(err) return console.log(err); require('./app/routes')(app, client.db('test'));});


app.listen(port, () => {  console.log('Listening in ', port);});
