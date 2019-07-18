$(function(){
    checkisie6();
    $('#login').on('click', checkandsubmit);  
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

function checkandsubmit() {
    if ($('#username').val() == "") {
        // $('#usernamewrong').html("请输入用户名.");
        layer.msg("请输入用户名");
        return false;
    } else if (!/^(?=\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$).{0,50}$/.test($('#username').val())) {
        layer.msg("格式错误");
        return false;
    }
    if ($('#password').val() == "") {
        layer.msg("请输入登录密码.");
        return false;
    }

    var loginNumber = '0';
    if (loginNumber >= 3) {
        //	return randomCodeIsRight();

    }

    $.ajax({
        type: "post",
        dataType: "json",
        url: url,
        data: $("#tableForm").serialize(),
        success: function (data) {
            if (data != "") {
                if(!data.result)
                {
                    layer.msg(data.returnInfo);
                }
                else
                {
                    var expdate=new Date();
                    expdate.setTime(expdate.getTime() + (24*60*60*1000*365));
                    var cookiesoperation = new Cookies();
                    cookiesoperation.SetCookie('binding',data.binding,expdate,"/");
                    //cookiesoperation.SetCookie('email',data.userInfo.email);
                    cookiesoperation.SetCookie('userId',data.userInfo.userId,expdate,"/");
                    cookiesoperation.SetCookie('roleId',data.userInfo.roleId,expdate,"/");
                    cookiesoperation.SetCookie('name',data.userInfo.userName,expdate,"/");
                    $.ajax({
                        type: "get",
                        dataType: "json",
                        url: url,
                        data: "serviceName=cquery&objectApiName=user&expressions=" + escape("id='" + data.userInfo.userId + "'") + "&binding=" + data.binding + "&isAddDelete=false",
                        success: function (data) {
                            if (data != "") {
                                if (data.result) {            
                                    if (data.data.length > 0) {
                                        var user = data.data[0];
                                        if(login_ai){
                                        	var user_={};
                                        	user_.user_name=user.name;
                                        	user_.open_id=openid;
                                        	user_.title=user.title;
                                        	user_.company=user.company;
                                        	user_.cloud_id=user.id;
                                        	user_.bhome_num=user.employeenum;
                                        	user_.cloud_num = $('#username').val();
                                        	user_.cloud_pwd = $('#password').val();
                                        	mywx.insertUser(user_);
                                        }
                                        cookiesoperation.SetCookie('role',user.title,expdate,"/");
                                        cookiesoperation.SetCookie('company',user.company,expdate,"/");
                                        cookiesoperation.SetCookie('pjdf',user.pjdf,expdate,"/");                                        
                                    }
                                    var title = Cookies.prototype.GetCookie('role');
                                    if(title == '副总' || title == '总监' || Common.prototype.isContains(title, '客户经理')){
                                        window.location.href = "/crm/index_new.html";
                                    }else{
                                        window.location.href = "/cs/index.html";
                                    }
                                    
                                    return;
                                }
                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            layer.msg(textStatus);
                        }
                    });                  
                    
                }
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            
              }
    });

    return false;
}
