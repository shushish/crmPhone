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

var isEdit = false;
var oldTitle = "";

$(function () {
    AddProject.prototype.initData();
    $(".back").on("click", AddProject.prototype.BackToProject);
    oldTitle = $(".title_center").html();
    //新建时的下一步按钮，编辑时的保存按钮点击事件
    $(".next_step").on("click", function () {
        if (AddProject.prototype.CheckNull.call(this)) {
            if (isEdit) {
                var stepnum = parseInt($(this).data("step"));
                newCustomer.SaveCustomer(stepnum);
            } else {
                fishedStep += 1;
            }


        } else {
            return false;
        }
    });

    $(".selectCustomer").on("click", AddProject.prototype.ShowSelectCousomerD);

    $(".selectContacts").on("click", AddProject.prototype.ShowSelectContactsD);

    $(".selectProject").on("click", newCustomer.ShowSelectPorjectD);

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
        case "5":
            {
                break;
            }
        default:
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

AddProject.prototype.ShowSelectContactsD = function () {
    var id = $(this).data("id");
    $("#selectContactsDialogs").addClass("flexLayout");
    $("#selectContactsDialogs").removeClass("none");
    $("#selectContactsDialogs").data("id", id);
    $(".title_center").addClass("flexLayout");
    $(".title_center").html("<span class='flexItem'>选择联系人</span><a class='new'></a>");
    // $(".new").on("click", AddProject.prototype.ShowAddCustomer);  前往新建联系人界面
    $(".back").off("click", AddProject.prototype.BackToProject);
    $(".back").on("click", function () {
        AddProject.prototype.BackToStep("#selectContactsDialogs", oldTitle);
    });
    $(".right_menu").css("display", "none");
    $(".title_btn").append("<a id='btn_new_sure'>确定</a>");
    $("#btn_new_sure").on("click", AddProject.prototype.SelectCustomer);
}

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

//选择客户
AddProject.prototype.SelectContacts = function () {
    var input_id = $("#selectContactsDialogs").data("id");
    var value = $(this).find("span").html();
    var id = $(this).data("id");
    $("#" + input_id).val(value);
    $("#" + input_id + "Id").val(id);
    AddProject.prototype.BackToStep("#selectContactsDialogs", oldTitle);
};

AddProject.prototype.CheckNull = function () {
    step = parseInt($(this).data("step"));

    if ((!isEdit && step >= 1) || (isEdit && step == 1)) {

    }


    if ((!isEdit && step > 1) || (isEdit && step == 2)) {
        var customerName = $("#customerName").val();
        if (varIsNull(customerName)) {
            layer.msg("单位名称不能为空");
            return false;
        }

        var customerType = $("#customerType").val();
        if (varIsNull(customerType)) {
            layer.msg("客户类型不能为空");
            return false;
        }

        var customerLocation = $("#customerLocation").val();
        if (varIsNull(customerLocation)) {
            layer.msg("客户地点不能为空");
            return false;
        }

        var recordType = $("#recordType").val();
        if (varIsNull(recordType)) {
            layer.msg("记录类型不能为空");
            return false;
        }
    }

    if ((!isEdit && step > 2) || (isEdit && step == 3)) {

    }

    if ((!isEdit && step > 3) || (isEdit && step == 4)) {
        if (!isEdit) {
            newCustomer.newCustomer();
        }
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
    var proId = Common.prototype.GetQueryString("proId");

    if (varIsNull(id)) {

    } else {
        $("title").html("远大住工-编辑客户");
        $(".title_center").html("编辑客户");
        oldTitle = "编辑客户";
    }


    var expressions = "id = '" + id + "'";
    var params = "serviceName=cqueryWithRoleRight&objectApiName=Account&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding + "&isAddDelete=" + false;

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
                        var customer = data.data[0];
                        $('#groupLeader').val(customer.zz); //组长
                        $('#business').val(customer.sw); //商务
                        $('#design').val(customer.sj); //设计
                        $('#customerService').val(customer.kf); //客服
                        $('#customerName').val(customer.name); //单位名称
                        $('#membershipGroup').val(customer.ssjt); //所属集团
                        $('#customerType').val(customer.accounttype); //客户类型
                        $('#customerLocation').val(customer.khdd); //客户地点
                        $('#recordType').val(customer.recordtype); //记录类型
                        $('#parentCompany').val(customer.parentccname); //母公司
                        $("#parentCompanyId").val(customer.parent); //母公司Id
                        $('#fistCollaborateTime').val(new Date(customer.schzrq).Format("yyyy-MM-dd")); //首次合作日期
                        $('#latestBuyTime').val(new Date(customer.zjgmrq).Format("yyyy-MM-dd")); //最近购买日期
                        $('#latestContact').val(new Date(customer.zjycbfsj).Format("yyyy-MM-dd")); //最近联系
                        $('#remindTimes').val(customer.txcs); //提醒次数
                        $('#customerAddress').val(customer.reglocation); //客户地址
                        $('#companyLandline').val(customer.dianhua) //公司固话
                        $('#legalPerson').val(customer.artificial_person_name); //法人
                        $('#siteURL').val(customer.wangzhi); //网址
                        $('#companyType').val(customer.companyorgtype); //公司类型
                        $('#registeredCapital').val(customer.org_registered_capital); //注册资本
                        $('#trade').val(customer.industry); //行业
                        $('#managementForms').val(customer.regstatus); //经营状态
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

var NewCustomer = function () {};

//新建客户
NewCustomer.prototype.newCustomer = function () {
    var data = "[{";

    var groupLeader = $('#groupLeader').val(); //组长
    data += "\"zz\":\"" + groupLeader + "\"";

    var business = $('#business').val(); //商务
    data += ",\"sw\":\"" + business + "\"";

    var design = $('#design').val(); //设计
    data += ",\"sj\":\"" + design + "\"";

    var customerService = $('#customerService').val(); //客服
    data += ",\"kf\":\"" + customerService + "\"";

    var customerName = $('#customerName').val(); //单位名称
    data += ",\"name\":\"" + customerName + "\"";

    var membershipGroup = $('#membershipGroup').val(); //所属集团
    data += ",\"ssjt\":\"" + membershipGroup + "\"";

    var customerType = $('#customerType').val(); //客户类型
    data += ",\"accounttype\":\"" + customerType + "\"";


    var customerLocation = $('#customerLocation').val(); //客户地点
    data += ",\"khdd\":\"" + customerLocation + "\"";

    var recordType = $('#recordType').val(); //记录类型
    data += ",\"recordtype\":\"" + recordType + "\"";

    var parentCompany = $('#parentCompany').val(); //母公司
    var parentId = $("#parentCompanyId").val(); //母公司Id
    data += ",\"parentccname\":\"" + parentCompany + "\"";
    data += ",\"parent\":\"" + parentId + "\"";


    var fistCollaborateTime = $('#fistCollaborateTime').val(); //首次合作日期
    data += ",\"schzrq\":\"" + fistCollaborateTime + "\"";

    var latestBuyTime = $('#latestBuyTime').val(); //最近购买日期
    data += ",\"zjgmrq\":\"" + latestBuyTime + "\"";


    var latestContact = $('#latestContact').val(); //最近联系
    data += ",\"zjycbfsj\":\"" + new Date(latestContact).Format("yyyy-MM-dd HH:mm:ss") + "\"";


    var remindTimes = $('#remindTimes').val(); //提醒次数
    data += ",\"txcs\":\"" + remindTimes + "\"";


    var customerAddress = $('#customerAddress').val(); //客户地址
    data += ",\"reglocation\":\"" + customerAddress + "\"";


    var companyLandline = $('#companyLandline').val() //公司固话
    data += ",\"dianhua\":\"" + companyLandline + "\"";


    var legalPerson = $('#legalPerson').val(); //法人
    data += ",\"artificial_person_name\":\"" + legalPerson + "\"";


    var siteURL = $('#siteURL').val(); //网址
    data += ",\"wangzhi\":\"" + siteURL + "\"";


    var companyType = $('#companyType').val(); //公司类型
    data += ",\"companyorgtype\":\"" + companyType + "\"";


    var registeredCapital = $('#registeredCapital').val(); //注册资本
    data += ",\"org_registered_capital\":\"" + registeredCapital + "\"";


    var trade = $('#trade').val(); //行业
    data += ",\"industry\":\"" + trade + "\"";


    var managementForms = $('#managementForms').val(); //经营状态
    data += ",\"regstatus\":\"" + managementForms + "\"";


    data += "}]";

    var binding = Cookies.prototype.GetCookie('binding');
    if (binding != null) {
        $.ajax({
            type: "post",
            dataType: "json",
            url: url,
            data: "serviceName=insertWithRoleRight&objectApiName=Account&data=" + encodeURIComponent(data) + "&binding=" + binding,
            success: function (data) {
                //加载联系人名称
                if (data != "") {
                    if (data.result) {
                        layer.msg("客户保存成功", function () {
                            window.location.href = "/crm/customer/customerrecord.html?id=" + data.data.ids[0].id;
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

//保存客户（编辑用）
NewCustomer.prototype.SaveCustomer = function (stepNum) {
    var data = "[{";
    var id = Common.prototype.GetQueryString("id");
    data += "\"id\":\"" + id + "\""; //客户Id
    switch (stepNum + "") {
        case "1":
            {
                var groupLeader = $('#groupLeader').val(); //组长
                data += ",\"zz\":\"" + groupLeader + "\"";

                var business = $('#business').val(); //商务
                data += ",\"sw\":\"" + business + "\"";

                var design = $('#design').val(); //设计
                data += ",\"sj\":\"" + design + "\"";

                var customerService = $('#customerService').val(); //客服
                data += ",\"kf\":\"" + customerService + "\"";
                break;
            }
        case "2":
            {
                var customerName = $('#customerName').val(); //单位名称
                data += ",\"name\":\"" + customerName + "\"";

                var membershipGroup = $('#membershipGroup').val(); //所属集团
                data += ",\"ssjt\":\"" + membershipGroup + "\"";

                var customerType = $('#customerType').val(); //客户类型
                data += ",\"accounttype\":\"" + customerType + "\"";


                var customerLocation = $('#customerLocation').val(); //客户地点
                data += ",\"khdd\":\"" + customerLocation + "\"";

                var recordType = $('#recordType').val(); //记录类型
                data += ",\"recordtype\":\"" + recordType + "\"";

                var parentCompany = $('#parentCompany').val(); //母公司
                var parentId = $("#parentCompanyId").val(); //母公司Id
                data += ",\"parentccname\":\"" + parentCompany + "\"";
                data += ",\"parent\":\"" + parentId + "\"";
                break;
            }
        case "3":
            {
                var fistCollaborateTime = $('#fistCollaborateTime').val(); //首次合作日期
                data += ",\"schzrq\":\"" + fistCollaborateTime + "\"";

                var latestBuyTime = $('#latestBuyTime').val(); //最近购买日期
                data += ",\"zjgmrq\":\"" + latestBuyTime + "\"";


                var latestContact = $('#latestContact').val(); //最近联系
                data += ",\"zjycbfsj\":\"" + new Date(latestContact).Format("yyyy-MM-dd HH:mm:ss") + "\"";


                var remindTimes = $('#remindTimes').val(); //提醒次数
                data += ",\"txcs\":\"" + remindTimes + "\"";
                break;
            }
        case "4":
            {
                var customerAddress = $('#customerAddress').val(); //客户地址
                data += ",\"reglocation\":\"" + customerAddress + "\"";


                var companyLandline = $('#companyLandline').val() //公司固话
                data += ",\"dianhua\":\"" + companyLandline + "\"";


                var legalPerson = $('#legalPerson').val(); //法人
                data += ",\"artificial_person_name\":\"" + legalPerson + "\"";


                var siteURL = $('#siteURL').val(); //网址
                data += ",\"wangzhi\":\"" + siteURL + "\"";


                var companyType = $('#companyType').val(); //公司类型
                data += ",\"companyorgtype\":\"" + companyType + "\"";


                var registeredCapital = $('#registeredCapital').val(); //注册资本
                data += ",\"org_registered_capital\":\"" + registeredCapital + "\"";


                var trade = $('#trade').val(); //行业
                data += ",\"industry\":\"" + trade + "\"";


                var managementForms = $('#managementForms').val(); //经营状态
                data += ",\"regstatus\":\"" + managementForms + "\"";
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
            data: "serviceName=updateWithRoleRight&objectApiName=Account&data=" + encodeURIComponent(data) + "&binding=" + binding,
            success: function (data) {
                if (data != "") {
                    if (data.result) {
                        layer.msg("保存成功", function () {
                            window.location.href = "/crm/customer/customerrecord.html?id=" + id;
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


window.newCustomer = new NewCustomer();