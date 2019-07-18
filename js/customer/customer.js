$(document).ready(function () {
    Common.prototype.checkLoginStatu();
});

$(function () {
    $(".back").on("click", Common.prototype.Back);

    //绑定遮罩点击事件
    $(".masked").on("click", function () {
        Common.prototype.CloseMaskLayer("close-with-masklayer", Customer.prototype.MaskedClick);
    });

    //绑定搜索按钮点击事件，打开搜索菜单
    $(".btn_search").on("click", function () {
        Common.prototype.ShowMaskLayer();
        $(".search_content").css("display", "block");
        $(".addproject").css("display", "none");
        Customer.prototype.ShowSearchBackBtn();

    });

    //行业输入框点击事件，打开行业选择菜单
    $(".industry_input").on("click", function () {
        $(".industry_content").css("display", "block");
        Customer.prototype.ShowIndustryBackBtn();
    });

    //重置按钮点击事件
    $("#btn_reset").on("click", function () {
        Customer.prototype.ResetSearch();
    });

    //搜索按钮点击事件，搜索功能
    $("#btn_search").on("click", function () {
        currentPage = 0;
        var nameKeyWord = $(".proname").val();
        var creatorKeyWord = $(".creator").val();
        var expressions = "";
        if (nameKeyWord != null && nameKeyWord != undefined && $.trim(nameKeyWord) != "") {
            expressions += "o.name like '%" + nameKeyWord + "%'";
        }
        if (creatorKeyWord != null && creatorKeyWord != undefined && $.trim(creatorKeyWord) != "") {
            if (expressions != "") {
                expressions += " or ";
            }
            expressions += "u.name like '%" + creatorKeyWord + "%'";
        }
        Customer.prototype.LoadCustomer(1, 15, expressions);

        Common.prototype.CloseMaskLayer("close-with-masklayer", Customer.prototype.MaskedClick);
    });

    //按条件筛选功能
    $(".dropdown-menu").find("li").on("click", function () {
        var select = $(this).html();
        var id = $(this).data("id");
        $(".filterName").html(select);
        var express = "o.recordtype = '" + id + "'";
        if($(this).hasClass("stage")){
            Customer.prototype.LoadCustomerNum("recordtype",id);
        }else{
            Customer.prototype.LoadCustomerNum("accounttype",id);
            express = "o.accounttype = '" + id + "'";
        }
        
        currentPage = 0;
        if(id == "全部"){
            Customer.prototype.LoadCustomer(1, 15);
        }else{
            Customer.prototype.LoadCustomer(1, 15, express);
        }
        
    });

    Customer.prototype.LoadCustomerNum("","全部");
    Customer.prototype.LoadCustomer(1, 15);

});

var Customer = function () {};

//显示搜索返回按钮
Customer.prototype.ShowSearchBackBtn = function () {
    $(".back").css("display", "block");
    $(".back").off("click", Common.prototype.Back);
    $(".back").on("click", Customer.prototype.SearchBack);
};

//搜索返回
Customer.prototype.SearchBack = function () {
    Common.prototype.CloseMaskLayer("close-with-masklayer", Customer.prototype.MaskedClick);
};

//遮罩点击时需要执行的操作
Customer.prototype.MaskedClick = function () {
    $(".back").off("click", Customer.prototype.SearchBack);
    // $(".back").css("display", "none");
    $(".back").on("click", Common.prototype.Back);
    $(".addproject").css("display", "block");
    Customer.prototype.ResetSearch();
}

//显示行业选择返回按钮
Customer.prototype.ShowIndustryBackBtn = function () {
    $(".back").off("click");
    $(".back").on("click", Customer.prototype.IndustryBack);
};

//行业选择返回
Customer.prototype.IndustryBack = function () {
    $(".back").off("click");
    $(".industry_content").css("display", "none");
    $(".back").on("click", Customer.prototype.SearchBack);
};

Customer.prototype.ResetSearch = function () {
    $(".search_content").find("input").val("");
};

$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $(document).height();
    if (scrollTop > 3000) {
        $("#GoToTop").fadeIn("slow");
    } else {
        $("#GoToTop").fadeOut("slow");
    }
    var windowHeight = $(this).height();
    var positionValue = (scrollTop + windowHeight) - scrollHeight;
    if (positionValue >= 0) {
        //执行ajax，获取数据
        Customer.prototype.LoadCustomer(currentPage + 1, 15, currentExpressions);
    }
});


