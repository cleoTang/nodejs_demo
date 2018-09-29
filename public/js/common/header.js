function Header(){
	this.createDom();
	this.loadInfo();
	this.addlister();
}
Header.navTemplate=`<div class="container-fluid">
			<div class="row">
				<div class="col-md-12 alert alert-info logo">
					<img src="/images/buy.png" alt="" />
					超市账单管理系统
				<div class="login-in-info zhuxiao hidden">
					<span>您好,</span>
					<button type="button" class="btn btn-success btn-index logout-user-btn"><a href="/html/login.html">退出</a></button>
				</div>
				<button type="button" class="btn btn-success  btn-index login-in-info btn-login-suc"><a href="/html/login.html">登录</a></button>
				</div>
			</div>
		</div>`;
$.extend(Header.prototype,{
	createDom(){
		$(Header.navTemplate).appendTo("header");
	},
	loadInfo(){
		// 从 sessionStorage 中获取登录成功的用户信息
		let user=sessionStorage.loginUser;
		if(!user)return;
		//还原解析ueser信息
		user=JSON.parse(user);
		$(".btn-login-suc").hide()
		.prev(".zhuxiao").removeClass("hidden")
		.find("span").text("您好，"+user.username);
		
	},
	//注册事件监听
	addlister(){
		$(".logout-user-btn").on("click",this.logoutHandler);
	},
	logoutHandler(){
		// 访问后端注销的接口
		$.get("/api/user/logout", ()=>{				
			// 清除 sessionStorage 中保存的数据
			sessionStorage.removeItem("loginUser");
			// 刷新
			location.reload();
		});
	}
	
});

new Header();
