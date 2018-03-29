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

///books
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
    sleep(5000);
    console.log('INSERT ID:', result);
    res.end();
  });
});

function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
};

//删除
app.delete('/books', function (req, res) {
  var params = url.parse(req.url, true).query;
  console.log('[DELETE ids] - ', params);
  var ids = params.ids;
  var delSql = 'DELETE FROM book where id in (' + ids + ')';
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

///vips
//查找
app.get('/vips', function (req, res) {
  var params = url.parse(req.url, true).query;

  // 查出总数
  var totalCount;
  var countSql = 'select count(*) as count from vipTable';
  connection.query(countSql, function (error, data) {
    totalCount = data[0].count;

    // 查出数据
    var limit = params.pageSize >>> 0;// 字符串转整数
    var offset = params.pageSize * (params.pageNum - 1);
    var querySql = 'select * from vipTable limit ? offset ?';
    var queryParams = [limit, offset];
    // 从数据查询数据
    connection.query(querySql, queryParams, function (error, data, fields) {
      if (error) throw error;
      console.log('查询结果为: ', data);
      var result = {
        rows: data,
        total: totalCount
      };
      res.end(JSON.stringify(result));
    });

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
  var delSql = 'DELETE FROM vipTable where id in (' + ids + ')';
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

//登录
// bodyParser.json解析json数据格式的
app.use(bodyParser.json());
app.post('/login', function (req, res) {
  var params = req.body;
  console.log('[params] - ', params);
  var sql = 'select count(*) as count from vipTable where name=? and password=?';
  var sqlParams = [params.name, params.password];
  connection.query(sql, sqlParams, function (error, data) {
    console.log('[data] - ', data);
    var count = data[0].count;
    if (count == 1) {
      res.end('SUCCESS');
    } else {
      res.end('ERROR');
    }
  });
});

//注册
// bodyParser.json解析json数据格式的
app.use(bodyParser.json());

app.post('/regist', function (req, res) {
  var params = req.body;

  console.log("注册数据是：");
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
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})