//---------------------获取数据------------------------------------------------------
var currentPage = 0;
var currentExpressions = "";
Customer.prototype.LoadCustomer = function (pageNum, pageSize, expressions) {
    var binding = Cookies.prototype.GetCookie('binding');
    var userId = Cookies.prototype.GetCookie('userId');
    var roleId = Cookies.prototype.GetCookie('roleId');
    var begin = (pageNum - 1) * pageSize + 1;
    var end = begin + pageSize - 1;
    if (expressions == null || expressions == undefined || $.trim(expressions) == "") {
        //无条件 列表
        expressions = "select * from (select A.*,ROWNUM RN from (select o.*,u.name ownername from Account o,ccuser u where o.ownerid=u.id and o.is_deleted <> '1' and u.role in (select roleid from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) order by o.lastmodifydate desc) A where ROWNUM <= " + end + ") where RN >= " + begin;
        currentExpressions = "";
    } else {
        currentExpressions = expressions;
        expressions = "select * from (select A.*,ROWNUM RN from (select o.*,u.name ownername from Account o,ccuser u where o.ownerid=u.id and o.is_deleted <> '1' and (" + expressions + ") and u.role in (select roleid from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) order by o.lastmodifydate desc) A where ROWNUM <= " + end + ") where RN >= " + begin;
    }
    var params = "serviceName=cqlQuery&objectApiName=xmbb&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding;

    if (pageNum <= currentPage) {
        return;
    }
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
                    if (pageNum == 1) {
                        $("#projectList").html("");
                    }
                    if (data.data.length > 0) {
                        var html = "";
                        data.data.forEach(function (value, index) {
                            html += "<div class='clearfix'></div>";
                            html += "<div class='pro'>";

                            var khtype = "";
                            var customer_img ="";
                            if ("20185C6759C8A039WerZ" == value.recordtype) {
                                khtype = "战略客户";
                                customer_img = "strategy";
                            } else if ("2018DC93F85F79DibdML" == value.recordtype) {
                                khtype = "重点客户";
                                customer_img = "emphasis";
                            } else if ("2018DAC38ED8228JIoaE" == value.recordtype) {
                                khtype = "普通客户";
                                customer_img = "common";
                            }

                            html += "<div class='icon_p col-lg-2 col-md-2 col-sm-2 col-xs-2'>"
                            html += "<div class='icon_project " + customer_img + "'></div>"
                            html += "</div>";                            

                            html += "<div class='project_info col-lg-9 col-md-9 col-sm-9 col-xs-9'>";
                            html += "<div class='projectName'><a href='/crm/customer/customerrecord.html?id=" + value.id + "'>" + value.name + "</a></div>";
                            html += "<div class='industry'>记录类型：" + khtype + "</div>";
                            html += "<div class='industry'>所有人：" + value.ownername + "</div>";
                            html += "</div>";

                            html += "<div class='icon_slid col-lg-1 col-md-1 col-sm-1 col-xs-1'>";
                            html += "<a class='pro_slid' onclick='Customer.prototype.ProToggle(this)'>";
                            html += "<span class='slid_up'></span>";
                            html += "</a>";
                            // html += "</div>";
                            html += "</div>";

                            html += "<div class='pro_edit pro_edit_hidden'>";
                            html += "<div class='col-xs-3 col-sm-3 col-md-3 col-lg-3 btn_editor'>";
                            html += "<a href='/crm/visit/visitList.html?khmcId=" + value.id + "' data-khmcId='" + value.id + "'>";
                            html += "<span class='visit editor-span'></span>";
                            html += "<div class='lable_footer'>拜访</div>";
                            html += "</a>";
                            html += "</div>";

                            html += "<div class='col-xs-3 col-sm-3 col-md-3 col-lg-3 btn_editor'>";
                            html += "<a href='/crm/contact/contactList.html?khmcId=" + value.id + "' data-khmcId='" + value.id + "'>";
                            html += "<span class='contact editor-span'></span>";
                            html += "<div class='lable_footer'>联系</div>";
                            html += "</a>";
                            html += "</div>";

                            html += "<div class='col-xs-3 col-sm-3 col-md-3 col-lg-3 btn_editor'>";
                            html += "<a href='/crm/project/project.html?customerId=" + value.id + "' data-customerId='" + value.id + "'>";
                            html += "<span class='attachment editor-span'></span>";
                            html += "<div class='lable_footer'>项目</div>";
                            html += "</a>";
                            html += "</div>";


                            html += "</div>"; //pro_edit end

                            html += "</div>";
                        });
                        if (pageNum > currentPage) {
                            $("#projectList").append(html);
                            currentPage = pageNum;
                        }
                        $(".close_pro").on("click", Customer.prototype.ClosePro);
                    } else {
                        layer.msg("没有更多数据了！");
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
}

Customer.prototype.LoadCustomerNum = function (fieldName,stage) {
    var binding = Cookies.prototype.GetCookie('binding');
    var userId = Cookies.prototype.GetCookie('userId');
    var roleId = Cookies.prototype.GetCookie('roleId');
    var expressions = "";
    if (stage == "全部") {
        expressions = "select count(1) as num from Account o,ccuser u where o.ownerid=u.id and o.is_deleted <> '1' and u.role in (select roleid from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";
    } else {
        expressions = "select count(1) as num from Account o,ccuser u where o.ownerid=u.id and o.is_deleted <> '1' and o."+fieldName+"='" + stage + "' and u.role in (select roleid from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";
    }

    var params = "serviceName=cqlQuery&objectApiName=Account&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding;
    $.ajax({
        type: "get",
        dataType: "json",
        url: url,
        data: params,
        success: function (data) {
            if (data != "") {
                if (data.result) {
                    if (data.data.length > 0) {
                        $("#proNum").html(data.data[0].num);                        
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

Customer.prototype.ProToggle = function (obj) {
    var editBlock = $(obj).parents(".pro").children(".pro_edit");
    if (editBlock.hasClass("pro_edit_hidden")) {
        editBlock.removeClass("pro_edit_hidden");
        $(obj).children(".slid_up").addClass("reversal");
    } else {
        editBlock.addClass("pro_edit_hidden");
        $(obj).children(".slid_up").removeClass("reversal");
    }
};

