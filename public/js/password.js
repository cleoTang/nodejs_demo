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
				data=data.res_code;
				if(!data){
					$(".warinfo1").removeClass("hidden");
					setTimeout(function(){
						$(".warinfo1").hide();
					},1500);
				}else{
					const url="/api/user/update";
					$.get(url,data,(data)=>{
						console.log(data);
					})
				}
			});
		}
	}
});
new Password();
