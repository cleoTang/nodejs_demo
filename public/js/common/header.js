function Header(){
	this.createDom();
}
Header.navTemplate=`<div class="container-fluid">
			<div class="row">
				<div class="col-md-12 alert alert-info logo">
					<img src="/images/buy.png" alt="" />
					超市账单管理系统
				<button type="button" class="btn btn-success btn-index"><a href="/html/login.html">登录</a></button>
				</div>
			</div>
		</div>`;
$.extend(Header.prototype,{
	createDom(){
		$(Header.navTemplate).appendTo("header");
	}
});

new Header();
