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
app.get('/vips', function (req, res) {
    console.log('bjhh');
  // 从数据查询数据
  connection.query('select * from vipTable', function (error, results, fields) {
    if (error) throw error;
    console.log('查询结果为: ', results);
    res.end(JSON.stringify(results));
  });
})

// bodyParser.json解析json数据格式的
app.use(bodyParser.json());
//增加
app.post('/vips', function (req, res) {
  var params = req.body;

  console.log("您POST的数据是：");
  console.log(params);

  var addSql = 'INSERT INTO vipTable(name,password) VALUES(?, ?)';
  var addParams = [params.name, params.password];
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
app.delete('/vips', function (req, res) {
  var params = url.parse(req.url, true).query;
  console.log('[DELETE ids] - ', params);
  var ids = params.ids;
  var delSql = 'DELETE FROM vipTable where id in ('+ids+')';
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
app.put('/vips', function (req, res) {
  var params = req.body;

  console.log("您update的数据是：", params);

  var updtSql = 'UPDATE vipTable set name=?, password=? where id=?';
  var updateParams = [params.name, params.password, params.id];
  /// 将数据更新到数据库
  connection.query(updtSql, updateParams, function (err, result) {
    if (err) {
      console.log('[UPDATE ERROR] - ', err.message);
      return;
    }
    res.end();
  });
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})