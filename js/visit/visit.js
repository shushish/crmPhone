$(document).ready(function () {
    Common.prototype.checkLoginStatu();
});

window.Router.route("/date", function () {
    var url = window.location.hash;
    var date = "";
    if (url.indexOf("_") > 0) {
        date = url.substring(url.indexOf("_") + 1);
    }

    if (varIsNull(date)) {
        date = new Date().Format("yyyy-M-d");
    } else {
        date = new Date(date).Format("yyyy-M-d");
    }

    visit.LoadVisit(new Date(date).Format("yyyy-M-d"));
});

// $(function () {
//     // calendar.config.mark["2018-5-16"] = "16<span class='laydate-day-mark-red'></span>";//标红点
//     //calendar.config.mark["2018-05-06"] = ""; //标绿点
//     //visit.LoadVisit();
//     // visit.SetCurrentDate
//     $(".addvisit").on("click", function () {
//         layer.msg('', {
//                 time: false, //20s后自动关闭
//                 btn: ['新建拜访计划', '新建客户拜访'],
//                 shade: 0.5,
//                 shadeClose: true,
//                 yes: function (index, layero) {
//                     window.location.href = "/crm/visit/newVisitPlan.html";
//                 },
//                 btn2: function (index, layero) {
//                     window.location.href = "/crm/visit/newVisit.html#/step1";
//                 }
//             },

//         );
//     });

// });

var visits = {};
var calendar = null;

var Visit = function () {}

Visit.prototype.LoadVisit = function (date) {
    var binding = Cookies.prototype.GetCookie('binding');
    var userId = Cookies.prototype.GetCookie('userId');
    var roleId = Cookies.prototype.GetCookie('roleId');
    //获取客户拜访
    var endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);
    endDate = new Date(endDate).Format("yyyy-MM");
    var beginDate = new Date();
    beginDate = new Date(beginDate).Format("yyyy-MM");
    var expressions = "select o.bcbfsj,o.id,o.name,o.bfmdnr,ac.name khmcccname from khbf o,ccuser u,Account ac where o.ownerid=u.id and o.khmc=ac.id and o.is_deleted <> '1' and (o.bcbfsj between to_date('" + beginDate + "','yyyy/mm/dd') and to_date('" + endDate + "','yyyy/mm/dd')) and u.role in (select roleid from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) order by o.lastmodifydate desc";
    expressions = "select x.name as xmname,o.bcbfsj,o.id,o.name,o.bfmdnr,o.plan1,o.plan2,o.plan3,o.plan4,o.plan5,o.plan6,o.result1,o.result2,o.result3,o.result4,o.result5,o.result6,ac.name khmcccname,o.createdate from khbf o left join xmbb x on o.xmmc1 = x.id left join ccuser u on o.ownerid=u.id left join Account ac on o.khmc=ac.id where o.is_deleted <> '1' and ((o.bcbfsj between to_date('" + beginDate + "','yyyy/MM') and to_date('" + endDate + "','yyyy/MM')) or (o.bcbfsj is null and o.createdate between to_date('" + beginDate + "','yyyy/MM') and to_date('" + endDate + "','yyyy/MM'))) and u.role in (select roleid from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) order by o.lastmodifydate desc";
    //expressions = "select o.bcbfsj,o.id,o.name,o.bfmdnr,ac.name khmcccname from khbf o left join ccuser u on o.ownerid=u.id left join Account ac on o.khmc=ac.id left join tp_sys_role r on u.role = r.roleid where o.is_deleted <> '1' and (o.bcbfsj between to_date('"+beginDate+"','yyyy/mm/dd') and to_date('"+endDate+"','yyyy/mm/dd')) and r.parentrole_id = '" + roleId + "' and r.gap >=0 order by o.lastmodifydate desc";// and u.role in (select roleid from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) order by o.lastmodifydate desc";
    var data = "serviceName=cqlQuery&objectApiName=khbf&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding;
    if (!jQuery.isEmptyObject(visits)) {
        $(".layui-laydate-content").find(".layui-this").removeClass("layui-this");
        $(".layui-laydate-content").find("td[lay-ymd='" + date + "']").addClass("layui-this");
        calendar.config.value = date;
        visit.LoadVisitForDay(date);
        return;
    }

    calendar = laydate.render({
        elem: '#calendar',
        position: 'static',
        btns: ['now'],
        // mark: marks,
        // value: date,
        change: function (value, date, endDate) { //监听日期被切换
            // visit.LoadVisitForDay(value);
            window.location.href = "#/date_" + new Date(value).Format("yyyy-MM-dd");
            $.each(visits, function (key) {
                $(".layui-laydate-content").find("td[lay-ymd='" + new Date(key).Format("yyyy-M-d") + "']").addClass("laydate-day-mark"); //当日有拜访则标绿点
            });
        },
        done: function (value, date, endDate) { //监听日期被切换
            // visit.LoadVisitForDay(value);
            window.location.href = "#/date_" + new Date(value).Format("yyyy-MM-dd");
            $.each(visits, function (key) {
                $(".layui-laydate-content").find("td[lay-ymd='" + new Date(key).Format("yyyy-M-d") + "']").addClass("laydate-day-mark"); //当日有拜访则标绿点
            });
        }
    });
    visit.SetCurrentDate();
    // $("#calendar").html("");
    // visits = {};
    var index = layer.load(1, {
        shade: false
    });
    $.ajax({
        type: "get",
        dataType: "json",
        url: url,
        data: data,
        success: function (data) {
            //获取客户拜访
            if (data != "") {
                if (data.result) {
                    if (data.data.length >= 0) {
                        var marks = {};
                        data.data.forEach(function (value, index) {
                            if (varIsNull(value.bcbfsj)) {
                                marks[new Date(value.createdate).Format("yyyy-MM-dd")] = "";
                                if (varIsNull(visits[new Date(value.createdate).Format("yyyy-MM-dd")])) {
                                    visits[new Date(value.createdate).Format("yyyy-MM-dd")] = new Array();
                                    visits[new Date(value.createdate).Format("yyyy-MM-dd")].push(value);
                                    $(".layui-laydate-content").find("td[lay-ymd='" + new Date(value.createdate).Format("yyyy-M-d") + "']").addClass("laydate-day-mark"); //当日有拜访则标绿点
                                } else {
                                    visits[new Date(value.createdate).Format("yyyy-MM-dd")].push(value);
                                }
                            } else {
                                marks[new Date(value.bcbfsj).Format("yyyy-MM-dd")] = "";
                                if (varIsNull(visits[new Date(value.bcbfsj).Format("yyyy-MM-dd")])) {
                                    visits[new Date(value.bcbfsj).Format("yyyy-MM-dd")] = new Array();
                                    visits[new Date(value.bcbfsj).Format("yyyy-MM-dd")].push(value);
                                    $(".layui-laydate-content").find("td[lay-ymd='" + new Date(value.bcbfsj).Format("yyyy-M-d") + "']").addClass("laydate-day-mark"); //当日有拜访则标绿点
                                } else {
                                    visits[new Date(value.bcbfsj).Format("yyyy-MM-dd")].push(value);
                                }
                            }
                        });
                        visit.LoadVisitForDay(date);
                    }
                    //return;
                } else {
                    calendar = laydate.render({
                        elem: '#calendar',
                        position: 'static',
                        btns: ['now'],
                        value: date,
                        change: function (value, date) { //监听日期被切换
                            //layer.msg(value + ":" + date);
                        }
                    });
                }
            }
            layer.close(index);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            calendar = laydate.render({
                elem: '#calendar',
                position: 'static',
                btns: ['now'],
                value: date,
                change: function (value, date) { //监听日期被切换
                    //layer.msg(value + ":" + date);
                }
            });
            layer.close(index);
        }
    });
}

