function login(){
	this.addlister();
}
$.extend(login.prototype,{
	//事件监听
	addlister(){
		$(".user-login-btn").on("click",this.loginHandler);
	},
	loginHandler(){
		const url="/api/user/login";
		data=$(".login-form-user").serialize();
//		console.log(data);
		$.post(url,data,(data)=>{
			console.log(data);
			if(data.res_code===1){
				//登录成功
				sessionStorage.loginUser=JSON.stringify(data.res_body.data);
//				$(".login-in-info").removeClass("hidden");
				window.location.href="/index.html";
				 //刷新页面
//				window.location.reload();
			}else{
				//登录失败
				$(".login-error").removeClass("hidden");
			}
		});
	}
});

new login();