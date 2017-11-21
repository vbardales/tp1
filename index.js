'use strict';

console.log('Je suis content de faire du JS');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'cnam_2016',
});

connection.connect();

connection.query('SELECT * from dessert', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

connection.end();