Visit.prototype.LoadVisitForDay = function (day) {
    $("#visitList").html("");
    var visitlist = visits[new Date(day).Format("yyyy-MM-dd")];
    if (!varIsNull(visitlist)) {
        var html = "";
        visitlist.forEach(function (value, index) {
            if (varIsNull(value.bcbfsj) && !varIsNull(value.plan1)) {
                html += "<div class='pro'>";
                html += "<a href='/crm/visit/visitDetail.html?id=" + value.id + "'>";
                // html += "<div class='icon_p col-lg-2 col-md-2 col-sm-2 col-xs-2'>";
                // html += "<div class='icon_project visit'></div>";
                // html += "</div>";
                html += "<div class='project_info col-lg-11 col-md-11 col-sm-11 col-xs-11'>";
                html += "<div class='projectName'>拜访计划" + "</div>";
                html += "<div class='industry'>编号：" + value.name + "</div>";
                html += "<div class='industry'>项目名称：" + value.xmname + "</div>";
                
                html += "</div>";
                html += "<div class='icon_slid col-lg-1 col-md-1 col-sm-1 col-xs-1'>";
                html += "<span class='slid_up'></span>";
                html += "</div>";
                html += "</a>";
                html += "</div>";
            } else {
                html += "<div class='pro'>";
                html += "<a href='/crm/visit/visitDetail.html?id=" + value.id + "'>";
                // html += "<div class='icon_p col-lg-2 col-md-2 col-sm-2 col-xs-2'>";
                // html += "<div class='icon_project visit'></div>";
                // html += "</div>";
                html += "<div class='project_info col-lg-11 col-md-11 col-sm-11 col-xs-11'>";
                html += "<div class='projectName'>编号：" + value.name + "</div>";
                html += "<div class='industry'>客户：" + value.khmcccname + "</div>";
                html += "<div class='industry'>目的：" + value.bfmdnr + "</div>";
                html += "</div>";
                html += "<div class='icon_slid col-lg-1 col-md-1 col-sm-1 col-xs-1'>";
                html += "<span class='slid_up'></span>";
                html += "</div>";
                html += "</a>";
                html += "</div>";
            }

        });
        $("#visitList").html(html);
    }
}

Visit.prototype.SetCurrentDate = function () {
    var url = window.location.hash;
    var date = "";
    if (url.indexOf("_") > 0) {
        date = url.substring(url.indexOf("_") + 1);
    }

    if (varIsNull(date)) {
        date = new Date().Format("yyyy-M-d");
    } else {
        date = new Date(date).Format("yyyy-M-d");
    }
    $(".layui-laydate-content").find(".layui-this").removeClass("layui-this");
    $(".layui-laydate-content").find("td[lay-ymd='" + date + "']").addClass("layui-this");
    calendar.config.value = date;
}


window.visit = new Visit();