function remindLogin(){
	this.loadInfo();
}
$.extend(remindLogin.prototype,{
	loadInfo(){
		// 从 sessionStorage 中获取登录成功的用户信息
		let user=sessionStorage.loginUser;
		if(!user) return;
		//还原解析ueser信息
		user=JSON.parse(user);
		$(".none-login").hide()
		.prev(".have-login").removeClass("hidden")
		.find("h1").text(user.username);
		
	}
});
new remindLogin();