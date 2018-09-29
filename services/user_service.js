const UserDao=require("../dao/user_dao.js");
const bcrypt = require("bcrypt");

const UserService={
	//注册
	register(req,res,next){
		//获取用户注册的信息：post请求中的数据
		const {username,password,sex,tell}=req.body;
		 // 密码加密
		const hash = bcrypt.hashSync(password, 10);
//		console.log(hash);
//		console.log(password);
		//保存到数据库中
		UserDao.save({username,password:hash,sex,tell})
			.then((data)=>{
				//保存成功
				res.json({res_code:1,res_error:"",res_body:{data:{username:username,sex:sex,tell:tell,type:data.type,reg_time:data.reg_time,_id:data._id}}});
			})
			.catch((err)=>{
				//保存失败
				res.json({res_code:0,res_error:err,res_body:{}});
			});
	},
	//加载信息
	find(req,res,next){
		//获取加载页码
		const {page}=req.query;
		//查询
		UserDao.findByPage(page)
			.then((data)=>{
				//查询成功
				res.json({res_code:1, res_error:"", res_body:{data}});
			})
			.catch((err)=>{
				//查询失败
				res.json({res_code:0, res_error:err, res_body:{}});
			});
	},
	//页码加载
	findpage(req,res,next){
		UserDao.page()
				.then((data)=>{
					res.json({number:data});
				})
				.catch();
	},
	//删除数据
	userDelete(req,res,next){
		//获取删除的id
		const {_id}=req.query;
		//删除
		UserDao.remove(_id)
			.then((data)=>{
				res.json({res_code:1,res_error:"",res_body:{data}});
			})
			.catch((err)=>{
				res.json({res_code:0,res_error:err,res_body:{}});
			});
	},
	//模糊查询
	query(req,res,next){
		//获取查询的条件
		const {username}=req.query;
		UserDao.queryUser(username)
			.then((data)=>{
				//查询成功
				res.json({res_code:1, res_error:"", res_body:{data}});
			})
			.catch((err)=>{
				//查询失败
				res.json({res_code:0, res_error:err, res_body:{}});
			});
	},
	//修改用户信息
	update(req,res,next){
		//获取要修改的数据
		const {username,sex,tell,_id}=req.query;
		UserDao.update({_id},{username,sex,tell})
				.then((data)=>{
					res.json({res_code:1,res_error:"",res_body:{data}});
				})
				.catch((err)=>{
					res.json({res_code:0,res_error:err,res_body:{}});
				});
	},
	//登录
	login(req,res,next){
		// 获取post请求中传递的登录用户名与密码
		const {username,password}=req.body;
//		console.log({username,password});
		//从数据库中查询出用户名对应的用户信息
		UserDao.find({username})
					.then((data)=>{//保存成功
						// data 是一个数组，存放了所在查找到的满足条件的数据
//						console.log(data);
						if(data.length===1){
							//用户信息
							const user=data[0];
//							console.log(user.password);
							// 比较从请求中获取到用户的密码与实际保存的密码是否匹配 结果是一个布尔值
							const b = bcrypt.compareSync(password, user.password);
							console.log(user);
							if(b){//登录成功
								req.session.loginUser=user;
								res.json({res_code:1,res_error:"",res_body:{data:{username:user.username}}});
							}else{
								res.json({res_code:0, res_error:"", res_body:{}});
							}
						}else{
							res.json({res_code:0, res_error:"", res_body:{}});
						}
					})
					.catch((err)=>{
						res.json({res_code:-1, res_error:err, res_body:{}});
					});
	},
	//注销
	logout(req, res, next){
		req.session.loginUser = null;
		res.json({res_code:1});
	},
	//密码修改
	psw(req,res,next){
		const {password,newpassword,username}=req.body;
		console.log({username});
		UserDao.find({username})
			.then((data)=>{
				console.log(data);
				if(data.length===1){
					const user=data[0];
					const b = bcrypt.compareSync(password, user.password);
					//旧密码是正确的
					if(b){
							res.json({res_code:1,res_error:"",res_body:{data}});
					}else{
						res.json({res_code:0,res_error:"",res_body:{data}});
					}
				}
			})
			.catch();
	}
};
module.exports=UserService;