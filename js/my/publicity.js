$(document).ready(function () {
    Common.prototype.checkLoginStatu();
});

$(function () {
    $(".back").on("click", Common.prototype.Back);
    $("#submit").on("click", p.saveMessage);
    p.loadData();
    p.loadMessage();
});

var Publicity = function () {};

Publicity.prototype = {
    loadData: function () {
        var id = Common.prototype.GetQueryString("id");
        var binding = Cookies.prototype.GetCookie('binding');
        var expressions = "id = '" + id + "'";
        var params = "serviceName=cqueryWithRoleRight&objectApiName=tzgg&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding + "&isAddDelete=" + false;
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
                        $("#publicityNum").html(data.data.length);
                        //$("#publicityList").html("");
                        if (data.data.length > 0) {
                            //var html = "";
                            var tzgg = data.data[0];
                            $(".title_gg").html(tzgg.name);
                            $(".type_gg").html("类型：" + tzgg.lx);
                            $(".content_gg").html(tzgg.nr);
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
    },
    loadMessage: function () {
        var id = Common.prototype.GetQueryString("id");
        var binding = Cookies.prototype.GetCookie('binding');
        var expressions = "relatedid = '" + id + "' and attachtype = 'remark' order by createdate desc";
        var params = "serviceName=cqueryWithRoleRight&objectApiName=Attachement&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding + "&isAddDelete=" + false;
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
                        $("#xmlxNum").html(data.data.length);
                        $("#sjhtNum").html(data.data.length);
                        //$("#contactsRoleList").html("");
                        if (data.data.length > 0) {
                            var html = "";
                            data.data.forEach(function (value, index) {
                                html += '<div class="message flexLayout">';
                                html += '<div class="info">';
                                html += '<img class="photo" src="/crm/image/icon/nophoto.gif">';
                                html += '<div class="name">' + value.createbyidccname + '</div>';
                                html += '</div>';
                                html += '<div class="content_all flexItem flexLayoutColumn">';
                                html += '<div class="content_message flexItem">' + value.description + '</div>';
                                html += '<div class="time">' + value.createdate + '</div>';
                                html += '</div>';
                                html += '</div>';
                            });
                            $(".messageList").html(html);
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
    },
    saveMessage: function () {
        var id = Common.prototype.GetQueryString("id");
        var binding = Cookies.prototype.GetCookie('binding');
        var canClick = true;
        var msg = $("#message_content").val();
        if (varIsNull(msg)) {
            layer.msg("评论不能为空！");
            return false;
        }
        layer.confirm('确定提交留言？', {
            btn: ['确定', '取消'] //按钮
        }, function () {
            var data = "[{";
            data += "\"relatedid\":\"" + id + "\"";
            data += ",\"attachtype\":\"remark\"";
            data += ",\"description\":\"" + msg + "\"";
            data += ",\"name\":\"评论\"";
            data += "}]";
            if(!canClick){
                return false;
            }
            params = "serviceName=insertWithRoleRight&objectApiName=Attachement&data=" + encodeURIComponent(data) + "&binding=" + binding;
            var index = layer.load(1, {
                shade: false
            });
            canClick = false;
            $.ajax({
                type: "post",
                dataType: "json",
                url: url,
                data: params,
                success: function (data) {
                    if (data != "") {
                        if (data.result) {
                            layer.msg("提交成功", function () {
                                window.location.href = window.location.href;
                            });
                            layer.close(index);
                            return;
                        } else {
                            layer.msg(data.returnInfo);
                            layer.close(index);
                        }
                    }
                    layer.close(index);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //debugger;
                    layer.close(index);
                }
            });
        }, function () {

        });
    }
}

window.p = new Publicity();