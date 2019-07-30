var url = "http://127.0.0.1:8888";

$(function () {
	$("#footer_header").on("click",function(){
		location.href='/mobile/index.html';
	});
	$("#footer_data").on("click",function(){
		location.href='/mobile/data/dataBoard_new.html';
	});
	$("#footer_share").on("click",function(){
		location.href='/mobile/behavior/share.html';
	});
	$("#footer_my").on("click",function(){
		location.href='/mobile/my/my.html';
	});
//     $(".tabbar-item").on("click", function () {
//         if ($(this).hasClass("tabbar-active")) {
//
//         } else {
//             $(".tabbar-item").removeClass("tabbar-active");
//             $(this).addClass("tabbar-active");
//         }
//     });
    // var name = Cookies.prototype.GetCookie('name');
    // $(".loginname").html(name);
    // common.projectUpdateRemind();
	let code = Common.prototype.GetQueryString("code");
	if(code){
		localStorage.setItem("wxcode",code);
	}

});

var Common = function () {};
//显示遮罩层
Common.prototype.ShowMaskLayer = function () {
    $(".masked").css("display", "block");
    $(document.body).css("overflow", "hidden");
};

//关闭遮罩层
Common.prototype.CloseMaskLayer = function (style, callBack) {
    $(".masked").css("display", "none");
    $(document.body).css("overflow", "visible");
    if (style != null && style != undefined && style != "") {
        $("." + style).css("display", "none");
    }

    if (callBack != null && callBack != undefined && callBack != "") {
        callBack();
    }
};

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

Common.prototype.GetQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = encodeURI(window.location.search).substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

Common.prototype.ScrollToTop = function (obj) {
    $("." + obj).animate({
        scrollTop: 0
    }, 'slow');
}

Common.prototype.checkLoginStatu = function () {
    let cookiesoperation = new Cookies();
    let token = cookiesoperation.GetCookie('TOKEN_KEY');
    if (varIsNull(token)) {
       window.location.href = "/mobile/login.html?return=" + window.location.href;
    }
};

Common.prototype.loginOut = function () {
    var cookiesoperation = new Cookies();
    var binding = cookiesoperation.GetCookie('binding');
    if (binding != null) {
        $.ajax({
            type: "post",
            dataType: "json",
            url: url,
            data: "serviceName=isValidWithBinding&binding=" + binding,
            success: function (data) {
                if (data != "") {
                    if (data.result && data.data != null && data.data.isValid) {
                        //登录未失效，退出时调用服务器登出接口
                        //todo 未找到登出接口

                    }
                }
                //删除cookie
                cookiesoperation.DeleteCookie('binding');
                //跳转到登录页面
                window.location.href = "/crm/login.html";
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });
    }
};

Common.prototype.dateFtt = function(fmt,date) {
	var o = {
    "M+" : date.getMonth()+1,                 //月份
    "d+" : date.getDate(),                    //日
    "h+" : date.getHours(),                   //小时
    "m+" : date.getMinutes(),                 //分
    "s+" : date.getSeconds(),                 //秒
    "q+" : Math.floor((date.getMonth()+3)/3), //季度
    "S"  : date.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}
/**
 * Cookie 操作
 * 增加，获取，删除
 */

var Cookies = function () {};
Cookies.prototype.getCookieVal = function (offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1) {
        endstr = document.cookie.length;
    }
    return unescape(document.cookie.substring(offset, endstr));
};
Cookies.prototype.GetCookie = function (name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg) {
            return Cookies.prototype.getCookieVal(j);
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) {
            break;
        }
    }
    return null;
};
Cookies.prototype.SetCookie = function (name, value, expires, path, domain, secure) {
    document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + expires.toUTCString())) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");
};
Cookies.prototype.DeleteCookie = function (name) {
    var cval = Cookies.prototype.GetCookie(name);
    if (cval == null) {
        return;
    }
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    Cookies.prototype.SetCookie(name, "", exp, "/");
};

Common.prototype.isContains = function (str, substr) {
    return str.indexOf(substr) >= 0;
};

Common.prototype.startWith = function (str, substr) {
    var reg=new RegExp("^"+substr);
    return reg.test(str);
};

