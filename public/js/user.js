function Register(){
	this.init();
	this.addLister();
}
$.extend(Register.prototype,{
	//初始化
	init(){
		//加载时，“用户管理”导航激活
		$(".nav-user").addClass("active").siblings().removeClass("active");
		this.loadByPage(1);
		//页码加载
		$.post("/api/user/page",(data)=>{
			
			this.number=Math.ceil(data.number/3);
			//拼接分页
			for(var i=1;i<=this.number;i++){
				$("<li><a>"+i+"</a></li>").insertBefore(".next"); 
			}
			$(".prev").next().addClass("active");
		});
		//点击"当前页面" 刷新
		$(".all-info").on("click",function(){
			window.location.reload();
		});
		
	},
	//按页加载职位
	loadByPage(page){
		//page是待加载的页面 默认是1
		page= page||1;
		//ajax访问接口
		$.get("/api/user/find",{page},(data)=>{
			let str="";
			data.res_body.data.forEach((curr,index)=>{
				str+=`<tr>
					  		<td>${index+1}</td>
						  	<td>${curr.username}</td>
						  	<td>${curr.sex}</td>
						  	<td>${curr.reg_time}</td>
						  	<td>${curr.tell}</td>
						  	<td>${curr.type}</td>
						  	<td class="hidden">${curr._id}</td>
						  	<td>
						  		<a  data-toggle="modal" data-target="#updateModal" href="javascript:;" class="user-update" data-toggle="modal" data-target="#modifyModal"><img src="/images/updata.png" alt="" /></a>
						  		<a  class="position-del" href="javascript:;"><img src="/images/schu.png" alt="" /></a>
						  	</td>
					  	</tr>`;
			});
			$(".message-table tbody").html(str);
			//查询用户
			$(".find-user-btn").on("click",this.queryUser);
			
			//点击编辑按钮获取表格信息
			$(".user-update").on("click",this.userInfo);
		});
	},
	//注册事件监听
	addLister(){
		//添加职位
		$(".add-user-btn").on("click",this.registerHandler);
		//分页
		const index=1;
		$(".pagination").on("click","a",$.proxy(this.loadBypageHandler,this));
		//删除职位信息
		$(".message-table").on("click","a",this.deleteHandler);
		//修改职位信息
		$(".update-user-btn").on("click",this.updateHandler);
	},
	//点击页码翻页
	loadBypageHandler(event){
		const src=event.target;
		//页码
		const page=$(src).text();
		if(!isNaN(Number(page))){
			index=page;	
		}else if($(src).parent().hasClass("prev")){
			index=index-1;
			if(index<1)index=1;
		}else if($(src).parent().hasClass("next")){
			index=index+1;
			if(index>this.number)index=this.number;
		}
		this.loadByPage(index);
		//激活状态
		$(".pagination").children().eq(index).addClass("active").siblings().removeClass("active");
		return false;
	},
	//注册用户
	registerHandler(){
		const url="/api/user/register",
			data=$(".add-user-infoFrom").serialize();
			console.log(data);
		$.post(url,data,(data)=>{
			console.log(458);
			console.log(data);
			const curr=data.res_body.data;
			if(data.res_code==1){
				const html=`<tr>
						  		<td></td>
							  	<td>${curr.username}</td>
							  	<td>${curr.sex}</td>
							  	<td>${curr.reg_time}</td>
							  	<td>${curr.tell}</td>
							  	<td>${curr.type}</td>
							  	<td>
							  		<a href="javascript:;" class="position-update" data-toggle="modal" data-target="#modifyModal"><img src="/images/updata.png" alt="" /></a>
							  		<a  class="position-del" href="javascript:;"><img src="/images/schu.png" alt="" /></a>
							  	</td>
						  	</tr>`;
				$(".message-table tbody").append(html);
				//关闭模态框
				$("#addModal").modal("hide");
				
				// 刷新页面
				window.location.reload();
			}else{
				$(".reg-error").removeClass("hidden");
			}
			
		})
	},
	//删除数据
	deleteHandler(){
		if($(this).hasClass("position-del")){
		//点击提交
		const url="/api/user/delete";
		let _id=$(this).parent().prev().html();
		$.getJSON(url,{_id},(data)=>{
			data=data.res_code;
			if(data){
				$(this).parent().parent().remove();
				// 刷新页面
				window.location.reload();
			}else{
				//删除失败
			}
		});	
		}
	},
	//模糊查询用户
	queryUser(){
		const url="/api/user/query";
		let username=$(".query-name-input").val();
		console.log(123);
		$.getJSON(url,{username},(data)=>{
			let str="";
			data.res_body.data.forEach((curr,index)=>{
				str+=`<tr>
					  		<td>${index+1}</td>
						  	<td>${curr.username}</td>
						  	<td>${curr.sex}</td>
						  	<td>${curr.reg_time}</td>
						  	<td>${curr.tell}</td>
						  	<td>${curr.type}</td>
						  	<td class="hidden">${curr._id}</td>
						  	<td>
						  		<a data-toggle="modal" data-target="#updateModal" href="javascript:;" class="position-update" data-toggle="modal" data-target="#modifyModal"><img src="/images/updata.png" alt="" /></a>
						  		<a  class="position-del" href="javascript:;"><img src="/images/schu.png" alt="" /></a>
						  	</td>
					  	</tr>`;
			});
			$(".message-table tbody").html(str);
			$(".page-user").addClass("hidden");
		});
	},
	//获取表格里面的信息
	userInfo(){
		const tr=$(this).parent().parent().children();
//		console.log(tr);
		$("#exampleInputName3").val(tr.eq(1).html());
		$("#exampleInputTell1").val(tr.eq(4).html());
		$("#exampleInputSex1").val(tr.eq(2).html());
		$("#exampleInputID").val(tr.eq(6).html());
	},
	//提交修改信息
	updateHandler(){
		const url="/api/user/update";
		let formData= $(".update-user-form").serialize();
		$.ajax({
			type:"get",
			url,
			data:formData,
			processData: false, // 不转换 data 向服务器提交的数据（默认是将对象转换为查询字符串）
			contentType: false,
			success(data){
				// 关闭模态框
				$("#updateModal").modal("hide");
				// 刷新页面
				window.location.reload();
			}
		});
	}
});

new Register();