const UserDao=require("../dao/user_dao.js");


const UserService={
	//注册
	register(req,res,next){
		//获取用户注册的信息：post请求中的数据
		const {username,password,sex,tell,type}=req.body;
		//保存到数据库中
		UserDao.save({username,password,sex,tell,type})
			.then((data)=>{
				//保存成功
				res.json({res_code:1,res_error:"",res_body:{data:{username:username,sex:sex,tell:tell,type:type,reg_time:data.reg_time}}});
			})
			.catch((err)=>{
				//保存失败
				res.json({res_code:0,res_error:err,res_body:{}});
			});
	}
	//登录
//	login(req,res,next){
//		
//	}
	//注销
};
module.exports=UserService;