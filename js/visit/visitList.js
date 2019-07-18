$(document).ready(function(){
    Common.prototype.checkLoginStatu();
});

$(function(){
    $(".back").on("click", Common.prototype.Back);
    vl.LoadVisit();
});

var VisitList = function(){};

VisitList.prototype.LoadVisit = function(){
    var binding = Cookies.prototype.GetCookie('binding');
    var id = Common.prototype.GetQueryString("proId");
    var khmcId = Common.prototype.GetQueryString("khmcId");
    var temp = $(".addproject").attr("href");
    var expressions = "";
    if(!varIsNull(id)){
        $(".addproject").attr("href",temp + "?proId=" + id + "#/step1");
        expressions = "xmmc1 = '" + id + "'";
    }
    if(!varIsNull(khmcId))
    {
        $(".addproject").attr("href",temp + "?khmcId=" + khmcId + "#/step1");
        expressions = "khmc = '" + khmcId + "'";
    }
    
    var params = "serviceName=cqueryWithRoleRight&objectApiName=khbf&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding + "&isAddDelete=" + false;

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
                    $("#visitNum").html(data.data.length);
                    //$("#contactsRoleList").html("");
                    if (data.data.length > 0) {
                        var html = "";
                        data.data.forEach(function (value, index) {
                            html += "<div class='pro'>";
                            html += "<a href='/crm/visit/visitDetail.html?id=" + value.id + "'>";
                            html += "<div class='icon_p col-lg-2 col-md-2 col-sm-2 col-xs-2'>";
                            html += "<div class='icon_project visit'></div>";
                            html += "</div>";
                            html += "<div class='project_info col-lg-9 col-md-9 col-sm-9 col-xs-9'>";
                            html += "<div class='projectName'>" + value.name + "</div>";
                            html += "<div class='industry'>客户：" + value.khmcccname + "</div>";
                            html += "<div class='industry'>目的：" + value.bfmdnr + "</div>";
                            html += "</div>";
                            html += "<div class='icon_slid col-lg-1 col-md-1 col-sm-1 col-xs-1'>";
                            html += "<span class='slid_up'></span>";
                            html += "</div>";
                            html += "</a>";
                            html += "</div>";
                        });
                        $("#visitsList").append(html);                       
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

window.vl = new VisitList();