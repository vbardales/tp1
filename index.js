'use strict';

const express = require('express');
const mysql = require('mysql');
const Promise = require('bluebird')

console.log('Je suis content de faire du JS');

const connection = Promise.promisifyAll(mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cnam_2016',
}));

const app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/view', function (req, res) {
  res.send('Hello World!');
});

connection.connectAsync()
  .then(function() {
    app.listen(3000, function() {
      console.log('Example app listening on port 3000!');
      connection.queryAsync('SELECT * from dessert')
        .then(function(results) {
          console.log('The solution is: ', results);

          connection.end();
        })
      ;
    });
  })
;
