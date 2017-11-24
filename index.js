'use strict';

const express = require('express');
const mysql = require('mysql');
const Promise = require('bluebird')

console.log('Je suis content de faire du JS');

const connection = Promise.promisifyAll(mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Cours5et6',
}), { multiArgs: true });

const app = express();

app.use(express.static('public'));

app.get('/view', function (req, res) {
  connection.queryAsync('SELECT * from dessert')
    .then(function(results) {
      const rows = results[0];
      const fields = results[1];

      let html = `
        <html>
          <head></head>
          <body>
            <table style="border:1px solid black;border-collapse:collapse">
      `;

      fields.forEach(function(field) {
        html += `
              <th>${field.name}</th>
        `;
      });

      rows.forEach(function(row) {
        html += `
              <tr>
        `;

        Object.keys(row).forEach(function(key) {
          html += `
                <td style="border:1px solid black">${row[key]}</td>
          `;
        });

        html += `
              </tr>
        `;
      });

      html += `
          </table>
        </body>
      </html>
      `;
      res.send(html);
    })
  ;
});

app.get('/api', function (req, res) {
  connection.queryAsync('SELECT * from dessert')
    .then(function(results) {
      const rows = results[0];
      const fields = results[1];

      res.json({ rows, fields });
    })
  ;
});

connection.connectAsync()
  .then(function() {
    app.listen(3000, function() {
      console.log('Example app listening on port 3000!');
    });
  })
;
