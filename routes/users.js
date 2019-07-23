var express = require('express');
var router = express.Router();
var User = require('./user')
var URL = require('url')
var db = require('../model/db')
/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/getUserInfo', function(req, res, next) {

  var user = new User();
  var params = URL.parse(req.url, true).query;

  if(params.id == '1') {  
    user.name = "Mr.light";
    user.age = "1";
    user.city = "深圳市";
  } else if(params.id == '2'){
    user.name = "Ms.lee";
    user.age = "2";
    user.city = "广东市";
  }else if(params.id == '3' && params.name == 'beijing'){
    user.name = "Ms.lee";
    user.age = "3";
    user.city = "北京";
  }
  var response = {status:1,data:user};
  res.send(JSON.stringify(response))
});
router.get('/dbuser',function(req, res){
  let user = {id:5,name: '刘七', age: 21 , city: '重庆'};
  let sqlString = 'INSERT INTO user SET ?';
  let connection = db.connection();
  db.insert(connection, sqlString, user, function(id){
      console.log('inserted id is:' + id);
  });
  db.close(connection);
  res.send('插入成功')
});
router.get('/getAllUsers',function(req,res){
  var sql = 'select * from user'
  var connection = db.connection()
  connection.query(sql,function(err,result){
    var list = {}
    if (err) {
      list.code = '500'
      list.page = '查询失败'
      res.send(list)
      return
    }
    list.code = 200
    list.page = result
    res.send(list)
  })
  connection.end()
})
router.get('/getUser',function(req,res){
  var params = URL.parse(req.url, true).query;
  var sql = 'select * from user where id = ?'
  var sqlparam = params.id
  var connection = db.connection()
  connection.query(sql,sqlparam,function(err,result){
    var list = {}
    if (err) {
      list.code = '500'
      list.page = '查询失败'
      res.send(list)
      return
    }
    list.code = 200
    list.page = result
    res.send(list)
  })
  connection.end()
})
router.post('/deleteUser',function(req,res){
  var params = URL.parse(req.url,true).query
  var sql = 'DELETE FROM user where id=?'
  var sqlparam = params.id
  var connection = db.connection()
  var data = {}
  connection.query(sql,sqlparam,function(err,result){
    if(err){
      data.code = '500'
      data.msg = '操作失败'
      res.send(data)
    }else if(result){
      data.code = '200'
      data.msg = '操作成功'
      res.send(data)
    }
    connection.end()
  })
})
router.post('/updateUser',function(req,res){
  var params = URL.parse(req.url,true).query
  var sql = 'update user set name=? ,city=? where id=?'
  var sqlparam = [params.name,params.city,params.id]
  var connection = db.connection()
  var data = {}
  connection.query(sql,sqlparam,function(err,result){
    if(err){
      data.code = '500'
      data.msg = '操作失败'
      res.send(data)
    }else if(result){
      data.code = '200'
      data.msg = '操作成功'
      res.send(data)
    }
    connection.end()
  })
})
router.post('/addUser',function(req,res){
  var params = URL.parse(req.url,true).query
  var sql = 'insert into user(id,name,age,city) values(?,?,?,?)'
  var connection = db.connection()
  var data = {}
  var sqlparam = [params.id,params.name,params.age,params.city]
  connection.query(sql,sqlparam,function(err,result){
    if(err){
      data.code = '500'
      data.msg = '操作失败'
      res.send(data)
    }else if(result){
      data.code = '200'
      data.msg = '操作成功'
      res.send(data)
    }
    connection.end()
  })
})
module.exports = router;
