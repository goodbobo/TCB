//毛晓伟 H51612 
//张老师真帅     2016年10月13日                                                                                                                                              

$(function(){
	//登录框显示
	console.log('%c好好学习，天天向上d=====(￣▽￣*)b', 'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:3em;');
	//弹出登录框遮罩层
	$("#loga").on("click",function(e){
		e.preventDefault()
		$("#log1").show();
	});
	//弹出注册框遮罩层
	$("#zhuce").on("click",function(){
		$("#log2").show();
	});
	//点击登陆框X可以隐藏遮罩层
	$("#log1>div:first-child>p>a").on("click",function(){
		$("#log1").hide();
	});
	//点击注册框的X可以隐藏遮罩层
	$(".log2-div>div:first-child a").on("click",function(){
		$("#log2").hide();
	});
	//登陆表单的边框样式
	$("#log1>div>form p input,#log2 form input").on("click",function(){
		$(this).css("outline","medium rgba(17,136,85,.5) solid");
	});
	//鼠标离开登陆输入框的时候css恢复
	$("#log1>div>form p input,#log2 form input").on("blur",function(){
		$(this).css("outline","none");
	});
	//鼠标点击登陆换成登陆界面
	$(".dl3").on("click",function(){
		$("#log2").hide().find($("#log1").show());
	});
	//鼠标点击注册换成注册界面
	$(".zcx").on("click",function(e){
		e.preventDefault();
		$("#log1").hide().find($("#log2").show())
	});
	//点击切换城市出现城市列表
	$("#city-all").on("click",function(e){
		e.preventDefault();
		$(".city").toggle(300);
	});
	//点击选择区县
	$(".city-div1").on("click",function(){
		$(".city-bottom-a").show();
		$(".city-bottom-b").hide();
	});
	$(".city-div2").on("click",function(){
		$(".city-bottom-b").show();
		$(".city-bottom-a").hide();
	});
	//关闭区
	$(".city-div1 a").on("click",function(e){
		e.preventDefault();
		$(".city-botstom-a").hide();
		$(".city-bottom-b").hide();
	})
	/*地图模式*/
	$("#maps-all").on("click",function(){
		$("#maps").show();
	  	maps();
	});
	/*隐藏地图*/
	$("#maps>div>h3>a").on("click",function(e){
		e.preventDefault();
		$("#maps").hide();
	});

	//图片轮播
	var index = 0;
	var timer = setInterval(function(){
		index++;
		if(index==5){index= 0};
		$(".imgLb").animate({"left":index*(-1200)},3000)
	},5000);

	//热门手机回收
	ajaxall();
	//二手手机回收
	ajaxall1();
	//商家列表
	shopList();
	//城市列表
	citys();
	//店铺搜索框
	seo();
	//城市列表北京
	citysBj();
	xsj();
	//修手机
	xdn();
	//卖手机
	msja();

	//翻页工具
	function page(pageId, pageSize, totleNum, currentPage){
		//向上取整页数
		var pageCount = Math.ceil(totleNum/pageSize),
		//设置当前页变量
			currentPage = currentPage || "1",
		//设置需要隐藏的翻页标签
			barFrame = '<a href="###" style="display:none;" class="pUp">首页</a>'+
					   '<a href="###" style="display:none;" class="pu">上一页</a>'+
					   '<a href="###" style="width:115px;" class="pd">下一页</a>'+
					   '<a href="###" style="width:44px; " class="pDown">尾页</a>',
			tmp = currentPage <=5 ? 1 : (currentPage-4),
			str = "";
		$("#"+pageId).html(barFrame);
		for(var n= 1; tmp<= pageCount && n<=10; n++){
			str += '<a href="##">'+tmp+'</a>';
			tmp++;
		}
		$("#"+pageId).find("a:eq(1)").after(str);
		var list = $("#"+pageId).find("a");
		for(var i=0;i<list.length;i++){
			if(list.eq(i).text() == currentPage){
				list.eq(i).addClass("pageCss").siblings("a").removeClass("");
			};
			//当前页大于第一页的时候让上一页按钮出现
			if(currentPage>1){
				$(".pu").show();
			};
			//当前页大于中间页数的时候让首页按钮出现
			if(currentPage>= 4){
				$(".pUp").show();
			};
			//当前页大于倒数第四页的时候使下一页隐藏
			if(currentPage >= pageCount-4){
				$(".pd").hide();
			};
			//当前页大于倒数第十页的时候使尾页隐藏
			if(currentPage >= pageCount-10){
				$(".pDown").hide();
			};
		};
		//点击翻页事件
		$("#"+pageId).find("a").on("click",function(){
			switch ($(this).text()){
				case "首页":
					page(pageId, 5, 499, 1);
					break;
				case "上一页":
					page(pageId, 5, 499, currentPage-1);
					break;
				case "下一页":
					page(pageId, 5, 499, currentPage+1);
					break;
				case "尾页":
					page(pageId, 5, 499, pageCount);
					break;
				default:
					page(pageId, 5, 499, 	parseInt($(this).text()));
					break;
			};
		});
	}
	page("page", 5, 499 ,1);

});
	


	//修手机
