window.Router.route("/step1", function () {
    AddProject.prototype.ShowStep("step1");
});

window.Router.route("/step2", function () {
    AddProject.prototype.ShowStep("step2");
});

window.Router.route("/step3", function () {
    AddProject.prototype.ShowStep("step3");
});

window.Router.route("/step4", function () {
    AddProject.prototype.ShowStep("step4");
});

$(document).ready(function () {
    Common.prototype.checkLoginStatu();
});

var isEdit = true;
var oldTitle = "";
var xmfa_id = "";

$(function () {
    AddProject.prototype.initData();
    $(".back").on("click", AddProject.prototype.BackToProject);
    oldTitle = $(".title_center").html();
    //新建时的下一步按钮，编辑时的保存按钮点击事件
    $(".next_step").on("click", function () {
        if (AddProject.prototype.CheckNull.call(this)) {
            if (isEdit) {
                var stepnum = parseInt($(this).data("step"));
                AddProject.prototype.SaveProject(stepnum);
            } else {
                fishedStep += 1;
            }


        } else {
            return false;
        }
    });

    $(".selectCustomer").on("click", AddProject.prototype.ShowSelectCousomerD);
    $(".in_Choice").on("click", function () {
        $(".in_Choice").removeClass("modelSelected");
        $(this).addClass("modelSelected");
        $("#model").val($(this).data("value"));
    });

    $(".btn_search").on("click", function () {
        AddProject.prototype.search(1, 15);
    });
});

var AddProject = function () {};

AddProject.prototype.BackToProject = function () {
    history.back(-1);
};

AddProject.prototype.BackToStep = function (obj, title) {
    $(obj).addClass("none");
    $(".title_center").html(title);
    $(".back").off("click");
    $(".back").on("click", AddProject.prototype.BackToProject);
    $(".right_menu").css("display", "block");
    $("#btn_new_sure").remove();
    $(".title_center").removeClass("flexLayout");
};

var fishedStep = 1;

AddProject.prototype.ShowStep = function (step) {
    var id = Common.prototype.GetQueryString("id");
    if (!varIsNull(id)) {
        isEdit = true;
    }
    var currentStep = $(".currentStep");
    if (currentStep != null && currentStep != undefined && currentStep != "") {
        currentStep.removeClass("currentStep");
    }
    $("#" + step).addClass("currentStep");

    var stepNum = step.replace("step", "");
    $(".creatMessage-step").find(".none").removeClass("none");
    switch (stepNum) {
        case "1":
            {
                break;
            }
        case "2":
            {
                break;
            }
        case "3":
            {
                break;
            }
        case "4":
            {
                break;
            }
    }
    // if (parseInt(stepNum) > (fishedStep)) {
    //     window.location = "#/step" + fishedStep;
    //     return;
    // }
    // $(".next_step").attr("href", "#/step" + (parseInt(stepNum) + 1));
    $(".current").removeClass("current");
    $(".a_" + step).addClass("current");
    if (!isEdit) {
        for (var i = stepNum; i > 0; i--) {
            $(".a_step" + i).attr("href", "#/step" + i);
        }
    } else {
        $(".add_step" + stepNum).find("a[class='next_step']").attr("href", "javascript:void(0);");
        $(".add_step" + stepNum).find("a[class='next_step']").html("保存");
    }

};

AddProject.prototype.ShowSelectCousomerD = function () {
    var id = $(this).data("id");
    $("#selectCustomerDialogs").addClass("flexLayout");
    $("#selectCustomerDialogs").removeClass("none");
    $("#selectCustomerDialogs").data("id", id);
    $(".title_center").addClass("flexLayout");

    $(".title_center").html("<span class='flexItem'>选择客户</span><a class='new'></a>");
    $(".new").on("click", AddProject.prototype.ShowAddCustomer);
    $(".back").off("click", AddProject.prototype.BackToProject);
    $(".back").on("click", function () {
        AddProject.prototype.BackToStep("#selectCustomerDialogs", oldTitle);
    });
    $(".right_menu").css("display", "none");
    $(".title_btn").append("<a id='btn_new_sure'>确定</a>");
    $("#btn_new_sure").on("click", AddProject.prototype.SelectCustomer);
    // $(".addNewCustomer-input").css("display","none");
    // $(".addNewCustomer-input").val("");
};

