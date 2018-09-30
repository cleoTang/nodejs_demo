function Password(){
	this.addlister();
	this.init();
}
$.extend(Password.prototype,{
	init(){
		//加载时，“密码修改”导航激活
		$(".update-psw-a").addClass("active").siblings().removeClass("active");
	},
	addlister(){
		//修改密码事件
		$(".btn-update-psw").on("click",this.updatePsw);
	},
	updatePsw(){
		//判断两次密码是否一致
		const psw=$(".newpassword2").val();
		const newpsw=$(".newpassword1").val();
		if(psw!=newpsw){
			$(".warinfo").removeClass("hidden");
			setTimeout(function(){
				$(".warinfo").hide();
			},1500);
		}else{
			//修改密码
			let user=sessionStorage.loginUser;
			user=JSON.parse(user);
			const url="/api/user/psw";
			const username=user.username;
			const data=$(".psw-info-form").serialize()+"&username="+username;
//			console.log(data);
			$.post(url,data,(data)=>{
				const id=data.res_body.data[0];
				const _id=data.res_body.data_id;
				const user=data.res_body.data;
//				console.log(data);
				if(!data.res_code){
					$(".warinfo1").removeClass("hidden");
					setTimeout(function(){
						$(".warinfo1").hide();
					},1500);
				}else{
					const url="/api/user/update";
					const FormData="password="+newpsw+"&username="+user.username+"&tell="+user.tell+"&sex="+user.sex+"&_id="+user._id;
//					console.log(FormData);
					$.ajax({
						type:"get",
						url,
						data:FormData,
						processData: false, // 不转换 data 向服务器提交的数据（默认是将对象转换为查询字符串）
						contentType: false,
						success(data){
							//显示提示框
							$("#test").modal("show");
							$(".btn-login-new").on("click",function(){
								//隐藏提示框 跳转到登录页面
								$("#test").modal("hide");
								window.location.href="/html/login.html");
							});
						}
					});
				}
			});
		}
	}
});
new Password();