function xsj(){
	sendRequest("post", "data/xiusj.json", true, {}, x);
	function x(data){
		var html = baidu.template("xsja", data);
		document.getElementById('xsjaa').innerHTML += html;
	}
};
	//修电脑
function xdn(){
	sendRequest("post","data/xdn.json", true, {}, d);
	function d(data){
		var html = baidu.template("xdna",data),
			html1 = baidu.template("xdnb",data);
		document.getElementById("xdnaa").innerHTML += html;
		document.getElementById("xdnbb").innerHTML += html1;
	}
};
	//卖手机
function msja(){
	sendRequest("post","data/msj.json",true,{},m);
	function m(data){
		var html = baidu.template("msja",data);
		document.getElementById("msjaa").innerHTML += html;
	}
};
	//热门手机回收
function ajaxall(){
	sendRequest("post","data/renmenhuishou.json",true,{},remen);
	function remen(data){
		var html = baidu.template('result-top',data);
		document.getElementById('result').innerHTML += html;
	};
};
	//二手手机回收
function ajaxall1(){
	sendRequest("post","data/ershousj.json",true,{},ershou);
	function ershou(data){
		var html1 = baidu.template('result-bottom',data);
		document.getElementById("result1").innerHTML += html1;
	}
};

	//商家列表
function shopList(){
	sendRequest("post","data/shopList.json",true,{},shop_list);
	function shop_list(data){
		var html = baidu.template('shop',data);
		document.getElementById("paixu1").innerHTML += html;
	}
};
	//城市列表
function citys(){

	sendRequest("post","data/cityList.json", true, {}, ccc)
	function ccc(data){
		var html = baidu.template('citycity',data);
		document.getElementById("result").innerHTML += html;
			/*城市列表点击事件*/
	$(".closea").on("click",function(e){
		e.preventDefault();
		$(".city").hide(300);
	})
	$(".zimu>a").on("click",function(e){
		e.preventDefault();
		$(".zimu1>p").eq($(".zimu>a").index($(this))).show().siblings("p").hide();
	})
	}
};
	//城市列表北京
function citysBj(){
	sendRequest("post","data/cityList.json", true, {}, a)
	function a(data){
		var html = baidu.template('citya',data);
		document.getElementById("a").innerHTML += html;
			/*城市列表点击事件*/
	$(".closea").on("click",function(e){
		e.preventDefault();
		$(".city-bottom-a").hide(300);
	})
	$(".zimu>a").on("click",function(e){
		e.preventDefault();
		$(".zimu1>p").eq($(".zimu>a").index($(this))).show().siblings("p").hide();
	})
	}
};

//地图列表
function maps(){
	var map = new AMap.Map("container",{
        resizeEnable:true,
        zoom:11,
        content:[116.397428, 39.90923]
    });

    //中英文
    map.setLang("zh_en")

   //获取工具栏
    var scale = new AMap.Scale();
    map.addControl(scale);
    var toolBar = new AMap.ToolBar();
    map.addControl(toolBar);
    var overView = new AMap.OverView();
    map.addControl(overView);

    document.getElementById("query").onclick = function(){
    	var cityName = document.getElementById("cityName").value || "北京";
    	map.setCity(cityName);
    };

    var clickEvent = map.on("click",function(e){
    	  document.getElementById("lnglat").value = e.lnglat.getLng() + ',' + e.lnglat.getLat()
    });

    var auto = new AMap.Autocomplete({
    	input: "tipinput"
    });
    AMap.event.addListener(auto,"select",function(e){
    	if(e.poi && e.poi.location){
    		map.setZoom(20);
    		map.setCenter(e.poi.location);
    	}
    });

    //点标注
    var icon = new AMap.Icon({
    	image:'images/mapBZ.png',
    	size : new AMap.Size(22,29)
    });
    var marker = new AMap.Marker({
    	icon : icon,
    	map: map,
    	position:[116.65947318,39.89266176]
    });
}

// 店铺搜素框
function seo(){
	 var auto = new AMap.Autocomplete({
    	input: "inputInfo"
    });
    AMap.event.addListener(auto,"input",function(e){
    	if(e.poi && e.poi.location){
    		map.setCenter(e.poi.location);
    	}
    });
};

