$(document).ready(function(){
    Common.prototype.checkLoginStatu();
});

var isEdit = false;
$(function () {
    AddContactsRole.prototype.LoadContactsRole();
    $("#contacts_save").on("click", AddContactsRole.prototype.SaveContactsRole);
    if(!isEdit)
    {
        var name = Cookies.prototype.GetCookie('name');
        $("#owner").html(name);
    }
    
})

var AddContactsRole = function () {};

AddContactsRole.prototype.SaveContactsRole = function () {
    var binding = Cookies.prototype.GetCookie('binding');
    var proId = Common.prototype.GetQueryString("proId");
    if (varIsNull(proId) && !isEdit) {
        layer.msg("关联项目获取失败！");
        return;
    }
    var lxrxm = $("#lxrxm").val();
    if (varIsNull(lxrxm)) {
        layer.msg("联系人姓名不能为空");
        return false;
    }

    var jaose = $("#jaose").val();
    if (varIsNull(jaose)) {
        layer.msg("角色不能为空");
        return false;
    }

    var contactsId = Common.prototype.GetQueryString("contactsId");
    var lxrxmId = $("#lxrxmId").val();
    var jaose = $("#jaose").val();
    var zylxr = ($("#zylxr").val() == "是" ? true : false);
    var data_lxr = "[{";
    if(isEdit){
        data_lxr += "\"id\":\"" + contactsId + "\",";
    }else{
        data_lxr += "\"glxm\":\"" + proId + "\",";
    }
    data_lxr += "\"lxrxm\":\"" + lxrxmId + "\"";
    data_lxr += ",\"js\":\"" + jaose + "\"";
    data_lxr += ",\"sfzylxr\":\"" + zylxr + "\"";    
    data_lxr += "}]";
    var params = "";

    if(isEdit){
        params = "serviceName=updateWithRoleRight&objectApiName=lxrjs&data=" + encodeURIComponent(data_lxr) + "&binding=" + binding;
    }else{
        params = "serviceName=insertWithRoleRight&objectApiName=lxrjs&data=" + encodeURIComponent(data_lxr) + "&binding=" + binding;
    }
    

    $.ajax({
        type: "post",
        dataType: "json",
        url: url,
        data: params,
        success: function (data) {
            //加载联系人名称
            if (data != "") {
                if (data.result) {
                    layer.msg("联系人角色保存成功", function () {
                        if(isEdit){
                            window.location.href = "/crm/project/contactsRole.html?id=" + contactsId;
                        }
                        else{
                            window.location.href = "/crm/project/contactsRoleList.html?proId=" + proId;
                        }
                        
                    });
                    return;
                } else {
                    layer.msg(data.returnInfo);
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //debugger;
        }
    });
}

AddContactsRole.prototype.LoadContactsRole = function () {
    var binding = Cookies.prototype.GetCookie('binding');
    var id = Common.prototype.GetQueryString("contactsId");
    if (varIsNull(id)) {
        return;
    } else {
        isEdit = true;
        $("title").html("远大住工-编辑联系人角色");
        $(".title_center").html("编辑联系人角色");
        $("#num_show").removeClass("none");
        oldTitle = "编辑联系人角色";
    }
    var expressions = "id = '" + id + "'";
    var params = "serviceName=cqueryWithRoleRight&objectApiName=lxrjs&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding + "&isAddDelete=" + false;

    var index = layer.load(1, {
        shade: false
    });
    $.ajax({
        type: "get",
        dataType: "json",
        url: url,
        data: params,
        success: function (data) {
            if (data != "") {
                if (data.result) {
                    if (data.data.length > 0) {
                        var contactsRole = data.data[0];                        
                        $("#bh").html(contactsRole.name);                        
                        $("#lxrxm").val(contactsRole.lxrxmccname);
                        $("#lxrxmId").val(contactsRole.lxrxm);
                        $("#zylxr").val(contactsRole.sfzylxr == "true" ? "是" : "否");
                        $("#jaose").val(contactsRole.js);
                        $("#owner").html(contactsRole.owneridccname);
                        
                    } else {
                        // layer.msg("没有更多数据了！");
                    }
                    layer.close(index);
                    return;
                } else {
                    layer.msg(data.returnInfo);
                }
            }
            layer.close(index);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //debugger;
            layer.close(index);
        }
    });
}