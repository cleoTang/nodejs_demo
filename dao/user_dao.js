//用户访问Dao数据
const {User}=require("./model.js");

const UserDao={
	//保存用户信息
	save(userInfo){
		userInfo.reg_time=new Date();
		userInfo.type="管理员";
		return new User(userInfo).save();
	},
	//查找用户信息
	findByPage(page){
		const pageSize=3;//每页信息条数
		return User.find().limit(pageSize).skip((page-1)*pageSize);
	},
	//查找数据条数
	page(){
		return User.find().count();
	},
	//删除用户信息
	remove(_id){
		return User.remove({_id:_id});
	},
	//模糊查询用户的信息
	queryUser(username){
		console.log(username);
		//模糊查询参数 构建正则对象
		var query=new RegExp(username,'i');
		console.log(query);
		return User.find({'username':query});
	},
	//修改用户信息
	update(condition,updateInfo){
		return User.update(condition,updateInfo);
	},
	//登录验证查找
	find(condition){//查找用户信息
		return User.find(condition);
	}
};

module.exports=UserDao;