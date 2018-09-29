function Nav(){
	this.createDom();
}
Nav.navTemplate=`<div class="list-group">
			  <a href="javascript:void(0)" class="list-group-item bgc link-list">
			    功能列表
			  </a>
			  <a href="/html/order.html" class="list-group-item">
			  	<img src="/images/zd.png">
			  	账单管理
				</a>
			  <a href="#" class="list-group-item">
			  	<img src="/images/gys.png">
			  	供应商管理
				</a>
			  <a href="/html/user.html" class="list-group-item nav-user">
			  	<img src="/images/yh.png">
			  用户管理
			</a>
			  <a href="/html/password.html" class="list-group-item update-psw-a">
			  	<img src="/images/mm.png">
			  密码修改
			</a>
			  <a href="#" class="list-group-item">
			  	<img src="/images/tc.png">
			  退出系统
			</a>
			</div>`;
$.extend(Nav.prototype,{
	createDom(){
		$(Nav.navTemplate).appendTo(".nav-menu");
	}
});

new Nav();
