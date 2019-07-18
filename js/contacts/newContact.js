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
                AddProject.prototype.SaveProject(stepnum);
            } else {
                fishedStep += 1;
            }


        } else {
            return false;
        }
    });

    $(".selectCustomer").on("click", AddProject.prototype.ShowSelectCousomerD);

    $(".selectContacts").on("click", AddProject.prototype.ShowSelectContactsD);

    $(".btn_search").on("click", function () {
        AddProject.prototype.search(1, 15);
    });

    $(".btn_search_contacts").on("click", function () {
        AddProject.prototype.searchContacts(1, 15);
    });

    var html_id = Common.prototype.GetQueryString("html_id");
    if (varIsNull(html_id)) {
        //$(".li_xmjs").addClass("none");
    }

    newContact.initDwmc();

});

var AddProject = function () {};

AddProject.prototype.BackToProject = function () {
    // var html_id = Common.prototype.GetQueryString("html_id");
    // if (!varIsNull(html_id)) {
    //     parent.layer.close(index);
    // }else{
    //     history.back(-1);
    // }
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
    if(step == "step1"){
        $(".back").removeClass("show");
    }else{
        $(".back").addClass("show");
    }
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

//选择联系人
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
        var entry_name = $("#khmc").val();
        if (varIsNull(entry_name)) {
            layer.msg("单位名称不能为空");
            return false;
        }
        var xb = $("#xb").val();
        if (varIsNull(xb)) {
            layer.msg("性别不能为空");
            return false;
        }

        var lxrxm = $("#lxrxm").val();
        if (varIsNull(lxrxm)) {
            layer.msg("联系人姓名不能为空");
            return false;
        }

        var age = $("#age").val();
        if (varIsNull(age)) {
            layer.msg("年龄不能为空");
            return false;
        }

        var zhiwu = $("#zhiwu").val();
        if (varIsNull(zhiwu)) {
            layer.msg("职务不能为空");
            return false;
        }

        var lxfs = $("#lxfs").val();
        if (varIsNull(lxfs)) {
            layer.msg("联系方式不能为空");
            return false;
        }

        var getWx = $("#getWx").val();
        if (varIsNull(getWx)) {
            layer.msg("获取微信不能为空");
            return false;
        }
    }


    if ((!isEdit && step > 1) || (isEdit && step == 2)) {
        var bm = $("#bm").val();
        if (varIsNull(bm)) {
            layer.msg("部门不能为空");
            return false;
        }

        var dwstd = $("#dwstd").val();
        if (varIsNull(dwstd)) {
            layer.msg("对我司态度不能为空");
            return false;
        }

        var cj = $("#cj").val();
        if (varIsNull(cj)) {
            layer.msg("层级不能为空");
            return false;
        }

        var csd = $("#csd").val();
        if (varIsNull(csd)) {
            layer.msg("成熟度不能为空");
            return false;
        }

        var yxl = $("#yxl").val();
        if (varIsNull(yxl)) {
            layer.msg("影响力不能为空");
            return false;
        }
    }

    if ((!isEdit && step > 2) || (isEdit && step == 3)) {
        var xmjs = $("#xmjs").val();
        if(varIsNull(xmjs)){
            layer.msg("项目角色不能为空");
            return false;
        }
        
        var sflgscg = $("#sflgscg").val();
        if (varIsNull(sflgscg)) {
            layer.msg("是否来公司参观不能为空");
            return false;
        }

        var pj = $("#pj").val();
        if (varIsNull(pj)) {
            layer.msg("评价不能为空");
            return false;
        }
    }

    if ((!isEdit && step > 3) || (isEdit && step == 4)) {
        if (!isEdit) {
            newContact.newContact();
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

//加载联系人  -- 查找联系人框 搜索
AddProject.prototype.LoadContacts = function (pageNum, pageSize, expressions) {
    var binding = Cookies.prototype.GetCookie('binding');
    // var keyword = $("#keyWord").val();
    //var id = //Common.prototype.GetQueryString('id');
    currentExpressions = expressions;
    if (binding != null) {
        $.ajax({
            type: "get",
            dataType: "json",
            url: url,
            data: "serviceName=pageQueryWithRoleRight&objectApiName=Contact&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding + "&pageNUM=" + pageNum + "&pageSize=" + pageSize,
            success: function (data) {
                //加载联系人名称
                if (data != "") {
                    if (data.result) {
                        if (data.data.length > 0) {
                            if (pageNum == 1) {
                                $("#contacts").html("");
                            }
                            data.data.forEach(function (value, index) {
                                $("#contacts").append("<li data-id='" + value.id + "'><span>" + value.name + "</span><div>" + value.khmcccname + "</div><div>" + value.shouji + "</div></li>");
                            });
                            $(".ContactsList").find("li").on("click", AddProject.prototype.SelectContacts);
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

AddProject.prototype.searchContacts = function (pageNum, pageSize) {
    var expressions = "";
    var keyword = $("#keyWordContacts").val();
    if (keyword != "") {
        expressions += "name like '%" + keyword + "%'"
    } else {
        expressions = "";
    }
    AddProject.prototype.LoadContacts(pageNum, pageSize, expressions);
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

$(".ContactsList").scroll(function () {
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $("#contacts").height();
    if (scrollTop > 1500) {
        $("#ContactsGoToTop").fadeIn("slow");
    } else {
        $("#ContactsGoToTop").fadeOut("slow");
    }
    var windowHeight = $(this).height();
    var positionValue = (scrollTop + windowHeight) - scrollHeight;
    if (positionValue >= -1) {
        //执行ajax，获取数据
        AddProject.prototype.searchContacts(currentPage + 1, 15);
    }
});

AddProject.prototype.initData = function () {
    var binding = Cookies.prototype.GetCookie('binding');
    var id = Common.prototype.GetQueryString("id");
    if (varIsNull(id)) {
        return;
    } else {
        $("title").html("远大住工-编辑联系人");
        $(".title_center").html("编辑联系人");
        oldTitle = "编辑联系人";
    }
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
                        var contact = data.data[0];
                        $("#khmc").val(contact.khmcccname);
                        $("#khmcId").val(contact.khmc);
                        $("#xb").val(contact.chengwei);
                        $("#lxrxm").val(contact.name);
                        $("#age").val(contact.nj);
                        $("#zhiwu").val(contact.zhiwu);
                        $("#lxfs").val(contact.shouji);
                        $("#getWx").val(contact.sfhqwx);
                        $("#bumen").val(contact.bumen);
                        $("#dwstd").val(contact.attitude);
                        $("#cj").val(contact.cj);
                        $("#csd").val(contact.maturity);
                        $("#xmjs").val(contact.contactrole);
                        $("#sflgscg").val(contact.sflgscg);
                        $("#xhjh").val(contact.xhjh);
                        $("#pj").val(contact.beizhu);
                        $("#lxcs").val(contact.lxcs);
                        $("#zjlx").val(new Date(contact.zjycbfsj).Format("yyyy-MM-dd"));
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
    var id = Common.prototype.GetQueryString("id");
    data += "\"id\":\"" + id + "\""; //项目Id
    switch (stepNum + "") {
        case "1":
            {
                var khmc = $("#khmc").val();
                data += ",\"khmcccname\":\"" + khmc + "\""; //单位名称
                var khmcId = $("#khmcId").val();
                data += ",\"khmc\":\"" + khmcId + "\""; //单位Id
                var xb = $("#xb").val();
                data += ",\"chengwei\":\"" + xb + "\""; //性别
                var lxrxm = $("#lxrxm").val();
                data += ",\"name\":\"" + lxrxm + "\""; //姓名
                var age = $("#age").val();
                data += ",\"nj\":\"" + age + "\""; //年龄
                var zhiwu = $("#zhiwu").val();
                data += ",\"zhiwu\":\"" + zhiwu + "\""; //职务
                var lxfs = $("#lxfs").val();
                data += ",\"shouji\":\"" + lxfs + "\""; //联系方式
                var getWx = $("#getWx").val();
                data += ",\"sfhqwx\":\"" + getWx + "\""; //获取微信                                
                break;
            }
        case "2":
            {
                var bm = $("#bm").val();
                data += ",\"bm\":\"" + bm + "\""; //部门
                var bumen = $("#bumen").val();
                data += ",\"bumen\":\"" + bumen + "\""; //其他部门
                var dwstd = $("#dwstd").val();
                data += ",\"attitude\":\"" + dwstd + "\""; //对我司态度
                var cj = $("#cj").val();
                data += ",\"hierarchies\":\"" + cj + "\""; //层级
                var csd = $("#csd").val();
                data += ",\"maturity\":\"" + csd + "\""; //成熟度
                var yxl = $("#yxl").val();
                data += ",\"yxl\":\"" + yxl + "\""; //影响力
                break;
            }
        case "3":
            {
                var html_id = Common.prototype.GetQueryString("html_id");
                if (varIsNull(html_id)) {

                }
                var xmjs = $("#xmjs").val();
                data += ",\"contactrole\":\"" + xmjs + "\""; //项目角色
                var sflgscg = $("#sflgscg").val();
                data += ",\"sflgscg\":\"" + sflgscg + "\""; //是否来公司参观
                var xhjh = $("#xhjh").val();
                data += ",\"xhjh\":\"" + xhjh + "\""; // 喜好忌讳
                var pj = $("#pj").val();
                data += ",\"beizhu\":\"" + pj + "\""; // 评价
                break;
            }
        case "4":
            {
                var lxcs = $("#lxcs").val();
                data += ",\"lxcs\":\"" + lxcs + "\""; //联系次数
                var zjlx = $("#zjlx").val();
                data += ",\"zjycbfsj\":\"" + zjlx + "\""; //最近联系
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
            data: "serviceName=updateWithRoleRight&objectApiName=Contact&data=" + encodeURIComponent(data) + "&binding=" + binding,
            success: function (data) {
                //加载联系人名称
                if (data != "") {
                    if (data.result) {
                        layer.msg("联系人保存成功", function () {
                            window.location.href = "/crm/contact/contact.html?id=" + id;
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

var NewContact = function () {};

NewContact.prototype.newContact = function () {
    var html_id = Common.prototype.GetQueryString("html_id");

    var rurl = varIsNull(Common.prototype.GetQueryString("rurl")) ? null : decodeURIComponent(Common.prototype.GetQueryString("rurl"));

    var data = "[{";
    var khmc = $("#khmc").val();
    data += "\"khmcccname\":\"" + khmc + "\""; //单位名称
    var khmcId = $("#khmcId").val();
    data += ",\"khmc\":\"" + khmcId + "\""; //单位Id
    var xb = $("#xb").val();
    data += ",\"chengwei\":\"" + xb + "\""; //性别
    var lxrxm = $("#lxrxm").val();
    data += ",\"name\":\"" + lxrxm + "\""; //姓名
    var age = $("#age").val();
    data += ",\"nj\":\"" + age + "\""; //年龄
    var zhiwu = $("#zhiwu").val();
    data += ",\"zhiwu\":\"" + zhiwu + "\""; //职务
    var lxfs = $("#lxfs").val();
    data += ",\"shouji\":\"" + lxfs + "\""; //联系方式
    var getWx = $("#getWx").val();
    data += ",\"sfhqwx\":\"" + getWx + "\""; //获取微信
    var bm = $("#bm").val();
    data += ",\"bm\":\"" + bm + "\""; //部门
    var bumen = $("#bumen").val();
    data += ",\"bumen\":\"" + bumen + "\""; //其他部门
    var dwstd = $("#dwstd").val();
    data += ",\"attitude\":\"" + dwstd + "\""; //对我司态度
    var yxl = $("#yxl").val();
    data += ",\"yxl\":\"" + yxl + "\""; //影响力
    var cj = $("#cj").val();
    data += ",\"hierarchies\":\"" + cj + "\""; //层级
    var csd = $("#csd").val();
    data += ",\"maturity\":\"" + csd + "\""; //成熟度
    var xmjs = $("#xmjs").val();
    data += ",\"contactrole\":\"" + xmjs + "\""; //项目角色
    var sflgscg = $("#sflgscg").val();
    data += ",\"sflgscg\":\"" + sflgscg + "\""; //是否来公司参观
    var xhjh = $("#xhjh").val();
    data += ",\"xhjh\":\"" + xhjh + "\""; // 喜好忌讳
    var pj = $("#pj").val();
    data += ",\"beizhu\":\"" + pj + "\""; // 评价
    var lxcs = $("#lxcs").val();
    data += ",\"lxcs\":\"" + lxcs + "\""; //联系次数
    var zjlx = $("#zjlx").val();
    data += ",\"zjycbfsj\":\"" + zjlx + "\""; //最近联系
    data += "}]";

    var binding = Cookies.prototype.GetCookie('binding');
    if (binding != null) {
        $.ajax({
            type: "post",
            dataType: "json",
            url: url,
            data: "serviceName=insertWithRoleRight&objectApiName=Contact&data=" + encodeURIComponent(data) + "&binding=" + binding,
            success: function (data) {
                if (data != "") {
                    if (data.result) {

                        var id = data.data.ids[0].id;
                        if (!varIsNull(html_id)) {
                            layer.msg("联系人保存成功");
                            var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
                            parent.$("#" + html_id).val(lxrxm);
                            parent.$("#" + html_id + "Id").val(id);
                            parent.layer.close(index);
                        } else {
                            if (varIsNull(rurl)) {
                                layer.msg("联系人保存成功", function () {
                                    window.location.href = "/crm/contact/contact.html?id=" + id;
                                });
                            } else {
                                layer.msg("联系人保存成功", function () {
                                    window.location.href = rurl;
                                });
                            }
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

NewContact.prototype.initDwmc = function () {
    var binding = Cookies.prototype.GetCookie('binding');
    var customerid = Common.prototype.GetQueryString("customerid");
    var expressions = "id = '" + customerid + "'";
    var params = "serviceName=cqueryWithRoleRight&objectApiName=Account&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding + "&isAddDelete=" + false;
    if (!varIsNull(customerid)) {
        $("#khmcId").val(customerid);
        if (binding != null) {
            $.ajax({
                type: "get",
                dataType: "json",
                url: url,
                data: params,
                success: function (data) {
                    //加载联系人名称
                    if (data != "") {
                        if (data.result) {
                            if (data.data.length > 0) {
                                $("#khmc").val(data.data[0].name);
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
    }
}



window.newContact = new NewContact();