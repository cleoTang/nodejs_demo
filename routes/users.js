var express = require('express');
var UserService=require("../services/user_service.js");
var router = express.Router();

///* GET users listing. */
//router.get('/', function(req, res, next) {
//res.send('respond with a resource');
//});

//注册
router.post("/register",UserService.register);
//加载用户信息
router.get("/find",UserService.find);
//页码加载
router.post('/page',UserService.findpage);
//删除数据
router.get('/delete',UserService.userDelete);
//模糊查询数据
router.get('/query',UserService.query);

//修改用户信息
router.get('/update',UserService.update);
//登录
router.post("/login",UserService.login);
//注销
router.get('/logout',UserService.logout);
//修改密码
router.post('/psw',UserService.psw);
module.exports = router;
