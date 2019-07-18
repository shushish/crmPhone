$(document).ready(function(){
    Common.prototype.checkLoginStatu();
});

$(function(){
    $(".back").on("click", Common.prototype.Back);
    pc.loadPublicity();
});

var PublicityCenter = function(){};

PublicityCenter.prototype.loadPublicity = function(){
    var binding = Cookies.prototype.GetCookie('binding');
    var expressions = "spzt = '审批通过' order by sfzd desc,createdate desc";
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
                        var html = "";
                        data.data.forEach(function (value, index) {
                            html += "<div class='pro'>";
                            html += "<a href='/crm/my/publicity.html?id=" + value.id + "'>";
                            html += "<div class='icon_p "+(value.sfzd == "true"?"setTop":"")+" col-lg-2 col-md-2 col-sm-2 col-xs-2'>";
                            html += "<div class='icon_project blue'></div>";
                            html += "</div>";
                            html += "<div class='project_info col-lg-9 col-md-9 col-sm-9 col-xs-9'>";
                            html += "<div class='projectName'>" + value.name + "</div>";
                            html += "<div class='industry'>" + value.lx + "</div>";
                            html += "<div class='industry'>" + value.createdate + "</div>";
                            html += "</div>";
                            html += "<div class='icon_slid col-lg-1 col-md-1 col-sm-1 col-xs-1'>";
                            html += "<span class='slid_up'></span>";
                            html += "</div>";
                            html += "</a>";
                            html += "</div>";
                            // html += "<div>" + value.nr + "</div>";
                        });
                        $("#publicityList").append(html);                       
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

window.pc = new PublicityCenter();