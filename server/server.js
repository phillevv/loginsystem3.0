const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // För att hantera URL-kodad data

// Konfigurera MySQL-anslutningen
const db = mysql.createConnection({
    host: '',
    user: '',
    port: '',
    password: '',
    database: ''
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});



let date = new Date();
let formattedDate = new Intl.DateTimeFormat('sv-SV').format(date);
var Today = new Date().toLocaleString()
console.log(Today)

// Hantera GET-begäran
app.get('/personuppgifter', (req, res) => {
  const sql = 'SELECT * FROM lummelundalogin.personuppgifter';
  db.query(sql, (err, results) => {
      if (err) {
          return res.status(500).send(err);
      }
      res.json(results);
  });
});

// Hantera GET-begäran
app.get('/personuppgifter/personnummer', (req, res) => {
  const sql = 'SELECT personnummer FROM lummelundalogin.personuppgifter';
  db.query(sql, (err, results) => {
      if (err) {
          return res.status(500).send(err);
      }
      res.json(results);
  });
});

// Handle GET request
app.get('/personuppgifter/login', (req, res) => {
  const personnummer = req.query.value1;

  // Parameterized query to prevent SQL injection
  const sql = 'SELECT * FROM lummelundalogin.personuppgifter WHERE personnummer = ?';
  db.query(sql, [personnummer], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});


// Hantera GET-begäran
app.get('/time', (req, res) => {
  const sql = "SELECT * FROM lummelundalogin.timein WHERE dagin = '"+ formattedDate +"' AND timeout IS NULL ";
  db.query(sql, (err, results) => {
      if (err) {
          return res.status(500).send(err);
      }
      res.json(results);
  });
});

// Hantera GET-begäran
app.get('/timelist', (req, res) => {
    const sql = "SELECT * FROM lummelundalogin.timein WHERE dagin = '"+ formattedDate +"'  ";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
  });

// Hantera GET-begäran
app.get('/alltime', (req, res) => {
  const sql = "SELECT personnummer,fornamn,efternamn,timein,timeout FROM lummelundalogin.timein ORDER BY timein DESC";
  db.query(sql, (err, results) => {
      if (err) {
          return res.status(500).send(err);
      }
      res.json(results);
  });
});


// Hantera POST-begäran
app.post('/', (req, res) => {
    const data = req.body;
    const sql = 'INSERT INTO lummelundalogin.timein (dagin, personnummer, fornamn, efternamn, timein, datein, dateout, timeout) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [formattedDate, data.value1, data.value2, data.value3, data.value4, data.value5, null, null], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('Data added...');
    });
});


// Hantera POST-begäran
app.put('/timein', (req, res) => {
  const data = req.body;
  const sql = "UPDATE lummelundalogin.timein SET dateout = (?), timeout = (?) WHERE dagin = '"+ formattedDate +"' AND timeout IS NULL AND personnummer =  '"+ data.value1 +"'";
  db.query(sql, [data.value2,data.value3], (err, result) => {
      if (err) {
          return res.status(500).send(err);
      }
      res.send('Data added...');
  });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});