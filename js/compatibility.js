// 创建xhr对象
function creatXhr(){
			if(typeof XMLHttpRequest != "undefined"){
				return new XMLHttpRequest();
			}else if(typeof ActiveXObject != "undefined"){
				var strList = ["MSXML.XMLHttp.6.0","MSXML.XMLHttp.3.0","MSXML.XMLHttp"],
				tmp = "";
				for (var n in strList){
					//异常处理，try中代码出现异常会执行catch中的代码，而不会影响到外部后续代码执行
					try{
						new ActiveXObject(strList[n]);
						var tmp = strList[n];
						break;
					}catch(e){
						console.log(e);
					}
				}
				if(tmp = ""){
					console.log("您的浏览器目前不支持ajax请求！");
				}else{
					return new ActiveXObject(tmp);
				}
			}else{
				console.log("您的浏览器目前不支持ajax请求！")
			}
		}
/*封装公共函数请求
	typ：get/post
	url：请求路径
	isSyn：true 异步  false  同步
	data：上送参数对象
	callback：回调函数
*/
function sendRequest(type, url, isSyn, data, callback){
			//创建请求对象
			var xhr = creatXhr();
			//绑定readyState监听事件
			xhr.onreadystatechange = function(){
				if(xhr.status == "200" || xhr.status == "304"){
					if(xhr.readyState == "4"){
						callback && callback(JSON.parse(xhr.responseText));
					}
				}
			};
			if(type == "get"){
				url += "?";
				for(var n in data){
					//循环的是什么 https://www.baidu.com/s?cl=3&wd=轩辕剑之天之痕&ie=utf-8     url=url+(n+"="+data[n]+"&");
					url += 	(n +"="+data[n]+"&");
				}
				url = url.substr(0, url.length-1);
			}else{
				data = JSON.stringify(data);
			}
			//请求对象初始化
			xhr.open(type, url, isSyn);
			//发送请求
			//判断这个传输方式   如果传输方式是get则返回null      
			xhr.send(type == "get"?null: data);
		};
