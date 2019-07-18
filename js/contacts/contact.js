$(document).ready(function () {
    Common.prototype.checkLoginStatu();
});

$(function () {
    $(".back").on("click", Common.prototype.Back);
    Contacts.prototype.loadContacts();
});

var Contacts = function () {};

Contacts.prototype.loadContacts = function () {
    var binding = Cookies.prototype.GetCookie('binding');
    var id = Common.prototype.GetQueryString("id");
    $(".projectSurvey-tit").find("a").each(function(){
        $(this).attr("href",$(this).attr("href").replace("[id]",id))
    });
    var expressions = "id = '" + id + "'";
    var params = "serviceName=cqueryWithRoleRight&objectApiName=Contact&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding + "&isAddDelete=" + false;

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
                        var contacts = data.data[0];
                        $("#khmc").html(contacts.khmcccname);
                        $("#xb").html(contacts.chengwei);
                        $("#lxrxm").html(contacts.name);
                        $("#age").html(contacts.nj);
                        $("#zhiwu").html(contacts.zhiwu);
                        $("#lxfs").html(varIsNull(contacts.shouji)?"":"<a href='tel:"+contacts.shouji+"'>"+contacts.shouji+"</a>");
                        $("#getWx").html(contacts.sfhqwx);
                        $("#bm").html(contacts.bm);
                        $("#bumen").html(contacts.bumen);
                        $("#dwstd").html(contacts.attitude);
                        $("#cj").html(contacts.hierarchies);
                        $("#csd").html(contacts.maturity);
                        $("#yxl").html(contacts.yxl);
                        $("#js").html(contacts.contactrole);
                        $("#sflgscg").html(contacts.sflgscg);
                        $("#xhjh").html(contacts.xhjh);
                        $("#pj").html(contacts.beizhu);
                        $("#syr").html(contacts.owneridccname);
                        $("#zhxgr").html(contacts.lastmodifybyidccname + "," + contacts.lastmodifydate);
                        $("#cjr").html(contacts.createbyidccname + "," + contacts.createdate);
                        $("#lxcs").html(contacts.lxcs);
                        $("#zjlx").html(contacts.zjycbfsj);
                        $("#wlxts").html(contacts.wlxts);
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