function Time(){
	this.createDom();
}
Time.navTemplate=`<div class="container-fluid">
			<div class="row">
				<div class="col-md-12 alert alert-info time">
					<img src="/images/time.png" alt="" />
					<span class="time-link"></span>
					<span class="tishi">温馨提示:为了能正常浏览,请使用高版本浏览器哦~~(IE10+)</span>
				</div>
			</div>
		</div>`;
$.extend(Time.prototype,{
	createDom(){
		const date=new Date();
		//获得当前月份0-11  
        const dateMonth = date.getMonth()+1;
        //获得当前年份 
        const dateYear = date.getFullYear();
        //获得当前时间
         const dateDay = date.getDate();
        
		$(Time.navTemplate).appendTo($(".index-time"));
		const str=`<span>${dateYear}年${dateMonth}月${dateDay}日</span>`;
		$(str).appendTo($(".time-link"));
	}
});
new Time();