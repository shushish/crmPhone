let openid = '';

$(function() {
	checkisie6();
	$('#login').on('click', checkandsubmit);
	//用于自动登录
	let code = localStorage.getItem("wxcode");
	axios.post("/api/auth/getOpenid", "code="+code)
	.then(res =>{
		openid = res.data;
		if(openid){
			checkandsubmit("1");
		}
		// debugger
	})
})

function checkisie6() {
	try {
		var v = getExplorer();
		if (v.indexOf("IE6") != -1) {
			alert("你Internet Explorer IE6,IE6已经不被支持.");
		}
	} catch (e) {

	}
}

function checkandsubmit(auto) {
	let url='';
	let params='';
	if(openid&&"1"==auto){
		url = '/api/auth/aiLogin';
		params = 'openid='+openid;
	}else{
		var rurl = varIsNull(Common.prototype.GetQueryString("return")) ? null : decodeURIComponent(Common.prototype.GetQueryString("return"));
		if (!varIsNull(rurl)) {
			rurl += window.location.hash;
		}
		console.log("返回的地点：" + rurl)
		if ($('#username').val() == "") {
			// $('#usernamewrong').html("请输入用户名.");
			layer.msg("请输入用户名");
			return false;
		}
		/*else if (!/^(?=\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$).{0,50}$/.test($('#username').val())) {
		       layer.msg("用户名格式错误");
		       return false;
		   }*/
		if ($('#password').val() == "") {
			layer.msg("请输入登录密码.");
			return false;
		}

		var loginNumber = '0';
		if (loginNumber >= 3) {
			//	return randomCodeIsRight();
		}

		url = '/api/auth/login';
        var expdate = new Date();
        expdate.setTime(expdate.getTime() + (24 * 60 * 60 * 1000));
		params = $("#tableForm").serialize()+'&openid='+openid+'&type=mobile';
	}
		// debugger
	//登录状态
	axios.post(url,params)
	.then(res => {
			var expdate = new Date();
			expdate.setTime(expdate.getTime() + (24 * 60 * 60 * 1000 * 365));
			var cookiesoperation = new Cookies();
			cookiesoperation.SetCookie('TOKEN_KEY', res.data.token, expdate, "/");

			axios.post("/api/user/queryPermission", "type=button")
			.then(res => {
				let auths = [];
				res.data.forEach(item => {
					auths.push(item.perCode);
				});
				localStorage.setItem("auth_key", JSON.stringify(auths));
				axios.post("/api/user/queryPermission", "type=menu")
				.then(res => {
					let menus = [];
					res.data.forEach(item => {
						menus.push(item.perCode);
					});
					localStorage.setItem("menus", JSON.stringify(menus));
					axios.post("/api/user/getUser", "")
					.then(res => {
						// debugger
						localStorage.setItem("company", res.data.companyId+'~'+res.data.companyName);
						localStorage.setItem("title", res.data.title);
						localStorage.setItem("name", res.data.name);
                        localStorage.setItem("code", res.data.userCode);
						if (!varIsNull(rurl)) {
							window.location.href = rurl;
						} else {
							window.location.href = "index.html"
						}

					})
				})
			})
	})

}
