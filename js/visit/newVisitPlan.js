$(document).ready(function () {
    Common.prototype.checkLoginStatu();
});

$(".projectList").scroll(function () {
    $(".back").on("click",common.Back);
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $("#projects").height();
    if (scrollTop > 1500) {
        $("#ProjectGoToTop").fadeIn("slow");
    } else {
        $("#ProjectGoToTop").fadeOut("slow");
    }
    var windowHeight = $(this).height();
    var positionValue = (scrollTop + windowHeight) - scrollHeight;
    if (positionValue >= -1) {
        //执行ajax，获取数据
        nvp.searchProject(currentPage + 1, 15);
    }
});

var oldTitle = "";
var currentPage = 1;
var currentExpressions = "";

$(function () {
    var proName = decodeURIComponent(Common.prototype.GetQueryString("proName"));
    var proId = Common.prototype.GetQueryString("proId");
    var type = Common.prototype.GetQueryString("type");
    if(!varIsNull(proId)){
        $("#xmmc").val(proName);
        $("#xmmcId").val(proId);
    }    

    oldTitle = $(".title_center").html();

    $(".back").on("click", Common.prototype.Back);
    $(".selectProject").on("click", nvp.ShowSelectPorjectD);
    $(".btn_search_project").on("click", function () {
        nvp.searchProject(1, 15);
    });
    $(".item_add").on("click", nvp.htmladdItem);
    $("#save").on("click", nvp.save);
});

var Nvp = function () {}

Nvp.prototype = {
    htmladdItem: function () {
        // var ItemNum = $(".vistplan>ul>li").length;
        // for (var i = 1; i <= ItemNum; i++) {
        //     var v = $("#toknow" + i).val();
        //     if (varIsNull(v)) {
        //         layer.msg("还有未填写项！");
        //         return false;
        //     }
        // }
        var i = $(".vistplan>ul>li").length;
        var index = i + 1;
        if (index > 6) {
            layer.msg("最多添加6条！");
            return false;
        }
        var html = '';
        html += '<li id="li_' + index + '">';
        html += '<em>*</em>';
        html += '<b>' + index + ' : </b>';
        html += '<div class="hySelectbox selectCustomer">';
        html += '<input type="text" name="toknow' + index + '" value="" id="toknow' + index + '" placeholder="请填写" class="entry_name">';
        html += '</div>';
        html += '<div class="minus" data-index="' + index + '"></div>';
        html += '</li>';
        $(".vistplan>ul").append(html);
        $(".minus").off("click", nvp.htmlminusItem);
        $(".minus").on("click", nvp.htmlminusItem);
    },
    htmlminusItem: function () {
        var i = $(this).data("index");
        $("#li_" + i).remove();
        $(".vistplan>ul>li").each(function (index, element) {
            $(this).attr("id", "li_" + (index + 1));
            $(this).find("b").html((index + 1) + " :");
            $(this).find(".minus").data("index", (index + 1));
            $(this).find(".hySelectbox>input").attr("id", "toknow" + (index + 1));
        });
    },
    save: function () {
        var returnurl = Common.prototype.GetQueryString("returnurl");
        var proId = $("#xmmcId").val();
        if(varIsNull(proId)){
            layer.msg("项目名称不能为空!");
                return false;
        }
        var ItemNum = $(".vistplan>ul>li").length;
        var data = "[{";
        data += "\"xmmc1\":\"" + proId + "\"";

        for (var i = 1; i <= ItemNum; i++) {
            var v = $("#toknow" + i).val();
            if (varIsNull(v)) {
                layer.msg("还有未填写项！");
                return false;
            }
            data += ",\"plan" + i + "\":\"" + v + "\""; //计划

        }
        data += "}]";

        var binding = Cookies.prototype.GetCookie('binding');
        if (binding != null) {
            $.ajax({
                type: "post",
                dataType: "json",
                url: url,
                data: "serviceName=insertWithRoleRight&objectApiName=khbf&data=" + encodeURIComponent(data) + "&binding=" + binding,
                success: function (data) {
                    //加载联系人名称
                    if (data != "") {
                        if (data.result) {
                            layer.msg("拜访计划保存成功", function () {
                                if (!varIsNull(returnurl)) {
                                    window.location.href = returnurl;
                                } else {
                                    window.location.href = "/crm/visit/visitDetail.html?id=" + data.data.ids[0].id;
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
    },
    BackToProject: function () {
        history.back(-1);
    },
    ShowSelectPorjectD: function () {
        var id = $(this).data("id");
        $("#selectProjectDialogs").addClass("flexLayout");
        $("#selectProjectDialogs").removeClass("none");
        $("#selectProjectDialogs").data("id", id);
        $(".title_center").addClass("flexLayout");
        $(".title_center").html("<span class='flexItem'>选择项目</span><a class='new'></a>");
        // $(".new").on("click", AddProject.prototype.ShowAddCustomer);  前往新建联系人界面
        $(".back").off("click");
        $(".back").on("click", function () {
            nvp.BackToStep("#selectProjectDialogs", oldTitle);
        });
        $(".right_menu").css("display", "none");
        $(".title_btn").append("<a id='btn_new_sure'>确定</a>");
        $("#btn_new_sure").on("click", nvp.SelectProject);
    },
    SelectProject: function () {
        var input_id = $("#selectProjectDialogs").data("id");
        var value = $(this).find("span").html();
        var id = $(this).data("id");
        var dqjd = $(this).data("dqjd");
        $("#" + input_id).val(value);
        $("#" + input_id + "Id").val(id);
        $("#" + input_id + "Dqjd").val(dqjd);
        nvp.BackToStep("#selectProjectDialogs", oldTitle);
    },
    BackToStep: function (obj, title) {
        $(obj).addClass("none");
        $(".title_center").html(title);
        $(".back").off("click");
        $(".back").on("click", nvp.BackToProject);
        $(".right_menu").css("display", "block");
        $("#btn_new_sure").remove();
        $(".title_center").removeClass("flexLayout");
    },
    LoadProject: function (pageNum, pageSize, expressions) {
        var binding = Cookies.prototype.GetCookie('binding');
        // var keyword = $("#keyWord").val();
        //var id = //Common.prototype.GetQueryString('id');
        currentExpressions = expressions;
        if (binding != null) {
            $.ajax({
                type: "get",
                dataType: "json",
                url: url,
                data: "serviceName=pageQueryWithRoleRight&objectApiName=xmbb&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding + "&pageNUM=" + pageNum + "&pageSize=" + pageSize,
                success: function (data) {
                    //加载联系人名称
                    if (data != "") {
                        if (data.result) {
                            if (data.data.length > 0) {
                                if (pageNum == 1) {
                                    $("#projects").html("");
                                }
                                data.data.forEach(function (value, index) {
                                    $("#projects").append("<li data-id='" + value.id + "' data-dqjd='" + value.dqjd + "'><span>" + value.name + "</span><div>" + value.sjgsg + "</div></li>");
                                });
                                $(".projectList").find("li").on("click", nvp.SelectProject);
                                currentPage = pageNum;
                            } else {
                                layer.msg("没有数据了！");
                            }
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
    },
    searchProject: function (pageNum, pageSize) {
        var expressions = "";
        var keyword = $("#keyWordProject").val();
        if (keyword != "") {
            expressions += "name like '%" + keyword + "%'"
        } else {
            expressions = "";
        }
        nvp.LoadProject(pageNum, pageSize, expressions);
        return false;
    }
}

window.nvp = new Nvp();