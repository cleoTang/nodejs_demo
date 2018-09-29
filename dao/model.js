//引入数据库
const mongoose = require("mongoose");
//连接mongodb数据库
mongoose.connect('mongodb://localhost/demo_super');

//创建用户Schema、职位Schema
const userSchema= new mongoose.Schema({
	username:String,
	password:String,
	sex:String,
	tell:Number,
	reg_time:Date,
	type:String
});
const orderSchema=new mongoose.Schema({
	name:String,
	number:Number,
	supplier:String,
	total_amount:Number,
	type:String
});

//根据用户schema创建用户模型
const User = mongoose.model('user',userSchema);

//根据职位schema创建职位模型
const Order = mongoose.model('order',orderSchema);

//导出模块
module.exports={User,Order};