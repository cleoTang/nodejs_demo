//用户访问Dao数据
const {User}=require("./model.js");
const UserDao={
	//保存用户信息
	save(userInfo){
		userInfo.reg_time=new Date();
		return new User(userInfo).save();
	}
	//查找用户信息
//	find(condition){
//		return User.find(condition);
//	}
};

module.exports=UserDao;