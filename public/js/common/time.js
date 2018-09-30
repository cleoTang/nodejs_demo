function Time(){
	this.createDom();
}
Time.navTemplate=`<div class="container-fluid">
			<div class="row">
				<div class="col-md-12 alert alert-info time">
					<img src="/images/time.png" alt="" />
					<span class="time-link">2018年9月30日星期天</span>
				</div>
			</div>
		</div>`;
$.extend(Time.prototype,{
		
	createDom(){
		$(Time.navTemplate).appendTo($(".index-time"));	
		setInterval(function(){
			const date=new Date();
			//获得当前月份0-11  
	        const dateMonth = date.getMonth()+1;
	        //获得当前年份 
	        const dateYear = date.getFullYear();
	        //获得当前天
	        const dateDay = date.getDate();
	        //获得当前时间
	       var dateHours=date.getHours(),
	       		 dateMin=date.getMinutes(),
	       		 dateSec=date.getSeconds();
	       	//获取星期几
	       var datW=date.getDay();
	       	if(dateSec<10){
	       		dateSec="0"+dateSec;
	       	}
	       	if(dateHours<10){
	       		dateHours="0"+dateHours;
	       	}
	       	if(dateMin<10){
	       		dateMin="0"+dateMin;
	       	}
	       	switch(datW){
	       		case 0:datW="星期天"
	       			break;
	       		case 1:datW="星期一"
	       			break;
	       		case 2:datW="星期二"
	       			break;
	       		case 3:datW="星期三"
	       			break;
	       		case 4:datW="星期四"
	       			break;
       			case 5:datW="星期五"
       			break;
       			case 6:datW="星期六"
       			break;
	       		default:
	       			break;
	       	}
	       	
	       	var str="";
			str=`<span>${dateYear}年${dateMonth}月${dateDay}日&nbsp;&nbsp;${dateHours}时${dateMin}分${dateSec}秒&nbsp;&nbsp;${datW}</span>`;
		    $(".time-link").html(str);
		},1000);
		
	}
});
new Time();