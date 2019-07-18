var appid = "wx801c8497db1d7b36";
var AppSecret = "e50512c17713bb49f8bc2fa1a7951a5d";
var openid = "";
var access_token = "";
var ticket = "";
var access_token_wyrz = "";
var refresh_token = "";
var mywx = function () {}

mywx.prototype = {
	getRequest:function (){
		var url = location.search; //获取url中"?"符后的字串   
		var theRequest = new Object();   
		if (url.indexOf("?") != -1) {   
			var str = url.substr(1);   
			strs = str.split("&");   
			for(var i = 0; i < strs.length; i ++) {
				theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);   
			}   
		}   
		return theRequest;
	},
    getOpenid: function (code) {
		$.ajax({
			type: "get",
			async:false,
			//dataType: "json",
			url: "http://market.bhome.com.cn/php/agency.php",
			data: "apiurl=https%3a%2f%2fapi.weixin.qq.com%2fsns%2foauth2%2faccess_token%3fappid%3d"+appid+"%26secret%3d"+AppSecret+"%26code%3d"+code+"%26grant_type%3dauthorization_code",
			success: function (result) { 
				if (result) {
					result = eval('(' + result + ')');
					openid = result.openid;
					access_token_wyrz = result.access_token;
					refresh_token = result.refresh_token;
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				alert(XMLHttpRequest.status);
				alert(XMLHttpRequest.readyState);
				alert(textStatus);
			}
		});
    },
	refresh_token:function (){
		$.ajax({
			type: "get",
			//dataType: "json",
			url: "http://market.bhome.com.cn/php/agency.php",
			data: "apiurl=https%3a%2f%2fapi.weixin.qq.com%2fsns%2foauth2%2frefresh_token%3fappid%3d"+appid+"%26grant_type%3drefresh_token%26refresh_token%3d"+refresh_token,
			success: function (result) {  
				if (result) {
					result = eval('(' + result + ')');
					access_token_wyrz = result.access_token;
					refresh_token = result.refresh_token;
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				alert("refresh_token:"+XMLHttpRequest.status);
				alert("refresh_token:"+XMLHttpRequest.readyState);
				alert("refresh_token:"+textStatus);
			}		
		});
	},
	gettoken:function(){//废弃不用，微信有严格的获取次数限制
		$.ajax({
			type: "get",
			//dataType: "json",
			url: "http://market.bhome.com.cn/php/agency.php",
			data: "apiurl=https%3a%2f%2fapi.weixin.qq.com%2fcgi-bin%2ftoken%3fgrant_type%3dclient_credential%26appid%3d"+appid+"%26secret%3d"+AppSecret,
			success: function (result) {  
				if (result) {
					result = eval('(' + result + ')');
					access_token = result.access_token;
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				alert("gettoken:"+XMLHttpRequest.status);
				alert("gettoken:"+XMLHttpRequest.readyState);
				alert("gettoken:"+textStatus);
			}		
		});	
	},
	getticket:function(){//废弃不用，微信有严格的获取次数限制
		$.ajax({
			type: "get",
			//dataType: "json",
			url: "http://market.bhome.com.cn/php/agency.php",
			data: "https%3a%2f%2fapi.weixin.qq.com%2fcgi-bin%2fticket%2fgetticket%3faccess_token%3d"+access_token+"%26type%3djsapi",
			success: function (result) {  
				if (result) {
					result = eval('(' + result + ')');
					ticket = result.ticket;
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				alert("getticket:"+XMLHttpRequest.status);
				alert("getticket:"+XMLHttpRequest.readyState);
				alert("getticket:"+textStatus);
			}		
		});			
	},
	getsecret:function(){
		$.ajax({
			type: "get",
			//dataType: "json",
			url: "/tp5.1/public/index.php/getsecret/"+appid,
			async:false,
			success: function (result) {  
				if (result) {
					//result = eval('(' + result + ')');
					console.log(result);
					access_token=result.access_token;
					ticket = result.ticket;
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				alert("getticket:"+XMLHttpRequest.status);
				alert("getticket:"+XMLHttpRequest.readyState);
				alert("getticket:"+textStatus);
			}		
		});			
	},
	updateremark:function (para){
		$.ajax({
			type: "post",
			//dataType: "json",
			url: "http://market.bhome.com.cn/php/agency_.php",
			data: {
				"apiurl":"https://api.weixin.qq.com/cgi-bin/user/info/updateremark?access_token="+access_token,
				"para":para
			},
			success: function (result) {  
				result = eval('(' + result + ')');
				if(result.errcode!=0){
					alert("修改备注失败："+result.errcode+"-"+result.errmsg);
				}

			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				alert("修改备注失败"+XMLHttpRequest.status);
				/*alert("refresh_token:"+XMLHttpRequest.status);
				alert("refresh_token:"+XMLHttpRequest.readyState);
				alert("refresh_token:"+textStatus);*/
			}		
		});		
	},
	login_ai:function(openid){
		$.ajax({
			type: "get",
			//dataType: "json",
			url: "/tp5.1/public/index.php/getUser/"+openid,
			success: function (result) {  
				//console.log(result);
				if(result){
					//alert(result.cloud_num);
					//alert(result.cloud_pwd);
					//result = eval('(' + result + ')');
					$('#username').val(result.cloud_num);
					$('#password').val(result.cloud_pwd);
					checkandsubmit(false);
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				alert("访问getUser失败"+XMLHttpRequest.status);
				/*alert("refresh_token:"+XMLHttpRequest.status);
				alert("refresh_token:"+XMLHttpRequest.readyState);
				alert("refresh_token:"+textStatus);*/
			}		
		});		
	},
	insertUser:function(user){;
		//console.log(user);
		$.ajax({
	        type: "post",
	        //dataType: "json",
	        url: '/tp5.1/public/index.php/user/insert',
	        data: user,
	        success: function (result) {
	        	console.log(result);
	        },
	        error: function(XMLHttpRequest, textStatus, errorThrown) {
	    			
	        }
	    });		
	},
	customSend:function(sendData){
		$.ajax({
	        type: "post",
	        //dataType: "json",
	        url:'http://market.bhome.com.cn/php/agency_.php',
	        data: {
				"apiurl":"https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token="+access_token,
				"para":sendData
			},
	        success: function (result) {
	        	console.log(result);
	        },
	        error: function(XMLHttpRequest, textStatus, errorThrown) {
	    			
	        }
	    });			
	},
	sendTemplate:function(sendData){
		$.ajax({
	        type: "post",
	        //dataType: "json",
	        url:'http://market.bhome.com.cn/php/agency_.php',
	        data: {
				"apiurl":"https://api.weixin.qq.com/cgi-bin/message/template/send?access_token="+access_token,
				"para":sendData
			},
	        success: function (result) {
	        	console.log(result);
	        },
	        error: function(XMLHttpRequest, textStatus, errorThrown) {
	    			
	        }
	    });			
	}

}

window.mywx = new mywx();
mywx.getOpenid(mywx.getRequest().code);
mywx.getsecret();

/*setTimeout(function(){
	var para11={};
		para11.touser="oJXZn1KzRHGutIagNWCTaVAGHNyI";
		para11.template_id="7NHthAFfJUZwK12uBsZIgYJUMx3bBghdrAta8fPfBMc";
		para11.url="http://www.baidu.com/";
		para11.data={
			"first":{"value":"项目编号：7312568201806F"},
			"keyword1":{"value":"测试项目"},
			"keyword2":{"value":"张庆华"},
			"keyword3":{"value":"已完成项目立项"},
			"remark":{"value":"请及时跟进项目"}
		};
	mywx.sendTemplate(para11);
},2000);*/

//mywx.getUserInfo("1234");
//setInterval(function(){mywx.refresh_token();},6000*1000);
//mywx.gettoken();
/*setTimeout(function(){
	//mywx.updateremark(para11);
	var para11={};
	para11.touser="oJXZn1KzRHGutIagNWCTaVAGHNyI";
	para11.msgtype="text";
	var content_text={};
	content_text.content="<a href='http://www.baidu.com'>百度</a>";
	para11.text=content_text;
	console.log(para11);
	mywx.customSend(para11);
},2000);*/
//var para11={};
//para11.remark="我叫XXX";