Common.prototype.Back = function () {
    history.back(-1);
};

//添加逗号
Common.prototype.NumFormat = function (num) {
    return (num + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}

//返回要显示的金额字符串
Common.prototype.formatMoney = function(money){
	var reg=/^[0-9]+.?[0-9]*$/;
	if(!reg.test(money)){
		return false;
	}else{
		if(money>100000000){
			money = money/100000000.0;
			money = Math.round(money*100)/100;
			return money+"亿";
		}else if(money>10000){
			money = money/10000.0;
			money = Math.round(money*100)/100;
			return money+"万";
		}else{
			money = Math.round(money*100)/100;
			return money+"元";
		}
	}
}

//获取选中季度的第一天
Common.prototype.getFirstQuarterDay = function (year, quarter) {
    var firstdate = "";
    if (quarter == "1") {
        firstdate = year + '/' + 01 + '/01';
    } else if (quarter == "2") {
        firstdate = year + '/' + 04 + '/01';
    } else if (quarter == "3") {
        firstdate = year + '/' + 07 + '/01';
    } else if (quarter == "4") {
        firstdate = year + '/' + 10 + '/01';
    }
    return firstdate;
}

//获取选中季度的最后一天
Common.prototype.getLastQuarterDay = function (year, quarter) {
    var lastdate = "";
    if (quarter == "1") {
        var day = new Date(year, 3, 0);
        lastdate = year + '/' + 03 + '/' + day.getDate(); //获取第一季度最后一天日期
    } else if (quarter == "2") {
        var day = new Date(year, 6, 0);
        lastdate = year + '/' + 06 + '/' + day.getDate(); //获取第二季度最后一天日期
    } else if (quarter == "3") {
        var day = new Date(year, 9, 0);
        lastdate = year + '/' + 09 + '/' + day.getDate(); //获取第三季度最后一天日期
    } else if (quarter == "4") {
        var day = new Date(year, 12, 0);
        lastdate = year + '/' + 12 + '/' + day.getDate(); //获取第四季度最后一天日期
    }
    return lastdate;
}

//获取月有哪些周数
Common.prototype.weekInMonth = function (year,month) {
    var date = new Date(year + "/" + month + "/" + "01");
    var firstWeekDate = 1;// 默认第一周是本月1号  为了模拟本月1号是否为本月第1周的判断
	  if (date.getDay() === 1) { // 判断1号是周一
		  firstWeekDate = 1;
	  } else if (date.getDay() === 0) { // 判断1号是周日
		  firstWeekDate = 8 - 7 + 1;
	  } else { // 判断1号是周二至周六之间
		  firstWeekDate = 8 - date.getDay() + 1;
	  }
	  //firstWeekDate 第一周开始日期
	  //date.setDate(firstWeekDate);
	  var firstWeek = this.weekIndexInYear(date);
	  date.setMonth(date.getMonth()+1);
	  date.setDate(0);
	  var lastWeek = this.weekIndexInYear(date);
	  var weeks = [];
	  for(var i=firstWeek;i<=lastWeek;i++){
		  weeks.push(i);
	  }
	  // var monthHasDays = date.getDate();// 本月天数
	  // monthHasDays = date.getDate() - firstWeekDate + 1;
	  // var hasWeek = Math.ceil(monthHasDays/7); // 计算本月有几周
	  return weeks;
}

Common.prototype.weekIndexInYear = function (nowDate) {
    //var nowDate = new Date(this != '' ? this : new Date());
    var initTime = new Date(nowDate);//new Date(this != '' ? this : new Date());
    initTime.setMonth(0); // 本年初始月份
    initTime.setDate(1); // 本年初始时间
    var firstWeekDay = 7;// 第一周的天数，默认第一周是7天
//     if (initTime.getDay() === 1) { // 判断1号是周一
//         firstWeekDay = 7;
//     } else if (initTime.getDay() === 0) { // 判断1号是周日
//         firstWeekDay = 1;
//     } else { // 判断1号是周二至周六之间
//         firstWeekDay = 7 - initTime.getDay();
//     }
	firstWeekDay = 7 - initTime.getDay();
    var differenceVal = nowDate - initTime ; // 今天的时间减去本年开始时间，获得相差的时间
    var todayYear = Math.ceil(differenceVal/(24*60*60*1000)) + 1; // 获取今天是今年第几天
    var index = 1;
    if(todayYear <= firstWeekDay){
        index = 1;
    }else{
        index = Math.ceil((todayYear - firstWeekDay)/7) + 1; // 获取今天是今年第几周
    }
    return index;
};

//项目更新提醒功能
Common.prototype.projectUpdateRemind = function(){
    var footer = $("#footer");
    var project = $("#footer div").eq(2);
    if(footer.length == 0 || project.length == 0){
        return;
    }
    var roleId = Cookies.prototype.GetCookie('roleId');
    var binding = Cookies.prototype.GetCookie('binding');
    var expressions = "select count(1) as updatenum from xmbb o left join ccuser u on o.ownerid=u.id where o.is_deleted <> '1' and o.dqjd !='0-销项项目' and u.role in (select roleid from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) and txcs < 3 and xmly = '是'";
    var params = "serviceName=cqlQuery&objectApiName=xmbb&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding;
    if (binding != null) {
        //验证登录状态是否有效
        $.ajax({
            type: "get",
            dataType: "json",
            url: url,
            data: params,
            success: function (data) {
                if (data != "") {
                    if (data.result && data.data != null && data.data.length > 0 && Number(data.data[0].updatenum) > 0) {
                        $("#footer").addClass("projectUpdate");
                        return;
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });
    } else {

    }
}

//去除字符串头尾空格或指定字符
String.prototype.Trim = function (c) {
    if (c == null || c == "") {
        var str = this.replace(/^s*/, '');
        var rg = /s/;
        var i = str.length;
        while (rg.test(str.charAt(--i)));
        return str.slice(0, i + 1);
    }
    else {
        var rg = new RegExp("^" + c + "*");
        var str = this.replace(rg, '');
        rg = new RegExp(c);
        var i = str.length;
        while (rg.test(str.charAt(--i)));
        return str.slice(0, i + 1);
    }
}
//去除字符串头部空格或指定字符
String.prototype.TrimStart = function (c) {
    if (c == null || c == "") {
        var str = this.replace(/^s*/, '');
        return str;
    }
    else {
        var rg = new RegExp("^" + c + "*");
        var str = this.replace(rg, '');
        return str;
    }
}

//去除字符串尾部空格或指定字符
String.prototype.TrimEnd = function (c) {
    if (c == null || c == "") {
        var str = this;
        var rg = /s/;
        var i = str.length;
        while (rg.test(str.charAt(--i)));
        return str.slice(0, i + 1);
    }
    else {
        var str = this;
        var rg = new RegExp(c);
        var i = str.length;
        while (rg.test(str.charAt(--i)));
        return str.slice(0, i + 1);
    }
}

function varIsNull(obj) {
    if (obj == null || obj == undefined || $.trim(obj) == "") {
        return true;
    }
    return false;
}

function isAuth(param){
	const auth_key = JSON.parse(localStorage.getItem("auth_key"));
	const menus = JSON.parse(localStorage.getItem("menus"));
	if(menus!=null&&menus.indexOf(param)>-1){
		return true;
	}
	if(auth_key!=null&&auth_key.indexOf(param)>-1){
		return true;
	}
	return false;
}

window.common = new Common();

window.axios = axios.create({
	//  baseURL: process.env.BASE_API, // api的base_url
    timeout: 1800000                  // 请求超时时间
});
// request拦截器
axios.interceptors.request.use(config => {
  const token = Cookies.prototype.GetCookie("TOKEN_KEY");
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token // 让每个请求携带token--['Authorization']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
});
// respone拦截器
axios.interceptors.response.use(
  response => {
    const res = response.data
    if(Object.prototype.toString.call(res) == '[object Blob]'){
      return response;
    }else if(res.code === 200){
      return res;
    }else if(res.code === 700){
		window.location.href='/crm/login.html'
		return Promise.reject(res.message)
    }else{
        alert(res.message)
		return Promise.reject(res.message)
    }
  },
  error => {
    console.error('err' + error)// for debug
    return Promise.reject(error)
  }
);