AddProject.prototype.ShowAddCustomer = function () {
    $("#newCustomer").css("display", "block");
    $(".addNewCustomer-input").css("display", "block");
    $(".addNewCustomer-input").val("");
    $(".title_center").html("新建客户");
    $(".right_menu").css("display", "none");
    $(".title_center").removeClass("flexLayout");
    $(".back").off("click");
    $(".back").on("click", AddProject.prototype.backToSelect);
};

AddProject.prototype.backToSelect = function () {
    $("#newCustomer").css("display", "none");
    $(".title_center").addClass("flexLayout");
    $(".title_center").html("<span class='flexItem'>选择客户</span><a class='new'></a>");
    $(".new").on("click", AddProject.prototype.ShowAddCustomer);
    // $(".right_menu").css("display","block");
    $(".back").off("click");
    $(".back").on("click", function () {
        AddProject.prototype.BackToStep("#selectCustomerDialogs", oldTitle);
    });
};

//选择客户
AddProject.prototype.SelectCustomer = function () {
    var input_id = $("#selectCustomerDialogs").data("id");
    var value = $(this).find("span").html();
    var id = $(this).data("id");
    $("#" + input_id).val(value);
    $("#" + input_id + "Id").val(id);
    AddProject.prototype.BackToStep("#selectCustomerDialogs", oldTitle);
};

AddProject.prototype.CheckNull = function () {
    step = parseInt($(this).data("step"));
    var entry_name = $("#khmc").val();

    if ((!isEdit && step >= 1) || (isEdit && step == 1)) {
        if (entry_name == null || entry_name == undefined || $.trim(entry_name) == "") {
            layer.msg("客户名称不能为空");
            return false;
        }
    }

    if ((!isEdit && step > 1) || (isEdit && step == 2)) {
        var xmmc = $("#xmmc").val();
        if (xmmc == null || xmmc == undefined || $.trim(xmmc) == "") {
            layer.msg("项目名称不能为空");
            return false;
        }

        // var xmdz = $("#xmdz").val();
        // if (xmdz == null || xmdz == undefined || $.trim(xmdz) == "") {
        //     layer.msg("项目地址不能为空");
        //     return false;
        // }

        // var xmlx = $("#xmlx").val();
        // if (xmlx == null || xmlx == undefined || $.trim(xmlx) == "") {
        //     layer.msg("项目类型不能为空");
        //     return false;
        // }
    }

    if ((!isEdit && step > 2) || (isEdit && step == 3)) {
        
    }

    if ((!isEdit && step > 3) || (isEdit && step == 4)) {
        

    }
    return true;
};

