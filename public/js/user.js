function Register(){
	this.addLister();
}
$.extend(Register.prototype,{
	//注册事件监听
	addLister(){
		$(".add-user-btn").on("click",this.registerHandre);
	},
	registerHandre(){
		const url="/api/user/register",
			data=$(".register-form").serialize();
		$.post(url,data,(data)=>{
			console.log(data);
		})
	}
});

new Register();