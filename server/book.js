var express = require('express');
var app = express();
var fs = require("fs");
var url = require("url");
var bodyParser = require('body-parser');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'library'
});

connection.connect();

//查找
app.get('/books', function (req, res) {
  // 从数据查询数据
  connection.query('select * from book', function (error, results, fields) {
    if (error) throw error;
    console.log('查询结果为: ', results);
    res.end(JSON.stringify(results));
  });
})

// bodyParser.json解析json数据格式的
app.use(bodyParser.json());
//增加
app.post('/books', function (req, res) {
  var params = req.body;

  console.log("您POST的数据是：");
  console.log(params);

  var addSql = 'INSERT INTO book(name,locate,introduce) VALUES(?, ?, ?)';
  var addParams = [params.name, params.locate, params.introduce];
  /// 将数据新增到数据库
  connection.query(addSql, addParams, function (err, result) {
    if (err) {
      console.log('[INSERT ERROR] - ', err.message);
      return;
    }
    console.log('INSERT ID:', result);
    res.end();
  });
});

//删除
app.delete('/books', function (req, res) {
  var params = url.parse(req.url, true).query;
  console.log('[DELETE ids] - ', params);
  var ids = params.ids;
  var delSql = 'DELETE FROM book where id in ('+ids+')';
  /// 将数据从数据库删除
  connection.query(delSql, function (err, result) {
    if (err) {
      console.log('[DELETE ERROR] - ', err.message);
      return;
    }
    res.end();
  });
});

//修改
app.put('/books', function (req, res) {
  var params = req.body;

  console.log("您update的数据是：", params);

  var updtSql = 'UPDATE book set name=?, locate=?, introduce=? where id=?';
  var updateParams = [params.name, params.locate, params.introduce, params.id];
  /// 将数据更新到数据库
  connection.query(updtSql, updateParams, function (err, result) {
    if (err) {
      console.log('[UPDATE ERROR] - ', err.message);
      return;
    }
    res.end();
  });
});

var server = app.listen(3001, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})