//加载客户  -- 查找客户框 搜索
AddProject.prototype.LoadCustomer = function (pageNum, pageSize, expressions) {
    var binding = Cookies.prototype.GetCookie('binding');
    var keyword = $("#keyWord").val();
    //var id = //Common.prototype.GetQueryString('id');
    currentExpressions = expressions;
    if (binding != null && keyword != null) {
        $.ajax({
            type: "get",
            dataType: "json",
            url: url,
            data: "serviceName=pageQueryWithRoleRight&objectApiName=Account&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding + "&pageNUM=" + pageNum + "&pageSize=" + pageSize,
            success: function (data) {
                //加载客户名称
                if (data != "") {
                    if (data.result) {
                        if (data.data.length > 0) {
                            if (pageNum == 1) {
                                $("#customers").html("");
                            }
                            data.data.forEach(function (value, index) {
                                var account = value;
                                $("#customers").append("<li data-id='" + account.id + "'><span>" + account.name + "</span><div>" + account.accounttype + "</div></li>");
                            });
                            $(".CustomerList").find("li").on("click", AddProject.prototype.SelectCustomer);
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
};

AddProject.prototype.search = function (pageNum, pageSize) {
    var expressions = "";
    var keyword = $("#keyWord").val();
    if (keyword != "") {
        expressions += "name like '%" + keyword + "%'"
    } else {
        expressions = "";
    }
    AddProject.prototype.LoadCustomer(pageNum, pageSize, expressions);
    return false;

}

AddProject.prototype.ScrollToTop = function (obj) {
    $("." + obj).animate({
        scrollTop: 0
    }, 'slow');
}

var currentPage = 1;
var currentExpressions = "";

$(".CustomerList").scroll(function () {
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $("#customers").height();
    if (scrollTop > 1500) {
        $("#goToTop").fadeIn("slow");
    } else {
        $("#goToTop").fadeOut("slow");
    }
    var windowHeight = $(this).height();
    var positionValue = (scrollTop + windowHeight) - scrollHeight;
    if (positionValue >= -1) {
        //执行ajax，获取数据
        AddProject.prototype.search(currentPage + 1, 15);
    }
});

AddProject.prototype.initData = function () {
    var binding = Cookies.prototype.GetCookie('binding');
    var id = Common.prototype.GetQueryString("id");
    if (varIsNull(id)) {
        return;
    } else {
        $("title").html("远大住工-编辑项目");
        $(".title_center").html("编辑项目");
        oldTitle = "编辑项目";
    }
    var expressions = "xmbh11 = '" + id + "'";
    var params = "serviceName=cqueryWithRoleRight&objectApiName=xmfa&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding + "&isAddDelete=" + false;

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
                        var pro = data.data[0];
                        xmfa_id = pro.id;

                        $("#khmc").val(pro.custnameccname);
                        $("#khmcId").val(pro.custname);
                        $("#kff").val(pro.kfsccname);
                        $("#kffId").val(pro.kfs);
                        $("#jzs").val(pro.jzsccname);
                        $("#jzsId").val(pro.jzs);
                        $("#sheji").val(pro.sjyccname);
                        $("#shejiId").val(pro.sjy);

                        $("#xmmc").val(pro.name);
                        $("#xmdz").val(pro.xmdz);
                        $("#xmlx").val(pro.xmlx);
                        $("#ysjl").val(pro.ysjl);
                        $("#yjqyyf").val(pro.yjqyyf + "-01");
                        $("#tzfa").val(pro.tzfa);
                        $("#cglx").val(pro.cglx);
                        $("#jfjd").val(pro.jfjd);

                        $("#cplx").val(pro.cplx);
                        $("#mj").val(pro.mj);
                        $("#yjpchte").val(pro.yjpchte);
                        $("#pcmj").val(pro.pcmj);
                        $("#jzds").val(pro.jzds);
                        $("#cs").val(pro.cs);
                        $("#cd").val(pro.cd);
                        $("#cangs").val(pro.cangs);
                        if (pro.xmlx == "管廊") {
                            $(".li_cplx").addClass("none");
                            $(".li_mj").addClass("none");
                            $(".li_ds").addClass("none");
                            $(".li_cs").addClass("none");
                        } else {
                            $(".li_cd").addClass("none");
                            $(".li_cas").addClass("none");
                        }

                        $("#bz").val(pro.beizhu);
                        $("#sfsypkpmjm").val(pro.sfsypkpm);
                    }

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

//保存项目（编辑用）
AddProject.prototype.SaveProject = function (stepNum) {
    var data = "[{";
    var xmbh = Common.prototype.GetQueryString("id");
    if (varIsNull(xmfa_id)) {
        layer.msg("页面加载中，请稍后再试！");
        return false;
    }
    // layer.msg("该功能暂不开放！");
    // return false;
    data += "\"id\":\"" + xmfa_id + "\""; //项目Id
    switch (stepNum + "") {
        case "1":
            {
                var khmcId = $("#khmcId").val();
                data += ",\"custname\":\"" + khmcId + "\""; //客户Id
                var khmc = $("#khmc").val();
                data += ",\"custnameccname\":\"" + khmc + "\""; //客户名称
                var kff = $("#kff").val();
                data += ",\"kfsccname\":\"" + kff + "\""; //开发方
                var kffId = $("#kffId").val();
                data += ",\"kfs\":\"" + kffId + "\""; //开发方Id
                var jzs = $("#jzs").val();
                data += ",\"jzsccname\":\"" + jzs + "\""; //建筑商
                var jzsId = $("#jzsId").val();
                data += ",\"jzs\":\"" + jzsId + "\""; //建筑商Id
                var sheji = $("#sheji").val();
                data += ",\"sjyccname\":\"" + sheji + "\""; //设计院
                var shejiId = $("#shejiId").val();
                data += ",\"sjy\":\"" + shejiId + "\""; //设计院Id                
                break;
            }
        case "2":
            {
                var xmmc = $("#xmmc").val();
                data += ",\"name\":\"" + xmmc + "\""; //项目名称                
                var xmdz = $("#xmdz").val();
                data += ",\"xmdz\":\"" + xmdz + "\""; //项目地址
                var xmlx = $("#xmlx").val();
                data += ",\"xmlx\":\"" + xmlx + "\""; //项目类型
                var ysjl = $("#ysjl").val();
                data += ",\"ysjl\":\"" + ysjl + "\""; //运输距离
                var yjqyyf = new Date($("#yjqyyf").val()).Format("yyyy-MM");
                data += ",\"yjqyyf\":\"" + yjqyyf + "\""; //预计签约月份
                var tzfa = $("#tzfa").val();
                data += ",\"tzfa\":\"" + tzfa + "\""; //拓展方案
                var cglx = $("#cglx").val();
                data += ",\"cglx\":\"" + cglx + "\""; //采购类型
                var jfjd = $("#jfjd").val();
                data += ",\"jfjd\":\"" + jfjd + "\""; 
                break;
            }
        case "3":
            {
                var cplx = $("#cplx").val();
                data += ",\"cplx\":\"" + cplx + "\""; 
                var mj = $("#mj").val();
                data += ",\"mj\":\"" + mj + "\""; 
                var yjpchte = $("#yjpchte").val();
                data += ",\"yjpchte\":\"" + yjpchte + "\""; 
                var pcmj = $("#pcmj").val();
                data += ",\"pcmj\":\"" + pcmj + "\""; 
                var jzds = $("#jzds").val();
                data += ",\"jzds\":\"" + jzds + "\"";
                var cs = $("#cs").val();
                data += ",\"cs\":\"" + cs + "\"";
                var cd = $("#cd").val();
                data += ",\"cd\":\"" + cd + "\"";
                var cangs = $("#cangs").val();
                data += ",\"cangs\":\"" + cangs + "\"";
                break;
            }
        case "4":
            {
                var bz = $("#bz").val();
                data += ",\"beizhu\":\"" + bz + "\"";
                var sfsypkpmjm = $("#sfsypkpmjm").val();
                data += ",\"sfsypkpm\":\"" + sfsypkpmjm + "\"";               
                break;
            }
        default:
            {
                break;
            }
    }
    data += "}]";

    var binding = Cookies.prototype.GetCookie('binding');
    // return;
    if (binding != null) {
        $.ajax({
            type: "post",
            dataType: "json",
            url: url,
            data: "serviceName=updateWithRoleRight&objectApiName=xmfa&data=" + encodeURIComponent(data) + "&binding=" + binding,
            success: function (data) {
                //加载联系人名称
                if (data != "") {
                    if (data.result) {
                        layer.msg("项目保存成功", function () {
                            window.location.href = "/crm/project/projectDetail.html?xmbh=" + xmbh;
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

}