const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const {map} = require('ramda');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'todolist'
})

connection.connect();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(8089);

app.get('/todolist', (req, res) => {
  connection.query('SELECT * FROM todolist', (err, results, fields) => {
    if (err) {
      res.send('获取数据失败');
    }
    const int2bool = (obj) => {
      return obj.completed === 0 ? Object.assign({}, obj, {completed: false}) : Object.assign({}, obj, {completed: true});
    }
    const queryResults = map(int2bool)(results)
    res.send([].concat(queryResults))
  })
})

app.post('/addtodo', (req, res) => {
  connection.query(`INSERT INTO todolist VALUES ("${req.body.content}", false, 0)`
    , (err, results, fields) => {
      if (err) {
        res.send({
          err: true,
        });
      } else {
        res.send({
          err: false,
          id: results.insertId,
        });
      }
    })
})

app.post('/toggle', (req, res) => {
  connection.query(`UPDATE todolist SET completed=${req.body.completed} WHERE ID=${req.body.ID}`
    , (err, results, fields) => {
      if (err) {
        res.send({err: true});
      } else {
        res.send({err: false});
      }
    })
})

app.post('/edit', (req, res) => {
  connection.query(`UPDATE todolist SET text="${req.body.text}" WHERE ID=${req.body.ID}`
    , (err, results, fields) => {
      if (err) {
        res.send({err: true});
      } else {
        res.send({err: false});
      }
    })
})