$(function () {
    Common.prototype.checkLoginStatu();

	$('#changeUser').on('click', function () {
		YDUI.dialog.confirm('确认', '确认切换账号？', function () {
			window.location.href = "/mobile/login.html";
		});
	});
    $('#changePassword').on('click', function () {
        window.location.href = "/mobile/my/changePassword.html";
    });
    $('#notice').on('click', function () {
        window.location.href = "/mobile/my/notice.html";
    });
    $('#myAbnormity').on('click', function () {
        window.location.href = "/mobile/my/myAbnormity.html";
    });
    getUserInfo();
});

function getUserInfo() {
    let userName = YDUI.util.localStorage.get('name');
    let userCode = YDUI.util.localStorage.get('code');
    $("#userName").html(userName);
    $("#userCode").html(userCode);
}


var My = function () {};
My.prototype = {
    
}

window.my = new My();