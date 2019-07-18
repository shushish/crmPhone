$(document).ready(function () {
    Common.prototype.checkLoginStatu();
});

$(function () {
    $(".back").on("click", Common.prototype.Back);
    ContactsRole.prototype.loadContactsRole();
});

var ContactsRole = function () {};

ContactsRole.prototype.loadContactsRole = function () {
    var binding = Cookies.prototype.GetCookie('binding');
    var id = Common.prototype.GetQueryString("id");
    var temp = $("#edit").attr("href");
    $("#edit").attr("href",temp + id);
    //var expressions = "id = '" + id + "'";
    var expressions = "select  o.xmbh11 as xmbh,o.name as glxmccname,c.shouji as sj,c.name as lxrxmccname,u.name as createbyidccname,m.name as lastmodifybyidccname,owner.name as owneridccname,l.* from lxrjs l left join xmbb o on l.glxm = o.id left join Contact c on l.lxrxm = c.id left join ccuser u on l.createbyid = u.id left join ccuser m on l.lastmodifybyid = m.id left join ccuser owner on l.ownerid = owner.id where l.id='"+id+"'";

    //var expressions = "select o.xmbh11 as xmbh,o.name as glxmccname,l.* from lxrjs l left join xmbb o on l.glxm = o.id where l.id='"+id+"'";

    //var params = "serviceName=cqueryWithRoleRight&objectApiName=lxrjs&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding + "&isAddDelete=" + false;
    var params = "serviceName=cqlQuery&objectApiName=lxrjs&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding;
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
                        $("#glxm").html("<a href='/crm/project/projectDetail.html?id=" + contactsRole.glxm + "&xmbh="+contactsRole.xmbh+"'>" + contactsRole.glxmccname + "</a>");
                        $("#lxrxm").html(contactsRole.lxrxmccname);
                        $("#zylxr").html(contactsRole.sfzylxr == "true" ? "是":"否");
                        $("#js").html(contactsRole.js);
                        $("#lxfs").html(varIsNull(contactsRole.sj)? "" : "<a href='tel:"+contactsRole.sj+"'>"+contactsRole.sj+"</a>");
                        $("#cjr").html(contactsRole.createbyidccname);
                        $("#zhxgr").html(contactsRole.lastmodifybyidccname);
                        $("#syr").html(contactsRole.owneridccname);
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
};