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
                newVisit.SaveVisit(stepnum);
            } else {
                fishedStep += 1;
            }


        } else {
            return false;
        }
    });

    $(".selectCustomer").on("click", AddProject.prototype.ShowSelectCousomerD);

    $(".selectContacts").on("click", AddProject.prototype.ShowSelectContactsD);

    $(".selectProject").on("click", newVisit.ShowSelectPorjectD);

    $(".in_Choice").on("click", function () {
        $(".in_Choice").removeClass("modelSelected");
        $(this).addClass("modelSelected");
        $("#model").val($(this).data("value"));
    });

    $(".btn_search").on("click", function () {
        AddProject.prototype.search(1, 15);
    });

    $(".btn_search_contacts").on("click", function () {
        AddProject.prototype.searchContacts(1, 15);
    });

    $(".btn_search_project").on("click", function () {
        newVisit.searchProject(1, 15);
    });

    $(".addcontact").on("click", newVisit.newContact);

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
        var entry_name = $("#khmc").val();
        if (varIsNull(entry_name)) {
            layer.msg("客户名称不能为空");
            return false;
        }
        var bfdd = $("#bfdd").val();
        if (varIsNull(bfdd)) {
            layer.msg("拜访地点不能为空");
            return false;
        }

        var bcbfsj = $("#bcbfsj").val();
        if (varIsNull(bcbfsj)) {
            layer.msg("本次拜访时间不能为空");
            return false;
        }
    }


    if ((!isEdit && step > 1) || (isEdit && step == 2)) {
        var lxr1 = $("#lxr1").val();
        if (varIsNull(lxr1)) {
            layer.msg("联系人1不能为空");
            return false;
        }
    }

    if ((!isEdit && step > 2) || (isEdit && step == 3)) {
        var bfmdnr = $("#bfmdnr").val();
        if (varIsNull(bfmdnr)) {
            layer.msg("拜访目的内容不能为空");
            return false;
        }

        var bffs = $("#bffs").val();
        if (varIsNull(bffs)) {
            layer.msg("拜访方式不能为空");
            return false;
        }

        var bfjy = $("#bfjy").val();
        if (varIsNull(bfjy)) {
            layer.msg("拜访纪要不能为空");
            return false;
        }

        var xybjh = $("#xybjh").val();
        if (varIsNull(xybjh)) {
            layer.msg("下一步计划不能为空");
            return false;
        }
    }

    if ((!isEdit && step > 3) || (isEdit && step == 4)) {
        var xmmc = $("#xmmc").val();
        if (varIsNull(xmmc)) {
            layer.msg("项目名称不能为空");
            return false;
        }

        if (!isEdit) {
            newVisit.newVisit();
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

$(".projectList").scroll(function () {
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
        newVisit.searchProject(currentPage + 1, 15);
    }
});

AddProject.prototype.initData = function () {
    var binding = Cookies.prototype.GetCookie('binding');
    var id = Common.prototype.GetQueryString("id");
    var proId = Common.prototype.GetQueryString("proId");
    
    if (varIsNull(id)) {
        if(!varIsNull(proId)){
            var expressions = "id = '" + proId + "'";
            var params = "serviceName=cqueryWithRoleRight&objectApiName=xmbb&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding + "&isAddDelete=" + false;
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
                                $("#xmmcId").val(proId);  //关联项目id
                                $("#xmmc").val(pro.name);//项目名称
                                $("#xmmcDqjd").val(pro.dqjd);//当前阶段
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
        return;
    } else {
        $("title").html("远大住工-编辑拜访");
        $(".title_center").html("编辑拜访");
        oldTitle = "编辑拜访";
    }

    
    var expressions = "id = '" + id + "'";
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
                    if (data.data.length > 0) {
                        var visit = data.data[0];
                        $("#khmc").val(visit.khmcccname);
                        $("#khmcId").val(visit.khmc);
                        $("#bfdd").val(visit.bfaddress);
                        $("#bcbfsj").val(new Date(visit.bcbfsj).Format("yyyy-MM-dd"));
                        $("#lxr1Id").val(visit.khname1);
                        $("#lxr1").val(visit.khname1ccname);
                        $("#lxr2Id").val(visit.khname2);
                        $("#lxr2").val(visit.khname2ccname);
                        $("#bfmdnr").val(visit.bfmdnr);
                        $("#bffs").val(visit.bfway);
                        $("#bfjy").val(visit.bfjiyao);
                        $("#xybjh").val(visit.nextjh);
                        $("#xmmcId").val(visit.xmmc1);
                        $("#xmmc").val(visit.xmmc1ccname);
                        $("#xmmcDqjd").val(visit.dqjd);
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

var NewVisit = function () {};

NewVisit.prototype.newContact = function () {
    var html_id = $(this).data("htmlid");
    layer.open({
        type: 2,
        title: false,
        //closeBtn: false,
        shadeClose: true,
        shade: 0.8,
        area: ['100%', '100%'],
        //maxmin: true,
        content: "/crm/contact/newContact.html?html_id=" + html_id + "#/step1" //iframe的url
    });
};

//新建拜访
NewVisit.prototype.newVisit = function () {
    var returnurl = decodeURIComponent(Common.prototype.GetQueryString("returnurl"));

    var data = "[{";
    var khmc = $("#khmc").val();
    data += "\"khmcccname\":\"" + khmc + "\""; //客户名称
    var khmcId = $("#khmcId").val();
    data += ",\"khmc\":\"" + khmcId + "\""; //客户名称Id
    var bfdd = $("#bfdd").val();
    data += ",\"bfaddress\":\"" + bfdd + "\""; //拜访地点
    var bcbfsj = $("#bcbfsj").val();
    data += ",\"bcbfsj\":\"" + bcbfsj + "\""; //本次拜访时间
    var lxr1Id = $("#lxr1Id").val();
    data += ",\"khname1\":\"" + lxr1Id + "\""; //联系人1
    var lxr2Id = $("#lxr2Id").val();
    data += ",\"khname2\":\"" + lxr2Id + "\""; //联系人2
    var bfmdnr = $("#bfmdnr").val();
    data += ",\"bfmdnr\":\"" + bfmdnr + "\""; //拜访目的内容
    var bffs = $("#bffs").val();
    data += ",\"bfway\":\"" + bffs + "\""; //拜访方式
    var bfjy = $("#bfjy").val();
    data += ",\"bfjiyao\":\"" + bfjy + "\""; //拜访纪要
    var xybjh = $("#xybjh").val();
    data += ",\"nextjh\":\"" + xybjh + "\""; //下一步计划
    //图片
    var xmmcId = $("#xmmcId").val();
    data += ",\"xmmc1\":\"" + xmmcId + "\""; //关联项目Id
    var xmmcDqjd = $("#xmmcDqjd").val();
    data += ",\"dqjd\":\"" + xmmcDqjd + "\""; //关联项目Id
    
    data += ",\"recordtype\":\"20173B4237F7803tbiOc\""; //记录类型
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
                        layer.msg("客户拜访保存成功",function(){
                            if(!varIsNull(returnurl)){
                                window.location.href = returnurl;
                            }else{
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

}

NewVisit.prototype.ShowSelectPorjectD = function () {
    var id = $(this).data("id");
    $("#selectProjectDialogs").addClass("flexLayout");
    $("#selectProjectDialogs").removeClass("none");
    $("#selectProjectDialogs").data("id", id);
    $(".title_center").addClass("flexLayout");
    $(".title_center").html("<span class='flexItem'>选择项目</span><a class='new'></a>");
    // $(".new").on("click", AddProject.prototype.ShowAddCustomer);  前往新建联系人界面
    $(".back").off("click", AddProject.prototype.BackToProject);
    $(".back").on("click", function () {
        AddProject.prototype.BackToStep("#selectProjectDialogs", oldTitle);
    });
    $(".right_menu").css("display", "none");
    $(".title_btn").append("<a id='btn_new_sure'>确定</a>");
    $("#btn_new_sure").on("click", newVisit.SelectProject);
}

//选择项目
NewVisit.prototype.SelectProject = function () {
    var input_id = $("#selectProjectDialogs").data("id");
    var value = $(this).find("span").html();
    var id = $(this).data("id");
    var dqjd = $(this).data("dqjd");
    $("#" + input_id).val(value);
    $("#" + input_id + "Id").val(id);
    $("#" + input_id + "Dqjd").val(dqjd);
    AddProject.prototype.BackToStep("#selectProjectDialogs", oldTitle);
};

NewVisit.prototype.searchProject = function (pageNum, pageSize) {
    var expressions = "";
    var keyword = $("#keyWordProject").val();
    if (keyword != "") {
        expressions += "name like '%" + keyword + "%'"
    } else {
        expressions = "";
    }
    newVisit.LoadProject(pageNum, pageSize, expressions);
    return false;
}

//加载项目  -- 查找项目框 搜索
NewVisit.prototype.LoadProject = function (pageNum, pageSize, expressions) {
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
                            $(".projectList").find("li").on("click", newVisit.SelectProject);
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

//保存客户拜访（编辑用）
NewVisit.prototype.SaveVisit = function (stepNum) {
    var data = "[{";
    var id = Common.prototype.GetQueryString("id");
    data += "\"id\":\"" + id + "\""; //客户拜访Id
    switch (stepNum + "") {
        case "1":
            {
                var khmc = $("#khmc").val();
                data += ",\"khmcccname\":\"" + khmc + "\""; //客户名称
                var khmcId = $("#khmcId").val();
                data += ",\"khmc\":\"" + khmcId + "\""; //客户名称Id
                var bfdd = $("#bfdd").val();
                data += ",\"bfaddress\":\"" + bfdd + "\""; //拜访地点
                var bcbfsj = $("#bcbfsj").val();                
                break;
            }
        case "2":
            {
                var lxr1Id = $("#lxr1Id").val();
                data += ",\"khname1\":\"" + lxr1Id + "\""; //联系人1
                var lxr2Id = $("#lxr2Id").val();
                data += ",\"khname2\":\"" + lxr2Id + "\""; //联系人2
                break;
            }
        case "3":
            {
                var bfmdnr = $("#bfmdnr").val();
                data += ",\"bfmdnr\":\"" + bfmdnr + "\""; //拜访目的内容
                var bffs = $("#bffs").val();
                data += ",\"bfway\":\"" + bffs + "\""; //拜访方式
                var bfjy = $("#bfjy").val();
                data += ",\"bfjiyao\":\"" + bfjy + "\""; //拜访纪要
                var xybjh = $("#xybjh").val();
                data += ",\"nextjh\":\"" + xybjh + "\""; //下一步计划
                //图片
                break;
            }
        case "4":
            {
                var xmmcId = $("#xmmcId").val();
                data += ",\"xmmc1\":\"" + xmmcId + "\""; //关联项目Id
                var xmmcDqjd = $("#xmmcDqjd").val();
                data += ",\"dqjd\":\"" + xmmcDqjd + "\""; //当前阶段
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
            data: "serviceName=updateWithRoleRight&objectApiName=khbf&data=" + encodeURIComponent(data) + "&binding=" + binding,
            success: function (data) {
                if (data != "") {
                    if (data.result) {
                        layer.msg("保存成功", function () {
                            window.location.href = "/crm/visit/visitDetail.html?id=" + id;
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


window.newVisit = new NewVisit();