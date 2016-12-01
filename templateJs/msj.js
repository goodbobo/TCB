
$(function(){
	//买手机
	$(".mesj").hover(function(){
		$(".mesj1").load("template/msj.html",function(){
			sendRequest("get","data/sjm.json",true,{},ershou);
		})
	})

	//卖手机
	$(".msj").hover(function(){
		$(".msj1").load("template/msj1.html",function(){
			sendRequest("post","data/msj.json",true,{},msja)
		})
	})


})

function ershou(data){
	var html = baidu.template("sjma",data);
	$("#sjmaa").html(html);
}

function msja(data){
	var html = baidu.template("msja",data);
	$("#msjaa").html(html);
}


