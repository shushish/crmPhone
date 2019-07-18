$(document).ready(function () {
    Common.prototype.checkLoginStatu();
});

var shwoAllData = false;
$(function () {
    var role = Cookies.prototype.GetCookie('role');
    var userCompany = Cookies.prototype.GetCookie('company');
    if (role == '副总' || userCompany == '远大大数据市场管理') {
        shwoAllData = true;
    }

    dataBoard.InitDate();
    //绑定遮罩点击事件
    $(".masked").on("click", function () {
        Common.prototype.CloseMaskLayer("close-with-masklayer", dataBoard.MaskedClick);
    });

    //时间按钮点击事件
    $(".btn_time").on("click", function () {
        Common.prototype.ShowMaskLayer();
        $(".search_content").css("display", "block");
        $(".addproject").css("display", "none");
        dataBoard.ShowSearchBackBtn();
    });

    $(".showAll").on("click", function () {
        if ($(".khbtenafter").hasClass("none")) {
            $(".khbtenafter").removeClass("none");
            $(".showAll").html("收起");
        } else {
            $(".khbtenafter").addClass("none");
            $(".showAll").html("显示所有");
        }
    });

    $(".khjlShowAll").on("click", function () {
        if ($(".khjltenafter").hasClass("none")) {
            $(".khjltenafter").removeClass("none");
            $(".khjlShowAll").html("收起");
        } else {
            $(".khjltenafter").addClass("none");
            $(".khjlShowAll").html("显示所有");
        }
    });


    var userId = Cookies.prototype.GetCookie('userId');
    var company = Cookies.prototype.GetCookie('company');
    var begin = new Date($(".beginTime").val().replace(/-/g, '/')).Format("yyyy-MM-dd");
    var end = new Date($(".endTime").val().replace(/-/g, '/')).Format("yyyy-MM-dd");
    var projectlx = $(".xm_l").html();

    //排序功能
    // $(".orderbyxse").on("click", function () {
    //     var companyName = $(".company_l").html();
    //     begin = new Date($(".beginTime").val().replace(/-/g, '/')).Format("yyyy-MM-dd");
    //     end = new Date($(".endTime").val().replace(/-/g, '/')).Format("yyyy-MM-dd");
    //     if ($(".order").hasClass('reversal')) {
    //         $(".order").removeClass('reversal');
    //         dataBoard.loadxmzjd(begin, end, companyName, "desc");
    //     } else {
    //         $(".order").addClass('reversal');
    //         dataBoard.loadxmzjd(begin, end, companyName, "asc");
    //     }
    // });

    var year = new Date().getFullYear();

    if (company != '远大大数据市场管理') { //userId != '005cca20150528yEuh84'
        //$(".phb").addClass("none");
        $(".companies").remove();
        $(".order-menu2").html("<span class='company_l'>公司:" + company + "</span>");

        dataBoard.LoadProgressbar(year + "-01-01", (year + 1) + "-01-01", "公司:" + company);
        dataBoard.LoadDataByDate(year + "-01-01", (year + 1) + "-01-01", "公司:" + company, projectlx);
        dataBoard.loadXsld(year + "-01-01", (year + 1) + "-01-01", "公司:" + company, projectlx);
    } else {
        dataBoard.LoadProgressbar(year + "-01-01", (year + 1) + "-01-01", "公司:全部");
        dataBoard.LoadDataByDate(year + "-01-01", (year + 1) + "-01-01", "公司:全部", projectlx);
        dataBoard.loadXsld(year + "-01-01", (year + 1) + "-01-01", "公司:全部", projectlx);
    }

    // 选择公司
    $(".company").on("click", function () {
        $(".company_l").html("公司:" + $(this).html());
        begin = new Date($(".beginTime").val().replace(/-/g, '/')).Format("yyyy-MM-dd");
        end = new Date($(".endTime").val().replace(/-/g, '/')).Format("yyyy-MM-dd");
        var projectlx = $(".xm_l").html();
        dataBoard.LoadProgressbar(begin, end, "公司:" + $(this).html());

        dataBoard.LoadDataByDate(begin, end, "公司:" + $(this).html(), projectlx);
        dataBoard.loadXsld(begin, end, "公司:" + $(this).html(), projectlx);
    });

    $(".projectlx").on("click", function () {
        $(".xm_l").html("项目:" + $(this).html());
        begin = new Date($(".beginTime").val().replace(/-/g, '/')).Format("yyyy-MM-dd");
        end = new Date($(".endTime").val().replace(/-/g, '/')).Format("yyyy-MM-dd");
        var companyName = $(".company_l").html();
        var projectlx = $(".xm_l").html();
        dataBoard.LoadDataByDate(begin, end, companyName, projectlx);
        dataBoard.loadXsld(begin, end, companyName, projectlx);
    });

    //按时间筛选
    $("#btn_search").on('click', function () {
        begin = new Date($(".beginTime").val().replace(/-/g, '/')).Format("yyyy-MM-dd");
        end = new Date($(".endTime").val().replace(/-/g, '/')).Format("yyyy-MM-dd");
        var companyName = $(".company_l").html();
        var projectlx = $(".xm_l").html();
        dataBoard.LoadProgressbar(begin, end, companyName);

        dataBoard.LoadDataByDate(begin, end, companyName, projectlx);
        dataBoard.loadXsld(begin, end, companyName, projectlx);
        dataBoard.SearchBack();
    });

    $("#btn_reset").on("click", dataBoard.InitDate);

});

var DataBoard = function () {};

DataBoard.prototype = {
    LoadProgressbar: function (beginbegin, end, company) {
        var binding = Cookies.prototype.GetCookie('binding');
        var userId = Cookies.prototype.GetCookie('userId');
        var roleId = Cookies.prototype.GetCookie('roleId');
        var role = Cookies.prototype.GetCookie('role');
        var name = Cookies.prototype.GetCookie('name');
        var userCompany = Cookies.prototype.GetCookie('company');

        var year = new Date().getFullYear();
        var dateExpression1 = "and Extract(year from o.tjsj) = " + year;

        var companyName = company.substring(3);
        var expressions = "";
        var params = "";

        if (role == '副总' || userCompany == '远大大数据市场管理') { //userId == '005cca20150528yEuh84'
            $(".role_zj").addClass("none");

            // 分公司数据            
            // expressions = "select nvl(sum(nvl(a.yjpchte,0)),0) as value,p.name,p.xsrw from (select o.yjpchte,u.company from xmbb o left join ccuser u on o.ownerid=u.id where o.is_deleted <>'1' and o.dqjd = '3-项目签约' " + dateExpression1 + " and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)) a full join pzb p on a.company = p.name where p.is_deleted <>'1' and p.name <> '安徽公司' group by p.name,p.xsrw";
            expressions = "select nvl(sum(nvl(a.yjpchte,0)),0) as value,g.ssgs as name,g.xsrw from (select o.yjpchte,u.company from xmbb o left join ccuser u on o.ownerid=u.id where o.is_deleted <>'1' and o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') " + dateExpression1 + " and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)) a full join (select sum(xsrw2018) as xsrw,ssgs from gzxz where is_deleted <>'1' and name <> '安徽公司' group by ssgs) g on a.company = g.ssgs group by g.ssgs,g.xsrw";
        } else if (role == '总监') {
            $(".role_fz").addClass("none");
            //项目组数据
            expressions = "select nvl(sum(nvl(a.yjpchte,0)),0) as value,g.name,g.xsrw2018 as xsrw from (select o.yjpchte,u.company,u.name,um.name umname from xmbb o left join ccuser u on o.ownerid=u.id left join ccuser um on u.manager = um.id where o.is_deleted <>'1' and o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') " + dateExpression1 + " and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)) a full join gzxz g on a.company = g.ssgs and a.umname = g.name where g.is_deleted <>'1' and (g.name = '" + name + "' or a.name = '" + name + "') group by g.name,g.xsrw2018";
        } else if (Common.prototype.isContains(role, '客户经理')) {
            $(".role_fz").addClass("none");
            //项目组数据
            expressions = "select nvl(sum(nvl(a.yjpchte,0)),0) as value,g.name,g.xsrw2018 as xsrw from (select o.yjpchte,um.company,u.name,um.name umname from xmbb o left join ccuser u on o.ownerid=u.id left join ccuser um on u.manager = um.id where o.is_deleted <>'1' and o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') " + dateExpression1 + " and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)) a left join gzxz g on a.company = g.ssgs and a.umname = g.name where g.is_deleted <>'1' group by g.name,g.xsrw2018";
        } else {
            $(".role_fz").addClass("none");
        }

        if (companyName == "全部") {
            expressions = "select sum(value) as value,sum(xsrw) as xsrw,(sum(value)/sum(xsrw)) as progress,(sum(xsrw) - sum(value)) as gap from (" + expressions + ")";
            //expressions = "select sum(xsrw) as mb from pzb where is_deleted <> '1' and name != '安徽公司'";
            params = "serviceName=cqlQuery&objectApiName=xmbb&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding;
        } else if (companyName == "安徽公司") {
            expressions = "select sum(value) as value,sum(xsrw) as xsrw,(sum(value)/sum(xsrw)) as progress,(sum(xsrw) - sum(value)) as gap from (" + expressions + ") where name in ('阜阳公司','合肥公司','六安公司')";
            params = "serviceName=cqlQuery&objectApiName=pzb&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding;
        } else {
            if (role == '副总' || userCompany == '远大大数据市场管理') { //userId == '005cca20150528yEuh84'
                expressions = "select sum(value) as value,sum(xsrw) as xsrw,(sum(value)/sum(xsrw)) as progress,(sum(xsrw) - sum(value)) as gap from (" + expressions + ") where  name = '" + companyName + "'"; // "select xsrw as mb from pzb where is_deleted <> '1' and name = '" + companyName + "'";
            } else {
                expressions = "select sum(value) as value,sum(xsrw) as xsrw,(sum(value)/sum(xsrw)) as progress,(sum(xsrw) - sum(value)) as gap from (" + expressions + ")"; // "select xsrw as mb from pzb where is_deleted <> '1' and name = '" + companyName + "'";
            }
            params = "serviceName=cqlQuery&objectApiName=pzb&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding;
        }

        var index = layer.load(1, {
            shade: false
        });
        $.ajax({
            type: "post",
            dataType: "json",
            url: url,
            data: params,
            success: function (data) {
                if (data != "") {
                    if (data.result) {
                        if (data.data.length > 0) {
                            var v = data.data[0];
                            var p = varIsNull(v.progress) ? 0 : (v.progress * 100).toFixed(2);
                            var g = varIsNull(v.gap) ? 0 : Common.prototype.NumFormat((v.gap / 10000).toFixed(2));
                            $("#mb").html((v.xsrw / 10000).toFixed(2) + "亿");
                            $("#performance").html("业绩达成" + p + "%," + (v.value / 10000).toFixed(2) + "亿");
                            $("#gap").html("差距" + (100 - p).toFixed(2) + "%," + g + "亿");
                            $(".progress-bar-success").css("width", p + "%");
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
    LoadDataByDate: function (begin, end, company, project) {
        var binding = Cookies.prototype.GetCookie('binding');
        var userId = Cookies.prototype.GetCookie('userId');
        var roleId = Cookies.prototype.GetCookie('roleId');
        var role = Cookies.prototype.GetCookie('role');
        var name = Cookies.prototype.GetCookie('name');
        var userCompany = Cookies.prototype.GetCookie('company');

        var dateExpression = "and o.tjsj between to_date('" + begin + "','yyyy-MM-dd') and to_date('" + end + "','yyyy-MM-dd')";

        var companyName = company.substring(3);
        var projectlx = project.substring(3);

        var projectlxExpression = "";

        if (projectlx != "全部") {
            projectlxExpression = "and o.xmlx = '" + projectlx + "'";
        }
        dataBoard.setLink(begin, end, companyName);
        var expressions = "";

        var expressions_xmzl = "";
        var expressions_xsph = "";
        var expressions_xsph_zj = "";
        var params = "";
        var params_xmzjd = "";
        var params_xmzl = "";
        var params_xsph = "";
        var params_xsph_zj = "";

        var companyExpression = "";
        var companyExpression1 = "";
        var companyExpression2 = "";

        //季度信息
        var now = new Date();
        var nowYear = now.getFullYear();
        var nowMonth = now.getMonth() + 1;
        var quarterBeginyf = 1;
        var quarterEndyf = 3;
        var quarter = 1;
        if (nowMonth <= 3) {
            quarter = 1;
            quarterBeginyf = 1;
            quarterEndyf = 3;
        }
        if (3 < nowMonth && nowMonth < 7) {
            quarter = 2;
            quarterBeginyf = 4;
            quarterEndyf = 6;
        }
        if (6 < nowMonth && nowMonth < 10) {
            quarter = 3;
            quarterBeginyf = 7;
            quarterEndyf = 9;
        }
        if (nowMonth > 9) {
            quarter = 4;
            quarterBeginyf = 10;
            quarterEndyf = 12;
        }

        var quarterBegin = Common.prototype.getFirstQuarterDay(nowYear, quarter);
        var quarterEnd = Common.prototype.getLastQuarterDay(nowYear, quarter);

        //当前季度 时间条件
        var quarterExpression = "and o.tjsj between to_date('" + quarterBegin + "','yyyy-MM-dd') and to_date('" + quarterEnd + "','yyyy-MM-dd')";

        if (role == '副总' || userCompany == '远大大数据市场管理') { //userId == '005cca20150528yEuh84'
            // 分公司数据            
            if (companyName == "全部") {
                companyExpression = "";
                companyExpression1 = "";
                companyExpression2 = "";
            } else if (companyName == "安徽公司") {
                companyExpression = "and u.company in ('阜阳公司','合肥公司','六安公司')";
                companyExpression1 = "and um.company in ('阜阳公司','合肥公司','六安公司')";
                companyExpression2 = "and umm.company in ('阜阳公司','合肥公司','六安公司')";
            } else {
                companyExpression = "and u.company = '" + companyName + "'";
                companyExpression1 = "and um.company = '" + companyName + "'";
                companyExpression2 = "and umm.company = '" + companyName + "'";
            }

            //expressions_xmzjd = "select nvl(sum(c.pchte),0) as hte,u.name,months_between(sysdate,u.rzsj) as m,um.name as umname,um.title as umtitle,u.title,g.xsrw2018 as xsrw from contract c left join xmbb o on c.xmbh11=o.xmbh11 and o.is_deleted <>'1' and o.dqjd = '3-项目签约' " + dateExpression + " full join (select * from ccuser u where u.title like '%客户经理%' and u.isusing='1' and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)) u on c.ownerid = u.id full join (select * from ccuser um where um.title = '总监' and um.isusing='1' and um.company <> '远大大数据市场管理' and um.company <> '安徽公司' " + companyExpression1 + " and um.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)) um on u.manager = um.id left join gzxz g on um.company = g.ssgs and um.name = g.name and g.is_deleted <>'1' where um.name is not null group by u.name,u.title,u.rzsj,um.name,um.title,g.xsrw2018 order by um.name desc";
            //expressions_xmzjd = "select nvl(sum(xm.pchte),0) as hte,u.name,months_between(sysdate,u.rzsj) as m,um.name as umname,um.title as umtitle,u.title,g.xsrw2018 as xsrw from (SELECT c.pchte,c.ownerid from contract c left join xmbb o on c.xmbh11=o.xmbh11 where o.is_deleted <>'1' and o.dqjd = '3-项目签约' " + dateExpression + ") xm full join (select * from ccuser u where (u.title like '%客户经理%' or u.title='总监') and u.isusing='1' and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)) u on xm.ownerid = u.id full join (select * from ccuser um where um.title = '总监' and um.isusing='1' and um.company <> '远大大数据市场管理' and um.company <> '安徽公司' " + companyExpression1 + " and um.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)) um on u.manager = um.id or u.id=um.id left join gzxz g on um.company = g.ssgs and um.name = g.name and g.is_deleted <>'1' where um.name is not null group by u.name,u.title,u.rzsj,um.name,um.title,g.xsrw2018 order by um.name desc";
            //(包含总监自己的销售额)expressions_xmzjd = "select nvl(sum(c.pchte),0) as hte,u.name,months_between(sysdate,u.rzsj) as m,(case when um.name is null then u.name else um.name end) as umname,um.title as umtitle,u.title,g.xsrw2018 as xsrw from contract c left join xmbb o on c.xmbh11=o.xmbh11 and o.is_deleted <>'1' and o.dqjd = '3-项目签约' " + dateExpression + " full join (select * from ccuser where isusing='1' and company <> '远大大数据市场管理' and company <> '安徽公司' " + companyExpression + " and role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)) u on c.ownerid = u.id full join (select * from ccuser where title = '总监' and isusing='1' and company <> '远大大数据市场管理' and company <> '安徽公司' " + companyExpression1 + " and role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)) um on u.manager = um.id left join gzxz g on um.company = g.ssgs and um.name = g.name and g.is_deleted <>'1' where u.name is not null and (um.title = '总监' or u.title = '总监') group by u.name,u.title,u.rzsj,(case when um.name is null then u.name else um.name end),um.title,g.xsrw2018 order by (case when um.name is null then u.name else um.name end) desc";
            expressions_xmzjd = "select nvl(sum(xm.pchte),0) as hte,u.name,months_between(sysdate,u.rzsj) as m,u.zjname as umname,u.zjtitle as umtitle,u.title,g.xsrw2018 as xsrw from (SELECT c.pchte,c.ownerid from contract c left join xmbb o on c.xmbh11=o.xmbh11 where o.is_deleted <>'1' and o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') " + dateExpression + ") xm full join (select uzj.name as zjname,uzj.title as zjtitle,usub.name,usub.title,uzj.company,usub.id,usub.rzsj from (select * from ccuser u where u.title='总监' and u.isusing='1' and u.is_deleted <>'1' and u.company in ('长沙公司','岳阳公司','郴州公司','上海公司','杭州公司','天津公司','南京公司','合肥公司','阜阳公司','六安公司','广州公司','深圳公司')) uzj left join tp_sys_role r on uzj.role = r.parentrole_id left join ccuser usub on r.roleid = usub.role where usub.isusing='1' and usub.is_deleted <>'1' and usub.company in ('长沙公司','岳阳公司','郴州公司','上海公司','杭州公司','天津公司','南京公司','合肥公司','阜阳公司','六安公司','广州公司','深圳公司') order by uzj.company,uzj.name)u on xm.ownerid = u.id left join gzxz g on u.company = g.ssgs and u.zjname = g.name and g.is_deleted <>'1' where u.zjname is not null " + companyExpression + " group by u.name,u.title,u.rzsj,u.zjname,u.zjtitle,g.xsrw2018 order by nvl(sum(xm.pchte),0) desc";
        } else if (role == '总监') {
            //项目组数据
            //expressions = "";
            //expressions_xmzjd = "select u.id,u.name,b.bf,sum(case when o.dqjd='1-项目立项' then 1 else 0 end) as lx,sum(nvl(case when o.dqjd='3-项目签约' then o.yjpchte else null end,0)) as cj from (select u.name,u.title,u.id from ccuser u where u.isusing='1' and u.is_deleted <>'1' and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)) u left join (select * from xmbb o  where o.is_deleted <>'1' " + dateExpression + ") o on u.id = o.ownerid left join (select o.ownerid,count(1) as bf from khbf o where o.is_deleted <> '1' and (o.bcbfsj between to_date('" + begin + "','yyyy/mm/dd') and to_date('" + end + "','yyyy/mm/dd')) group by o.ownerid) b on u.id = b.ownerid group by u.id,u.name,b.bf";
            expressions_xmzjd = "select * from (select u.id,u.name,b.bf,sum(case when o.dqjd='1-项目立项' then 1 else 0 end) as lx,sum(nvl(case when o.dqjd='3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') then o.yjpchte else null end,0)) as cj,count(1) as rowspan from (select u.name,u.title,u.id from ccuser u where u.isusing='1' and u.is_deleted <>'1' and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)) u left join (select * from xmbb o  where o.is_deleted <>'1' " + dateExpression + ") o on u.id = o.ownerid left join (select o.ownerid,count(1) as bf from khbf o where o.is_deleted <> '1' and (o.bcbfsj between to_date('" + begin + "','yyyy/mm/dd') and to_date('" + end + "','yyyy/mm/dd')) group by o.ownerid) b on u.id = b.ownerid group by u.id,u.name,b.bf) utj left join (select s.name as server,o.name as xmmc,o.ownerid from xmbb o left join fwht f on o.xmbh11 = f.xmbh11 left join ccuser s on f.ownerid = s.id  where o.is_deleted <>'1' " + dateExpression + ") xm on utj.id = xm.ownerid";
            //expressions_xmzjd = "select s.name as server,o.name as xmmc,o.ownerid from xmbb o left join fwht f on o.xmbh11 = f.xmbh11 left join ccuser s on f.ownerid = s.id  where o.is_deleted <>'1' " + dateExpression + "";
        } else if (Common.prototype.isContains(role, '客户经理')) {
            //项目组数据
            //expressions = "";
            expressions_xmzjd = "select * from (select u.id,u.name,b.bf,sum(case when o.dqjd='1-项目立项' then 1 else 0 end) as lx,sum(nvl(case when o.dqjd='3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') then o.yjpchte else null end,0)) as cj,count(1) as rowspan from (select u.name,u.title,u.id from ccuser u where u.isusing='1' and u.is_deleted <>'1' and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)) u left join (select * from xmbb o  where o.is_deleted <>'1' " + dateExpression + ") o on u.id = o.ownerid left join (select o.ownerid,count(1) as bf from khbf o where o.is_deleted <> '1' and (o.bcbfsj between to_date('" + begin + "','yyyy/mm/dd') and to_date('" + end + "','yyyy/mm/dd')) group by o.ownerid) b on u.id = b.ownerid group by u.id,u.name,b.bf) utj left join (select s.name as server,o.name as xmmc,o.ownerid from xmbb o left join fwht f on o.xmbh11 = f.xmbh11 left join ccuser s on f.ownerid = s.id  where o.is_deleted <>'1' " + dateExpression + ") xm on utj.id = xm.ownerid";
        }

        //expressions_xmzl = "select sum(case when o.xmgs = '开发商项目' then 1 else 0 end)/count(o.id) as kfs,avg(case when to_number(REGEXP_REPLACE(o.yxjbl,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(o.yxjbl,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(o.yxjbl,'[^0-9.]+','')) end) as fbj,avg(case when to_number(REGEXP_REPLACE(o.yfk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(o.yfk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(o.yfk,'[^0-9.]+','')) end) as sf,avg(case when to_number(REGEXP_REPLACE(o.jdk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(o.jdk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(o.jdk,'[^0-9.]+','')) end) as jd,avg(case when to_number(REGEXP_REPLACE(o.ysfk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(o.ysfk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(o.ysfk,'[^0-9.]+','')) end) as fd,avg(case when to_number(REGEXP_REPLACE(o.jsk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(o.jsk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(o.jsk,'[^0-9.]+','')) end) as js,sum(case when o.sfhgdk = '是' then 1 else 0 end)/count(o.id) as gdk, (case when u.title = '总监' then u.name else um.name end) as name,(case when u.title = '总监' then u.title else um.title end) as titles ";
        //expressions_xmzl += ",sum(case when a.recordtype = '2018DC93F85F79DibdML' and nvl(c.pchte,0) > 1000 and o.shsj = '参与设计' and (case when to_number(REGEXP_REPLACE(o.yxjbl,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(o.yxjbl,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(o.yxjbl,'[^0-9.]+','')) end) <= 0.1 and (case when to_number(REGEXP_REPLACE(c.yfk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(c.yfk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(c.yfk,'[^0-9.]+','')) end) >= 0.2 and (case when to_number(REGEXP_REPLACE(c.jdk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(c.jdk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(c.jdk,'[^0-9.]+','')) end) >= 0.85 and (case when to_number(REGEXP_REPLACE(c.ysfk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(c.ysfk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(c.ysfk,'[^0-9.]+','')) end) > 0.9 and (case when to_number(REGEXP_REPLACE(c.jsk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(c.jsk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(c.jsk,'[^0-9.]+','')) end) > 0.97 and c.sfhgdk = '是' then 1 else 0 end)/count(o.id) as bzxm,sum(case when o.id is null then 0 else 1 end) as xmgs "
        //expressions_xmzl += " from xmbb o left join contract c on o.xmbh11=c.xmbh11 and o.is_deleted <>'1' and o.dqjd = '3-项目签约' " + dateExpression + " left join Account a on o.khmc = a.id full join ccuser u on o.ownerid=u.id left join ccuser um on u.manager = um.id and um.company <> '远大大数据市场管理' and um.company <> '安徽公司' where u.isusing='1' and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) and (um.title = '总监' or u.title = '总监')  group by (case when u.title = '总监' then u.name else um.name end),(case when u.title = '总监' then u.title else um.title end) order by (case when u.title = '总监' then u.name else um.name end) desc";
        //expressions_xmzl += " from (select * from xmbb o left join contract c on o.xmbh11=c.xmbh11 left join Account a on o.khmc = a.id where o.is_deleted <>'1' and o.dqjd = '3-项目签约' " + dateExpression + ") o full join ccuser u on o.ownerid=u.id left join ccuser um on u.manager = um.id where u.isusing='1' and um.company <> '远大大数据市场管理' and um.company <> '安徽公司' and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) and (um.title = '总监' or u.title = '总监')  group by (case when u.title = '总监' then u.name else um.name end),(case when u.title = '总监' then u.title else um.title end) order by (case when u.title = '总监' then u.name else um.name end) desc";
        //expressions_xmzl += " from xmbb o left join contract c on o.xmbh11=c.xmbh11 left join Account a on o.khmc = a.id left join ccuser u on o.ownerid=u.id left join ccuser um on u.manager = um.id where u.isusing='1' and o.is_deleted <>'1' and o.dqjd = '3-项目签约' " + dateExpression + " and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) and (um.title = '总监' or u.title = '总监')  group by (case when u.title = '总监' then u.name else um.name end),(case when u.title = '总监' then u.title else um.title end) order by (case when u.title = '总监' then u.name else um.name end) desc";

        // expressions_xmzl = "select g.team,g.ssgs,umm.name,data.* from ccuser umm left join (";
        // expressions_xmzl += "select avg((select avg(df) from khmyd where bpjr = f.ownerid)) as myd,sum((select count(1) from xtwtfk where fwgcs = f.ownerid AND is_deleted <> '1')) as ts,sum(case when (select count(*) from contract where (khmc=a.id or kfs=a.id) and dqjd='3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and is_deleted<>'1') > 1 then 1 else 0 end) as customernum2,sum(case when o.shsj = '内部设计' then 1 else 0 end) as sj,sum(case when o.xmgs = '开发商项目' then 1 else 0 end)/count(o.id) as kfs,avg(case when to_number(REGEXP_REPLACE(o.yxjbl,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(o.yxjbl,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(o.yxjbl,'[^0-9.]+','')) end) as fbj,avg(case when to_number(REGEXP_REPLACE(c.yfk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(c.yfk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(c.yfk,'[^0-9.]+','')) end) as sf,avg(case when to_number(REGEXP_REPLACE(c.jdk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(c.jdk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(c.jdk,'[^0-9.]+','')) end) as jd,avg(case when to_number(REGEXP_REPLACE(c.ysfk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(c.ysfk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(c.ysfk,'[^0-9.]+','')) end) as fd,avg(case when to_number(REGEXP_REPLACE(c.jsk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(c.jsk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(c.jsk,'[^0-9.]+','')) end) as js,sum(case when c.sfhgdk = '是' then 1 else 0 end)/count(o.id) as gdk,um.id ";
        // expressions_xmzl += ",sum(case when a.recordtype = '2018DC93F85F79DibdML' and nvl(c.pchte,0) > 1000 and o.shsj = '参与设计' and (case when to_number(REGEXP_REPLACE(o.yxjbl,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(o.yxjbl,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(o.yxjbl,'[^0-9.]+','')) end) <= 0.1 and (case when to_number(REGEXP_REPLACE(c.yfk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(c.yfk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(c.yfk,'[^0-9.]+','')) end) >= 0.2 and (case when to_number(REGEXP_REPLACE(c.jdk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(c.jdk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(c.jdk,'[^0-9.]+','')) end) >= 0.85 and (case when to_number(REGEXP_REPLACE(c.ysfk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(c.ysfk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(c.ysfk,'[^0-9.]+','')) end) > 0.9 and (case when to_number(REGEXP_REPLACE(c.jsk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(c.jsk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(c.jsk,'[^0-9.]+','')) end) > 0.97 and c.sfhgdk = '是' then 1 else 0 end)/count(o.id) as bzxm ";
        // expressions_xmzl += "from xmbb o left join contract c on o.xmbh11=c.xmbh11 left join Account a on o.khmc = a.id left join ccuser u on o.ownerid=u.id left join ccuser um on  u.manager = um.id left join fwht f on o.xmbh11 = f.xmbh11 where o.is_deleted <>'1' and o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') " + projectlxExpression + " " + dateExpression + " and u.company <> '远大大数据市场管理' and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) group by um.name,um.id";
        // expressions_xmzl += ") data on umm.id = data.id left join gzxz g on umm.name = g.name and umm.company = g.ssgs where g.is_deleted <> '1' and umm.isusing='1' and umm.title = '总监' and umm.company <> '远大大数据市场管理' and umm.company <> '安徽公司' " + companyExpression2 + " and umm.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) order by g.ssgs";

        //expressions_xmzl = "select * from ccuser umm where umm.isusing='1' and umm.title = '总监' and umm.company <> '远大大数据市场管理' and umm.company <> '安徽公司' and umm.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) order by umm.name desc"

        //Todo ======================================================
        //(select uzj.name as zjname,uzj.title as zjtitle,usub.name,usub.title,uzj.company,usub.id,usub.rzsj from (select * from ccuser u where u.title='总监' and u.isusing='1' and u.is_deleted <>'1' and u.company in ('长沙公司','岳阳公司','郴州公司','上海公司','杭州公司','天津公司','南京公司','合肥公司','阜阳公司','六安公司','广州公司','深圳公司')) uzj left join tp_sys_role r on uzj.role = r.parentrole_id left join ccuser usub on r.roleid = usub.role where usub.isusing='1' and usub.is_deleted <>'1' and usub.company in ('长沙公司','岳阳公司','郴州公司','上海公司','杭州公司','天津公司','南京公司','合肥公司','阜阳公司','六安公司','广州公司','深圳公司') order by uzj.company,uzj.name)u
        expressions_xmzl = "select g.team,g.ssgs,umm.name,data.* from ccuser umm left join (";
        expressions_xmzl += "select avg((select avg(df) from khmyd where bpjr = f.ownerid)) as myd,sum((select count(1) from xtwtfk where fwgcs = f.ownerid AND is_deleted <> '1')) as ts,sum(case when (select count(*) from contract where (khmc=a.id or kfs=a.id) and dqjd='3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and is_deleted<>'1') > 1 then 1 else 0 end) as customernum2,sum(case when o.shsj = '内部设计' then 1 else 0 end) as sj,sum(case when o.xmgs = '开发商项目' then 1 else 0 end)/count(o.id) as kfs,avg(case when to_number(REGEXP_REPLACE(o.yxjbl,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(o.yxjbl,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(o.yxjbl,'[^0-9.]+','')) end) as fbj,avg(case when to_number(REGEXP_REPLACE(c.yfk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(c.yfk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(c.yfk,'[^0-9.]+','')) end) as sf,avg(case when to_number(REGEXP_REPLACE(c.jdk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(c.jdk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(c.jdk,'[^0-9.]+','')) end) as jd,avg(case when to_number(REGEXP_REPLACE(c.ysfk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(c.ysfk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(c.ysfk,'[^0-9.]+','')) end) as fd,avg(case when to_number(REGEXP_REPLACE(c.jsk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(c.jsk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(c.jsk,'[^0-9.]+','')) end) as js,sum(case when c.sfhgdk = '是' then 1 else 0 end)/count(o.id) as gdk,u.zjid as id ";
        expressions_xmzl += ",sum(case when a.recordtype = '2018DC93F85F79DibdML' and nvl(c.pchte,0) > 1000 and o.shsj = '参与设计' and (case when to_number(REGEXP_REPLACE(o.yxjbl,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(o.yxjbl,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(o.yxjbl,'[^0-9.]+','')) end) <= 0.1 and (case when to_number(REGEXP_REPLACE(c.yfk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(c.yfk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(c.yfk,'[^0-9.]+','')) end) >= 0.2 and (case when to_number(REGEXP_REPLACE(c.jdk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(c.jdk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(c.jdk,'[^0-9.]+','')) end) >= 0.85 and (case when to_number(REGEXP_REPLACE(c.ysfk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(c.ysfk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(c.ysfk,'[^0-9.]+','')) end) > 0.9 and (case when to_number(REGEXP_REPLACE(c.jsk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(c.jsk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(c.jsk,'[^0-9.]+','')) end) > 0.97 and c.sfhgdk = '是' then 1 else 0 end)/count(o.id) as bzxm ";
        expressions_xmzl += "from xmbb o left join contract c on o.xmbh11=c.xmbh11 left join Account a on o.khmc = a.id left join (select uzj.name as zjname,uzj.title as zjtitle,uzj.id as zjid,usub.name,usub.title,uzj.company,usub.id,usub.role from (select * from ccuser u where (u.title = '总监' or u.title = '副总') and u.isusing='1' and u.is_deleted <>'1' and u.company in ('长沙公司','岳阳公司','郴州公司','上海公司','杭州公司','天津公司','南京公司','合肥公司','阜阳公司','六安公司','广州公司','深圳公司')) uzj left join tp_sys_role r on uzj.role = r.parentrole_id left join ccuser usub on r.roleid = usub.role where usub.isusing='1' and usub.is_deleted <>'1' and usub.company in ('长沙公司','岳阳公司','郴州公司','上海公司','杭州公司','天津公司','南京公司','合肥公司','阜阳公司','六安公司','广州公司','深圳公司') order by uzj.company,uzj.name)u on o.ownerid=u.id left join fwht f on o.xmbh11 = f.xmbh11 where o.is_deleted <>'1' and o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') " + projectlxExpression + " " + dateExpression + " and u.company <> '远大大数据市场管理' and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) group by u.zjname,u.zjid";
        expressions_xmzl += ") data on umm.id = data.id left join gzxz g on umm.name = g.name and umm.company = g.ssgs where g.is_deleted <> '1' and umm.isusing='1' and (umm.title = '总监' OR umm.title = '副总') and umm.company <> '远大大数据市场管理' and umm.company <> '安徽公司' " + companyExpression2 + " and umm.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) order by g.ssgs";

        // expressions_xmzl = "select g.team,g.ssgs,umm.name,data.* from ccuser umm left join (";
        // expressions_xmzl += "select avg((select avg(df) from khmyd where bpjr = f.ownerid)) as myd,sum((select count(1) from xtwtfk where fwgcs = f.ownerid)) as ts,sum(case when (select count(*) from contract where (khmc=a.id or kfs=a.id) and dqjd='3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and is_deleted<>'1') > 1 then 1 else 0 end) as customernum2,sum(case when o.shsj = '内部设计' then 1 else 0 end) as sj,sum(case when o.xmgs = '开发商项目' then 1 else 0 end)/count(o.id) as kfs,avg(case when to_number(REGEXP_REPLACE(o.yxjbl,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(o.yxjbl,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(o.yxjbl,'[^0-9.]+','')) end) as fbj,avg(case when to_number(REGEXP_REPLACE(c.yfk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(c.yfk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(c.yfk,'[^0-9.]+','')) end) as sf,avg(case when to_number(REGEXP_REPLACE(c.jdk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(c.jdk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(c.jdk,'[^0-9.]+','')) end) as jd,avg(case when to_number(REGEXP_REPLACE(c.ysfk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(c.ysfk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(c.ysfk,'[^0-9.]+','')) end) as fd,avg(case when to_number(REGEXP_REPLACE(c.jsk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(c.jsk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(c.jsk,'[^0-9.]+','')) end) as js,sum(case when c.sfhgdk = '是' then 1 else 0 end)/count(o.id) as gdk,u.zjid as id ";
        // expressions_xmzl += ",sum(case when a.recordtype = '2018DC93F85F79DibdML' and nvl(c.pchte,0) > 1000 and o.shsj = '参与设计' and (case when to_number(REGEXP_REPLACE(o.yxjbl,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(o.yxjbl,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(o.yxjbl,'[^0-9.]+','')) end) <= 0.1 and (case when to_number(REGEXP_REPLACE(c.yfk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(c.yfk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(c.yfk,'[^0-9.]+','')) end) >= 0.2 and (case when to_number(REGEXP_REPLACE(c.jdk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(c.jdk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(c.jdk,'[^0-9.]+','')) end) >= 0.85 and (case when to_number(REGEXP_REPLACE(c.ysfk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(c.ysfk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(c.ysfk,'[^0-9.]+','')) end) > 0.9 and (case when to_number(REGEXP_REPLACE(c.jsk,'[^0-9.]+','')) > 1 then to_number(REGEXP_REPLACE(c.jsk,'[^0-9.]+',''))/100 else to_number(REGEXP_REPLACE(c.jsk,'[^0-9.]+','')) end) > 0.97 and c.sfhgdk = '是' then 1 else 0 end)/count(o.id) as bzxm ";
        // expressions_xmzl += "from xmbb o left join contract c on o.xmbh11=c.xmbh11 left join Account a on o.khmc = a.id left join (select uzj.name as zjname,uzj.title as zjtitle,uzj.id as zjid,usub.name,usub.title,uzj.company,usub.id,usub.role from (select * from ccuser u where (u.title='总监') and u.isusing='1' and u.is_deleted <>'1' and u.company in ('长沙公司','岳阳公司','郴州公司','上海公司','杭州公司','天津公司','南京公司','合肥公司','阜阳公司','六安公司','广州公司','深圳公司')) uzj left join tp_sys_role r on uzj.role = r.parentrole_id left join ccuser usub on r.roleid = usub.role where usub.isusing='1' and usub.is_deleted <>'1' and usub.company in ('长沙公司','岳阳公司','郴州公司','上海公司','杭州公司','天津公司','南京公司','合肥公司','阜阳公司','六安公司','广州公司','深圳公司') order by uzj.company,uzj.name)u on o.ownerid=u.id left join fwht f on o.xmbh11 = f.xmbh11 where o.is_deleted <>'1' and o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') " + projectlxExpression + " " + dateExpression + " and u.company <> '远大大数据市场管理' and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) group by u.zjname,u.zjid";
        // expressions_xmzl += ") data on umm.id = data.id left join gzxz g on umm.name = g.name and umm.company = g.ssgs where g.is_deleted <> '1' and umm.isusing='1' and (umm.title = '总监') and umm.company <> '远大大数据市场管理' and umm.company <> '安徽公司' " + companyExpression2 + " and umm.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) order by g.ssgs";

        expressions_xsph = "select u.company,um.name as zjname,u.name,nvl(sum(nvl(c.pchte,0)),0) as xse from contract c left join xmbb o on c.xmbh11=o.xmbh11 left join ccuser u on c.ownerid=u.id left join ccuser um on  u.manager = um.id where c.is_deleted <>'1' and c.dqjd='3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and u.isusing='1' and (u.title like '%客户经理' ) " + dateExpression + " and u.company in ('长沙公司','岳阳公司','郴州公司','上海公司','杭州公司','天津公司','南京公司','合肥公司','阜阳公司','六安公司','广州公司','深圳公司') group by u.company,um.name,u.name order by nvl(sum(nvl(c.pchte,0)),0) desc";//or u.title = '总监'

        //expressions_xsph_zj = "select u.company,u.name as zjname,nvl(sum(nvl(c.pchte,0)),0) as xse from contract c left join xmbb o on c.xmbh11=o.xmbh11 left join ccuser u on c.ownerid=u.id left join tp_sys_role r on u.role = r.parentrole_id left join ccuser um on r.roleid = um.role where c.is_deleted <>'1' and c.dqjd='3-项目签约' and u.isusing='1' and u.is_deleted <>'1' and u.title = '总监' and um.isusing='1' and um.is_deleted <>'1' " + dateExpression + " and u.company in ('长沙公司','岳阳公司','郴州公司','上海公司','杭州公司','天津公司','南京公司','合肥公司','阜阳公司','六安公司','广州公司','深圳公司') group by u.company,u.name order by nvl(sum(nvl(c.pchte,0)),0) desc";

        //expressions_xsph_zj = "select u.company,u.name as zjname,nvl(sum(nvl(o.pchte,0)),0) as xse from (select c.pchte,c.ownerid from contract c left join xmbb o on c.xmbh11=o.xmbh11 where c.is_deleted <>'1' and c.dqjd='3-项目签约' " + dateExpression + ") o full join ccuser u on o.ownerid=u.id left join tp_sys_role r on u.role = r.parentrole_id left join ccuser um on r.roleid = um.role where u.isusing='1' and u.is_deleted <>'1' and u.title = '总监' and um.isusing='1' and um.is_deleted <>'1' and u.company in ('长沙公司','岳阳公司','郴州公司','上海公司','杭州公司','天津公司','南京公司','合肥公司','阜阳公司','六安公司','广州公司','深圳公司') group by u.company,u.name order by nvl(sum(nvl(o.pchte,0)),0) desc";

        //expressions_xsph_zj = "select u.company,u.name as zjname,sum(o.pchte) as xse from (select c.pchte,c.ownerid from contract c left join xmbb o on c.xmbh11=o.xmbh11 where c.is_deleted <>'1' and c.dqjd='3-项目签约' " + dateExpression + ") o full join ccuser u on o.ownerid=u.id and where u.isusing='1' and u.is_deleted <>'1' and u.company in ('长沙公司','岳阳公司','郴州公司','上海公司','杭州公司','天津公司','南京公司','合肥公司','阜阳公司','六安公司','广州公司','深圳公司') group by u.company,u.name order by u.company,u.name";

        //expressions_xsph_zj = "select * from (select c.ownerid,c.pchte from contract c left join xmbb o on c.xmbh11=o.xmbh11  where c.is_deleted <>'1' and c.dqjd='3-项目签约' " + dateExpression + ") left join ccuser u on xm.ownerid=u.id (select * from ccuser where u.title='总监' and u.isusing='1' and u.company in ('长沙公司','岳阳公司','郴州公司','上海公司','杭州公司','天津公司','南京公司','合肥公司','阜阳公司','六安公司','广州公司','深圳公司')) uzj left join tp_sys_role";
        expressions_xsph_zj = "select u.company,u.zjname,nvl(sum(nvl(o.pchte,0)),0) as xse from (select uzj.name as zjname,usub.name,usub.title,uzj.company,usub.id from (select * from ccuser u where u.title='总监' and u.isusing='1' and u.is_deleted <>'1' and u.company in ('长沙公司','岳阳公司','郴州公司','上海公司','杭州公司','天津公司','南京公司','合肥公司','阜阳公司','六安公司','广州公司','深圳公司')) uzj left join tp_sys_role r on uzj.role = r.parentrole_id left join ccuser usub on r.roleid = usub.role where usub.isusing='1' and usub.is_deleted <>'1' and usub.company in ('长沙公司','岳阳公司','郴州公司','上海公司','杭州公司','天津公司','南京公司','合肥公司','阜阳公司','六安公司','广州公司','深圳公司') order by uzj.company,uzj.name) u right join (select c.pchte,c.ownerid from contract c left join xmbb o on c.xmbh11=o.xmbh11 where c.is_deleted <>'1' and c.dqjd='3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') " + dateExpression + ") o on o.ownerid = u.id where u.zjname is not null group by u.zjname,u.company order by nvl(sum(nvl(o.pchte,0)),0) desc";

        //expressions_xsph_zj = "select u.company,u.zjname,o.pchte as xse,o.name from (select uzj.name as zjname,usub.name,usub.title,uzj.company,usub.id from (select * from ccuser u where u.title='总监' and u.isusing='1' and u.is_deleted <>'1' and u.company in ('长沙公司','岳阳公司','郴州公司','上海公司','杭州公司','天津公司','南京公司','合肥公司','阜阳公司','六安公司','广州公司','深圳公司')) uzj left join tp_sys_role r on uzj.role = r.parentrole_id left join ccuser usub on r.roleid = usub.role where usub.isusing='1' and usub.is_deleted <>'1' and usub.company in ('长沙公司','岳阳公司','郴州公司','上海公司','杭州公司','天津公司','南京公司','合肥公司','阜阳公司','六安公司','广州公司','深圳公司') order by uzj.company,uzj.name) u right join (select c.pchte,c.ownerid,c.name from contract c left join xmbb o on c.xmbh11=o.xmbh11 where c.is_deleted <>'1' and c.dqjd='3-项目签约' " + dateExpression + ") o on o.ownerid = u.id where u.zjname = '张洪刚'";
        expressions_xsph_gs = "select sum(o.yjpchte) as xse,u.company from xmbb o left join ccuser u on o.ownerid=u.id where o.is_deleted <>'1' and o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') " + dateExpression + " and u.company in ('长沙公司','岳阳公司','郴州公司','上海公司','杭州公司','天津公司','南京公司','合肥公司','阜阳公司','六安公司','广州公司','深圳公司') group by u.company order by sum(o.yjpchte) desc";

        expressions = "select nvl(sum(nvl(o.yjpchte,0)),0) as value,'hte' as name from xmbb o,ccuser u where o.ownerid=u.id and o.is_deleted <>'1' and o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') " + projectlxExpression + " " + quarterExpression + " and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";
        expressions += " union select nvl(sum(nvl(o.pcmj,0)),0) as value,'pcl' as name from xmbb o,ccuser u where o.ownerid=u.id and o.is_deleted <>'1' and o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') " + projectlxExpression + " " + dateExpression + " and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";
        expressions += " union select nvl(avg(nvl(o.yjpchte,0)),0) as value,'xmgm' as name from xmbb o,ccuser u where o.ownerid=u.id and o.is_deleted <>'1' and o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') " + projectlxExpression + " " + dateExpression + " and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";
        //expressions += " union select sum(case when o.xmgs = '开发商项目' then 1 else 0 end)/count(1) as value,'kfsxm' as name from xmbb o,ccuser u where o.ownerid=u.id and o.is_deleted <>'1' and o.dqjd = '3-项目签约' " + dateExpression + " and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";
        // expressions += " union select count(1) as value,'xs' as name from xmbb o,ccuser u where o.ownerid=u.id and o.is_deleted <>'1' and o.dqjd = '0-项目线索' and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";
        // expressions += " union select nvl(sum(nvl(o.yjpchte,0)),0) as value,'xs_pce' as name from xmbb o,ccuser u where o.ownerid=u.id and o.is_deleted <>'1' and o.dqjd = '0-项目线索' and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";
        // expressions += " union select count(1) as value,'lx' as name from xmbb o,ccuser u where o.ownerid=u.id and o.is_deleted <>'1' and o.dqjd = '1-项目立项' and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";
        // expressions += " union select nvl(sum(nvl(o.yjpchte,0)),0) as value,'lx_pce' as name from xmbb o,ccuser u where o.ownerid=u.id and o.is_deleted <>'1' and o.dqjd = '1-项目立项' and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";
        // expressions += " union select count(1) as value,'tj' as name from xmbb o,ccuser u where o.ownerid=u.id and o.is_deleted <>'1' and o.dqjd = '2-项目推进' and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";
        // expressions += " union select nvl(sum(nvl(o.yjpchte,0)),0) as value,'tj_pce' as name from xmbb o,ccuser u where o.ownerid=u.id and o.is_deleted <>'1' and o.dqjd = '2-项目推进' and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";
        expressions += " union select count(1) as value,'cb' as name from xmbb o,ccuser u where o.ownerid=u.id and o.is_deleted <>'1' " + projectlxExpression + " and (o.bjxtj is null or o.bjxtj = 'false') and o.dqjd in ('0-项目线索','1-项目立项','2-项目推进') and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";
        expressions += " union select nvl(sum(nvl(o.yjpchte,0)),0) as value,'cb_pce' as name from xmbb o,ccuser u where o.ownerid=u.id and o.is_deleted <>'1' " + projectlxExpression + " and (o.bjxtj is null or o.bjxtj = 'false') and o.dqjd in ('0-项目线索','1-项目立项','2-项目推进') and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";
        expressions += " union select count(1) as value,'yj' as name from xmbb o,ccuser u where o.ownerid=u.id and o.is_deleted <>'1' " + projectlxExpression + " and (o.bjxtj is null or o.bjxtj = 'false') and o.dqjd in ('0-项目线索','1-项目立项','2-项目推进') and o.sfycjxm = '是' and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";
        expressions += " union select nvl(sum(nvl(o.yjpchte,0)),0) as value,'yj_pce' as name from xmbb o,ccuser u where o.ownerid=u.id and o.is_deleted <>'1' " + projectlxExpression + " and (o.bjxtj is null or o.bjxtj = 'false') and o.dqjd in ('0-项目线索','1-项目立项','2-项目推进') and o.sfycjxm = '是' and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";
        expressions += " union select count(1) as value,'jq' as name from xmbb o,ccuser u where o.ownerid=u.id and o.is_deleted <>'1' " + projectlxExpression + " and (o.bjxtj is null or o.bjxtj = 'false') and o.dqjd in ('0-项目线索','1-项目立项','2-项目推进') and o.sfycjxm = '是' and o.ycjyf is not null and length(o.ycjyf) >= 7 and SUBSTR(o.ycjyf,0,4)='" + nowYear + "' and to_number(SUBSTR(o.ycjyf,6,2)) >= " + quarterBeginyf + " and to_number(SUBSTR(o.ycjyf,6,2)) <= " + quarterEndyf + "  and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";
        expressions += " union select nvl(sum(nvl(o.yjpchte,0)),0) as value,'jq_pce' as name from xmbb o,ccuser u where o.ownerid=u.id and o.is_deleted <>'1' " + projectlxExpression + " and (o.bjxtj is null or o.bjxtj = 'false') and o.dqjd in ('0-项目线索','1-项目立项','2-项目推进') and o.sfycjxm = '是' and o.ycjyf is not null and length(o.ycjyf) >= 7 and SUBSTR(o.ycjyf,0,4)='" + nowYear + "' and to_number(SUBSTR(o.ycjyf,6,2)) >= " + quarterBeginyf + " and to_number(SUBSTR(o.ycjyf,6,2)) <= " + quarterEndyf + " and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";
        expressions += " union select count(1) as value,'zb' as name from contract c left join ccuser u on c.ownerid=u.id left join xmbb o on c.xmbh11=o.xmbh11 where o.is_deleted <>'1' and c.is_deleted <> '1' " + projectlxExpression + " and o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and (c.htsh is null or c.htsh <> '已审核') " + dateExpression + " and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";
        expressions += " union select nvl(sum(nvl(c.pchte,0)),0) as value,'zb_pce' as name from contract c left join ccuser u on c.ownerid=u.id left join xmbb o on c.xmbh11=o.xmbh11 where o.is_deleted <>'1' and c.is_deleted <> '1' " + projectlxExpression + " and o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and (c.htsh is null or c.htsh <> '已审核') " + dateExpression + " and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";
        expressions += " union select count(1) as value,'qy' as name from contract c left join ccuser u on c.ownerid=u.id left join xmbb o on c.xmbh11=o.xmbh11 where o.is_deleted <>'1' and o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and c.htsh = '已审核' " + projectlxExpression + " " + dateExpression + " and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";
        expressions += " union select nvl(sum(nvl(c.pchte,0)),0) as value,'qy_pce' as name from contract c left join ccuser u on c.ownerid=u.id left join xmbb o on c.xmbh11=o.xmbh11 where o.is_deleted <>'1' and o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and c.htsh = '已审核' " + projectlxExpression + " " + dateExpression + " and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";
        expressions += " union select (case when nvl(sum(nvl(o.pcmj,0)),0) = 0 then -1 else nvl(sum(nvl(o.yjpchte,0)),0)/nvl(sum(nvl(o.pcmj,0)),0) end) as value,'pcjj' as name from xmbb o,ccuser u where o.ownerid=u.id and o.is_deleted <>'1' and o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') " + projectlxExpression + " " + dateExpression + " and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";

        //expressions = "select o.ycjyf as value,SUBSTR(o.ycjyf,0,4) as year,SUBSTR(o.ycjyf,6,2) as mouth,'jq' as name from xmbb o,ccuser u where o.ownerid=u.id and o.is_deleted <>'1' " + projectlxExpression + " and o.dqjd in ('0-项目线索','1-项目立项','2-项目推进') and o.sfycjxm = '是' and o.ycjyf is not null and length(o.ycjyf) >= 7 and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";

        params = "serviceName=cqlQuery&objectApiName=xmbb&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding;
        var index = layer.load(1, {
            shade: false
        });
        $.ajax({
            type: "post",
            dataType: "json",
            url: url,
            data: params,
            success: function (data) {
                if (data != "") {
                    if (data.result) {
                        if (data.data.length > 0) {
                            var hte = "";
                            var pcl = "";
                            for (var i = 0; i < data.data.length; i++) {
                                var v = data.data[i];
                                var value = v.value;
                                switch (v.name) {
                                    case "hte":
                                        {
                                            $("#hte").html("<a href='/crm/project/project.html?filter=true&begin=" + encodeURIComponent(quarterBegin) + "&end=" + encodeURIComponent(quarterEnd) + "&companyName=" + encodeURIComponent(companyName) + "&projectlx=" + encodeURIComponent(projectlx) + "&filtertype=je'>" + Common.prototype.NumFormat(value.toFixed(0)) + "万</a>");
                                            hte = value;
                                            break;
                                        }
                                    case "pcl":
                                        {
                                            $("#pcl").html(Common.prototype.NumFormat(value.toFixed(2)) + "万m³");
                                            pcl = value;
                                            break;
                                        }
                                    case "xmgm":
                                        {
                                            $("#xmgm").html(Common.prototype.NumFormat(value.toFixed(0)) + "万 ");
                                            break;
                                        }
                                    case "kfsxm":
                                        {
                                            $("#kfs").html((value * 100).toFixed(2) + "%");
                                            break;
                                        }
                                    case "xs":
                                        {
                                            $("#xs").html(value);
                                            break;
                                        }
                                    case "xs_pce":
                                        {
                                            $("#xs_pce").html("<a href='/crm/project/project.html?filter=true&begin=" + encodeURIComponent(begin) + "&end=" + encodeURIComponent(end) + "&companyName=" + encodeURIComponent(companyName) + "&projectlx=" + encodeURIComponent(projectlx) + "&filtertype=dr'>" + Common.prototype.NumFormat(value.toFixed(0)) + "万</a>");
                                            break;
                                        }
                                    case "lx":
                                        {
                                            $("#lx").html(value);
                                            break;
                                        }
                                    case "lx_pce":
                                        {
                                            $("#lx_pce").html("<a href='/crm/project/project.html?filter=true&begin=" + encodeURIComponent(begin) + "&end=" + encodeURIComponent(end) + "&companyName=" + encodeURIComponent(companyName) + "&projectlx=" + encodeURIComponent(projectlx) + "&filtertype=lx'>" + Common.prototype.NumFormat(value.toFixed(0)) + "万</a>");
                                            break;
                                        }
                                    case "tj":
                                        {
                                            $("#tj").html(value);
                                            break;
                                        }
                                    case "tj_pce":
                                        {
                                            $("#tj_pce").html("<a href='/crm/project/project.html?filter=true&begin=" + encodeURIComponent(begin) + "&end=" + encodeURIComponent(end) + "&companyName=" + encodeURIComponent(companyName) + "&projectlx=" + encodeURIComponent(projectlx) + "&filtertype=tj'>" + Common.prototype.NumFormat(value.toFixed(0)) + "万</a>");
                                            break;
                                        }
                                    case "cb":
                                        {
                                            $("#cb").html(value);
                                            break;
                                        }
                                    case "cb_pce":
                                        {
                                            $("#cb_pce").html("<a href='/crm/project/project.html?filter=true&begin=" + encodeURIComponent(begin) + "&end=" + encodeURIComponent(end) + "&companyName=" + encodeURIComponent(companyName) + "&projectlx=" + encodeURIComponent(projectlx) + "&filtertype=cb'>" + Common.prototype.NumFormat(value.toFixed(0)) + "万</a>");
                                            break;
                                        }
                                    case "yj":
                                        {
                                            $("#yj").html(value);
                                            break;
                                        }
                                    case "yj_pce":
                                        {
                                            $("#yj_pce").html("<a href='/crm/project/project.html?filter=true&begin=" + encodeURIComponent(begin) + "&end=" + encodeURIComponent(end) + "&companyName=" + encodeURIComponent(companyName) + "&projectlx=" + encodeURIComponent(projectlx) + "&filtertype=yj'>" + Common.prototype.NumFormat(value.toFixed(0)) + "万</a>");
                                            break;
                                        }
                                    case "jq":
                                        {
                                            $("#jq").html(value);
                                            break;
                                        }
                                    case "jq_pce":
                                        {
                                            $("#jq_pce").html("<a href='/crm/project/project.html?filter=true&begin=" + encodeURIComponent(begin) + "&end=" + encodeURIComponent(end) + "&companyName=" + encodeURIComponent(companyName) + "&projectlx=" + encodeURIComponent(projectlx) + "&filtertype=jq'>" + Common.prototype.NumFormat(value.toFixed(0)) + "万</a>");
                                            break;
                                        }
                                    case "zb":
                                        {
                                            $("#zb").html(value);
                                            break;
                                        }
                                    case "zb_pce":
                                        {
                                            $("#zb_pce").html("<a href='/crm/project/project.html?filter=true&begin=" + encodeURIComponent(begin) + "&end=" + encodeURIComponent(end) + "&companyName=" + encodeURIComponent(companyName) + "&projectlx=" + encodeURIComponent(projectlx) + "&filtertype=zb'>" + Common.prototype.NumFormat(value.toFixed(0)) + "万</a>");
                                            break;
                                        }
                                    case "qy":
                                        {
                                            $("#qy").html(value);
                                            break;
                                        }
                                    case "qy_pce":
                                        {
                                            $("#qy_pce").html("<a href='/crm/project/project.html?filter=true&begin=" + encodeURIComponent(begin) + "&end=" + encodeURIComponent(end) + "&companyName=" + encodeURIComponent(companyName) + "&projectlx=" + encodeURIComponent(projectlx) + "&filtertype=qyysh'>" + Common.prototype.NumFormat(value.toFixed(0)) + "万</a>");
                                            break;
                                        }
                                    case "pcjj":
                                        {
                                            $("#pcjj").html((varIsNull(value) || value == -1 ? "" : (Common.prototype.NumFormat(value.toFixed(0)))) + "元/m³");
                                        }
                                }
                            }

                            //$("#myd").html("");

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
        // if ($(".order").hasClass('reversal')) {
        //     dataBoard.loadxmzjd(begin, end, company, "asc");
        // } else {
        //     dataBoard.loadxmzjd(begin, end, company, "desc");
        // }


        params_xmzl = "serviceName=cqlQuery&objectApiName=ccuser&expressions=" + encodeURIComponent(expressions_xmzl) + "&binding=" + binding;

        var index2 = layer.load(1, {
            shade: false
        });
        $.ajax({
            type: "post",
            dataType: "json",
            url: url,
            data: params_xmzl,
            success: function (data) {
                if (data != "") {
                    if (data.result) {
                        if (data.data.length > 0) {
                            var html = "";
                            var html1 = "";
                            for (var i = 0; i < data.data.length; i++) {
                                var v = data.data[i];
                                html += "<tr>";
                                html += "<td>" + v.ssgs + "</td>";
                                html += "<td>" + v.team + "</td>";
                                html += "</tr>";

                                html1 += "<tr>";
                                html1 += "<td>" + ((varIsNull(v.kfs) || v.kfs == 0) ? (v.kfs * 100).toFixed(0) : ((v.kfs * 100).toFixed(0) + "%")) + "</td>";
                                html1 += "<td>" + (varIsNull(v.customernum2) ? 0 : v.customernum2) + "</td>";
                                html1 += "<td>" + (varIsNull(v.sj) ? 0 : v.sj) + "</td>";
                                html1 += "<td>" + ((varIsNull(v.fbj) || v.fbj == 0) ? (v.fbj * 100).toFixed(0) : ((v.fbj * 100).toFixed(0) + "%")) + "</td>";

                                html1 += "<td>" + ((varIsNull(v.sf) || v.sf == 0) ? (v.sf * 100).toFixed(0) : ((v.sf * 100).toFixed(0) + "%")) + "</td>";
                                html1 += "<td>" + ((varIsNull(v.jd) || v.jd == 0) ? (v.jd * 100).toFixed(0) : ((v.jd * 100).toFixed(0) + "%")) + "</td>";
                                html1 += "<td>" + ((varIsNull(v.fd) || v.fd == 0) ? (v.fd * 100).toFixed(0) : ((v.fd * 100).toFixed(0) + "%")) + "</td>";
                                html1 += "<td>" + ((varIsNull(v.js) || v.js == 0) ? (v.js * 100).toFixed(0) : ((v.js * 100).toFixed(0) + "%")) + "</td>";
                                html1 += "<td>" + ((varIsNull(v.gdk) || v.gdk == 0) ? (v.gdk * 100).toFixed(0) : ((v.gdk * 100).toFixed(0) + "%")) + "</td>";
                                //html1 += "<td>" + ((varIsNull(v.bzxm) || v.bzxm == 0) ? (v.bzxm * 100).toFixed(0) : ((v.bzxm * 100).toFixed(0) + "%")) + "</td>"; //标准项目
                                html1 += "<td>" + (varIsNull(v.ts) ? 0 : v.ts) + "</td>";
                                html1 += "<td>" + (varIsNull(v.myd) ? 0 : v.myd.toFixed(2)) + "</td>";
                                html1 += "</tr>";
                            }
                            $(".table_xmz_content").html(html);
                            $(".table_zl_content").html(html1);
                            //$(".role_fz_content").html(html);
                        } else {
                            // layer.msg("没有更多数据了！");
                        }
                        layer.close(index2);
                        return;
                    } else {
                        layer.msg(data.returnInfo);
                    }
                }
                layer.close(index2);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //debugger;
                layer.close(index2);
            }
        });

        //销售排行
        params_xsph = "serviceName=cqlQuery&objectApiName=ccuser&expressions=" + encodeURIComponent(expressions_xsph) + "&binding=" + binding;

        var index_xsph = layer.load(1, {
            shade: false
        });
        $.ajax({
            type: "post",
            dataType: "json",
            url: url,
            data: params_xsph,
            success: function (data) {
                if (data != "") {
                    if (data.result) {
                        if (data.data.length > 0) {
                            var html = "";
                            var c = "";
                            if(userCompany != "远大大数据市场管理"){
                                $('.table_khjl').find('.th_gray').eq(4).remove();
                            }
                            for (var i = 0; i < data.data.length; i++) {
                                if (i > 9) {
                                    c = "none khjltenafter";
                                }
                                html += "<tr class='" + c + "'><td>" + (i + 1) + "</td>";
                                html += "<td>" + data.data[i].company + "</td>";
                                html += "<td>" + data.data[i].zjname + "</td>";
                                html += "<td>" + data.data[i].name + "</td>";
                                if(userCompany == "远大大数据市场管理"){
                                    html += "<td>" + Common.prototype.NumFormat(data.data[i].xse) + "</td>";
                                }
                                html += "</tr>";
                            }
                            $(".content_khjl").html(html);
                            if (companyName == "测试公司") {
                                $(".content_khjl").html("");
                            }
                        } else {
                            // layer.msg("没有更多数据了！");
                        }
                        layer.close(index_xsph);
                        return;
                    } else {
                        layer.msg(data.returnInfo);
                    }
                }
                layer.close(index_xsph);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //debugger;
                layer.close(index_xsph);
            }
        });

        //项目组销售排行
        params_xsph_zj = "serviceName=cqlQuery&objectApiName=ccuser&expressions=" + encodeURIComponent(expressions_xsph_zj) + "&binding=" + binding;

        var index_xsph = layer.load(1, {
            shade: false
        });
        $.ajax({
            type: "post",
            dataType: "json",
            url: url,
            data: params_xsph_zj,
            success: function (data) {
                if (data != "") {
                    if (data.result) {
                        if (data.data.length > 0) {
                            var html = "";
                            var c = "";
                            if(userCompany != "远大大数据市场管理"){
                                $('.table_xmz').find('.th_gray').eq(3).remove();
                            }
                            for (var i = 0; i < data.data.length; i++) {
                                if (i > 9) {
                                    c = "none khbtenafter";
                                }
                                html += "<tr class='" + c + "'><td>" + (i + 1) + "</td>";
                                html += "<td>" + data.data[i].company + "</td>";
                                html += "<td>" + data.data[i].zjname + "</td>";
                                if(userCompany == "远大大数据市场管理"){
                                    html += "<td>" + Common.prototype.NumFormat(data.data[i].xse) + "</td>";
                                }
                                html += "</tr>";
                            }
                            $(".content_xmzph").html(html);
                            if (companyName == "测试公司") { //测试账号，不显示排行榜
                                $(".content_xmzph").html("");
                            }
                        } else {
                            // layer.msg("没有更多数据了！");
                        }
                        layer.close(index_xsph);
                        return;
                    } else {
                        layer.msg(data.returnInfo);
                    }
                }
                layer.close(index_xsph);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //debugger;
                layer.close(index_xsph);
            }
        });

        //公司排行
        var params_xsph_gs = "serviceName=cqlQuery&objectApiName=ccuser&expressions=" + encodeURIComponent(expressions_xsph_gs) + "&binding=" + binding;

        var index_xsph = layer.load(1, {
            shade: false
        });
        $.ajax({
            type: "post",
            dataType: "json",
            url: url,
            data: params_xsph_gs,
            success: function (data) {
                if (data != "") {
                    if (data.result) {
                        if (data.data.length > 0) {
                            var html = "";
                            if(userCompany != "远大大数据市场管理"){
                                $('.table_gs').find('.th_gray').eq(2).remove();
                            }
                            for (var i = 0; i < data.data.length; i++) {
                                html += "<tr><td>" + (i + 1) + "</td>";
                                html += "<td>" + data.data[i].company + "</td>";
                                if(userCompany == "远大大数据市场管理"){
                                    html += "<td>" + Common.prototype.NumFormat(data.data[i].xse) + "</td>";
                                }
                                html += "</tr>";
                            }
                            $(".content_gsph").html(html);
                            if (companyName == "测试公司") {
                                $(".content_gsph").html("");
                            }
                        } else {
                            // layer.msg("没有更多数据了！");
                        }
                        layer.close(index_xsph);
                        return;
                    } else {
                        layer.msg(data.returnInfo);
                    }
                }
                layer.close(index_xsph);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //debugger;
                layer.close(index_xsph);
            }
        });
    },
    loadXsld: function (begin, end, company, project) {
        //加载销售漏斗
        var binding = Cookies.prototype.GetCookie('binding');
        var userId = Cookies.prototype.GetCookie('userId');
        var roleId = Cookies.prototype.GetCookie('roleId');
        var role = Cookies.prototype.GetCookie('role');
        var name = Cookies.prototype.GetCookie('name');
        var userCompany = Cookies.prototype.GetCookie('company');

        var dateExpression = "and o.tjsj between to_date('" + begin + "','yyyy-MM-dd') and to_date('" + end + "','yyyy-MM-dd')";

        var companyName = company.substring(3);
        var projectlx = project.substring(3);
        var projectlxExpression = "";

        if (projectlx != "全部") {
            projectlxExpression = "and o.xmlx = '" + projectlx + "'";
        }

        var companyExpression = "";
        if (role == '副总' || userCompany == '远大大数据市场管理') { //userId == '005cca20150528yEuh84'
            // 分公司数据            
            if (companyName == "全部") {
                companyExpression = "";

            } else if (companyName == "安徽公司") {
                companyExpression = "and u.company in ('阜阳公司','合肥公司','六安公司')";

            } else {
                companyExpression = "and u.company = '" + companyName + "'";
            }
        }

        expressions = "select sum(case when o.dqjd='0-项目线索' then 1 else 0 end) as xsnum,sum(case when o.dqjd='0-项目线索' then nvl(o.yjpchte,0) else null end) xstotal" +
            ",sum(case when o.dqjd='1-项目立项' then 1 else 0 end) as lxnum,sum(case when o.dqjd='1-项目立项' then nvl(o.yjpchte,0) else null end) lxtotal" +
            ",sum(case when o.dqjd='2-项目推进' then 1 else 0 end) as tjnum,sum(case when o.dqjd='2-项目推进' then nvl(o.yjpchte,0) else null end) tjtotal" +
            ",sum(case when o.dqjd='3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') " + dateExpression + " then 1 else 0 end) as qynum,sum(case when o.dqjd='3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') " + dateExpression + " then nvl(o.yjpchte,0) else null end) qytotal" +
            ",sum(case when o.dqjd='3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and f.fwjd = '交付完结' then 1 else 0 end) as jfnum,sum(case when o.dqjd='3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and f.fwjd = '交付完结' then nvl(o.yjpchte,0) else null end) jftotal" +
            " from xmbb o left join fwht f on o.xmbh11=f.xmbh11 and f.is_deleted <> '1' left join contract c on o.xmbh11=c.xmbh11 and c.is_deleted <> '1' left join ccuser u on o.ownerid=u.id left join Account ac on o.khmc=ac.id where o.is_deleted <> '1' and o.dqjd <> '0-销项项目' and (o.bjxtj is null or o.bjxtj = 'false') " + projectlxExpression + " and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";
        // expressions = "select o.name,o.dqjd,u.company"+
        // " from xmbb o left join fwht f on o.xmbh11=f.xmbh11 and f.is_deleted <> '1' left join contract c on o.xmbh11=c.xmbh11 and c.is_deleted <> '1' left join ccuser u on o.ownerid=u.id left join Account ac on o.khmc=ac.id where o.is_deleted <> '1' and o.dqjd <> '0-销项项目' and o.dqjd='2-项目推进' " + projectlxExpression + " and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";

        var params = "serviceName=cqlQuery&objectApiName=xmbb&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding;
        $.ajax({
            type: "get",
            dataType: "json",
            url: url,
            data: params,
            success: function (data) {
                if (data != "") {
                    if (data.result) {
                        if (data.data.length > 0) {
                            // $("#proNum").html(data.data[0].num);
                            // $("#total").html(data.data[0].totalmoney);
                            var v = data.data[0];
                            var sum = v.xstotal + v.lxtotal + v.tjtotal + v.qytotal + v.jftotal;
                            $("#drje").html("金额" + (varIsNull(v.xstotal) ? 0 : v.xstotal) + "，个数" + v.xsnum);
                            $("#drje").css("width", (75 * v.xstotal / sum).toFixed(1) + "%");
                            $("#lxje").html("金额" + (varIsNull(v.lxtotal) ? 0 : v.lxtotal) + "，个数" + v.lxnum);
                            $("#lxje").css("width", (75 * v.lxtotal / sum).toFixed(1) + "%");
                            $("#tjje").html("金额" + (varIsNull(v.tjtotal) ? 0 : v.tjtotal) + "，个数" + v.tjnum);
                            $("#tjje").css("width", (75 * v.tjtotal / sum).toFixed(1) + "%");
                            $("#qyje").html("金额" + (varIsNull(v.qytotal) ? 0 : v.qytotal) + "，个数" + v.qynum);
                            $("#qyje").css("width", (75 * v.qytotal / sum).toFixed(1) + "%");
                            $("#jfje").html("金额" + (varIsNull(v.jftotal) ? 0 : v.jftotal) + "，个数" + v.jfnum);
                            $("#jfje").css("width", (75 * v.jftotal / sum).toFixed(1) + "%");
                        }

                    } else {
                        layer.msg(data.returnInfo);
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //debugger;
            }
        });
        dataBoard.loadTdyj(begin, end, company, project);
    },
    MaskedClick: function () {
        $(".back").off("click");
        $(".back").css("display", "none");
    },
    ShowSearchBackBtn: function () {
        $(".back").css("display", "block");
        $(".back").off("click");
        $(".back").on("click", dataBoard.SearchBack);
    },
    SearchBack: function () {
        Common.prototype.CloseMaskLayer("close-with-masklayer", dataBoard.MaskedClick);
    },
    InitDate: function () {
        var year = new Date().getFullYear();
        $(".beginTime").val(year + "-01-01");
        $(".endTime").val((year + 1) + "-01-01");
        // $("#target_label").html("目标达成(" + year + ")");
    },
    // loadxmzjd: function (begin, end, company, order) {
    //     return;
    //     var binding = Cookies.prototype.GetCookie('binding');
    //     var userId = Cookies.prototype.GetCookie('userId');
    //     var roleId = Cookies.prototype.GetCookie('roleId');
    //     var role = Cookies.prototype.GetCookie('role');
    //     var name = Cookies.prototype.GetCookie('name');
    //     var userCompany = Cookies.prototype.GetCookie('company');

    //     var dateExpression = "and o.tjsj between to_date('" + begin + "','yyyy-MM-dd') and to_date('" + end + "','yyyy-MM-dd')";

    //     var companyName = company.substring(3);

    //     var expressions_xmzjd = "";

    //     if (role == '副总' || userCompany == '远大大数据市场管理') { //userId == '005cca20150528yEuh84'
    //         // 分公司数据            
    //         if (companyName == "全部") {
    //             companyExpression = "";
    //             companyExpression1 = "";
    //             companyExpression2 = "";
    //         } else if (companyName == "安徽公司") {
    //             companyExpression = "and u.company in ('阜阳公司','合肥公司','六安公司')";
    //             companyExpression1 = "and um.company in ('阜阳公司','合肥公司','六安公司')";
    //             companyExpression2 = "and umm.company in ('阜阳公司','合肥公司','六安公司')";
    //         } else {
    //             companyExpression = "and u.company = '" + companyName + "'";
    //             companyExpression1 = "and um.company = '" + companyName + "'";
    //             companyExpression2 = "and umm.company = '" + companyName + "'";
    //         }

    //         //expressions_xmzjd = "select nvl(sum(c.pchte),0) as hte,u.name,months_between(sysdate,u.rzsj) as m,um.name as umname,um.title as umtitle,u.title,g.xsrw2018 as xsrw from contract c left join xmbb o on c.xmbh11=o.xmbh11 and o.is_deleted <>'1' and o.dqjd = '3-项目签约' " + dateExpression + " full join (select * from ccuser u where u.title like '%客户经理%' and u.isusing='1' and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)) u on c.ownerid = u.id full join (select * from ccuser um where um.title = '总监' and um.isusing='1' and um.company <> '远大大数据市场管理' and um.company <> '安徽公司' " + companyExpression1 + " and um.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)) um on u.manager = um.id left join gzxz g on um.company = g.ssgs and um.name = g.name and g.is_deleted <>'1' where um.name is not null group by u.name,u.title,u.rzsj,um.name,um.title,g.xsrw2018 order by um.name desc";
    //         //expressions_xmzjd = "select nvl(sum(xm.pchte),0) as hte,u.name,months_between(sysdate,u.rzsj) as m,um.name as umname,um.title as umtitle,u.title,g.xsrw2018 as xsrw from (SELECT c.pchte,c.ownerid from contract c left join xmbb o on c.xmbh11=o.xmbh11 where o.is_deleted <>'1' and o.dqjd = '3-项目签约' " + dateExpression + ") xm full join (select * from ccuser u where (u.title like '%客户经理%' or u.title='总监') and u.isusing='1' and u.company <> '远大大数据市场管理' and u.company <> '安徽公司' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)) u on xm.ownerid = u.id full join (select * from ccuser um where um.title = '总监' and um.isusing='1' and um.company <> '远大大数据市场管理' and um.company <> '安徽公司' " + companyExpression1 + " and um.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)) um on u.manager = um.id or u.id=um.id left join gzxz g on um.company = g.ssgs and um.name = g.name and g.is_deleted <>'1' where um.name is not null group by u.name,u.title,u.rzsj,um.name,um.title,g.xsrw2018 order by um.name desc";
    //         //(包含总监自己的销售额)expressions_xmzjd = "select nvl(sum(c.pchte),0) as hte,u.name,months_between(sysdate,u.rzsj) as m,(case when um.name is null then u.name else um.name end) as umname,um.title as umtitle,u.title,g.xsrw2018 as xsrw from contract c left join xmbb o on c.xmbh11=o.xmbh11 and o.is_deleted <>'1' and o.dqjd = '3-项目签约' " + dateExpression + " full join (select * from ccuser where isusing='1' and company <> '远大大数据市场管理' and company <> '安徽公司' " + companyExpression + " and role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)) u on c.ownerid = u.id full join (select * from ccuser where title = '总监' and isusing='1' and company <> '远大大数据市场管理' and company <> '安徽公司' " + companyExpression1 + " and role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)) um on u.manager = um.id left join gzxz g on um.company = g.ssgs and um.name = g.name and g.is_deleted <>'1' where u.name is not null and (um.title = '总监' or u.title = '总监') group by u.name,u.title,u.rzsj,(case when um.name is null then u.name else um.name end),um.title,g.xsrw2018 order by (case when um.name is null then u.name else um.name end) desc";
    //         expressions_xmzjd = "select nvl(sum(xm.pchte),0) as hte,u.name,months_between(sysdate,u.rzsj) as m,u.zjname as umname,u.zjtitle as umtitle,u.title,g.xsrw2018 as xsrw from (SELECT c.pchte,c.ownerid from contract c left join xmbb o on c.xmbh11=o.xmbh11 where o.is_deleted <>'1' and o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') " + dateExpression + ") xm full join (select uzj.name as zjname,uzj.title as zjtitle,usub.name,usub.title,uzj.company,usub.id,usub.rzsj from (select * from ccuser u where u.title='总监' and u.isusing='1' and u.is_deleted <>'1' and u.company in ('长沙公司','岳阳公司','郴州公司','上海公司','杭州公司','天津公司','南京公司','合肥公司','阜阳公司','六安公司','广州公司','深圳公司')) uzj left join tp_sys_role r on uzj.role = r.parentrole_id left join ccuser usub on r.roleid = usub.role where usub.isusing='1' and usub.is_deleted <>'1' and usub.company in ('长沙公司','岳阳公司','郴州公司','上海公司','杭州公司','天津公司','南京公司','合肥公司','阜阳公司','六安公司','广州公司','深圳公司') order by uzj.company,uzj.name)u on xm.ownerid = u.id left join gzxz g on u.company = g.ssgs and u.zjname = g.name and g.is_deleted <>'1' where u.zjname is not null " + companyExpression + " group by u.name,u.title,u.rzsj,u.zjname,u.zjtitle,g.xsrw2018 order by u.zjname desc";
    //     } else if (role == '总监') {
    //         //项目组数据
    //         //expressions = "";
    //         //expressions_xmzjd = "select u.id,u.name,b.bf,sum(case when o.dqjd='1-项目立项' then 1 else 0 end) as lx,sum(nvl(case when o.dqjd='3-项目签约' then o.yjpchte else null end,0)) as cj from (select u.name,u.title,u.id from ccuser u where u.isusing='1' and u.is_deleted <>'1' and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)) u left join (select * from xmbb o  where o.is_deleted <>'1' " + dateExpression + ") o on u.id = o.ownerid left join (select o.ownerid,count(1) as bf from khbf o where o.is_deleted <> '1' and (o.bcbfsj between to_date('" + begin + "','yyyy/mm/dd') and to_date('" + end + "','yyyy/mm/dd')) group by o.ownerid) b on u.id = b.ownerid group by u.id,u.name,b.bf";
    //         expressions_xmzjd = "select * from (select u.id,u.name,b.bf,sum(case when o.dqjd='1-项目立项' then 1 else 0 end) as lx,sum(nvl(case when o.dqjd='3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') then o.yjpchte else null end,0)) as cj,count(1) as rowspan from (select u.name,u.title,u.id from ccuser u where u.isusing='1' and u.is_deleted <>'1' and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)) u left join (select * from xmbb o  where o.is_deleted <>'1' " + dateExpression + ") o on u.id = o.ownerid left join (select o.ownerid,count(1) as bf from khbf o where o.is_deleted <> '1' and (o.bcbfsj between to_date('" + begin + "','yyyy/mm/dd') and to_date('" + end + "','yyyy/mm/dd')) group by o.ownerid) b on u.id = b.ownerid group by u.id,u.name,b.bf) utj left join (select s.name as server,o.name as xmmc,o.ownerid from xmbb o left join fwht f on o.xmbh11 = f.xmbh11 left join ccuser s on f.ownerid = s.id  where o.is_deleted <>'1' " + dateExpression + ") xm on utj.id = xm.ownerid";
    //         //expressions_xmzjd = "select s.name as server,o.name as xmmc,o.ownerid from xmbb o left join fwht f on o.xmbh11 = f.xmbh11 left join ccuser s on f.ownerid = s.id  where o.is_deleted <>'1' " + dateExpression + "";
    //     } else if (Common.prototype.isContains(role, '客户经理')) {
    //         //项目组数据
    //         //expressions = "";
    //         expressions_xmzjd = "select * from (select u.id,u.name,b.bf,sum(case when o.dqjd='1-项目立项' then 1 else 0 end) as lx,sum(nvl(case when o.dqjd='3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') then o.yjpchte else null end,0)) as cj,count(1) as rowspan from (select u.name,u.title,u.id from ccuser u where u.isusing='1' and u.is_deleted <>'1' and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)) u left join (select * from xmbb o  where o.is_deleted <>'1' " + dateExpression + ") o on u.id = o.ownerid left join (select o.ownerid,count(1) as bf from khbf o where o.is_deleted <> '1' and (o.bcbfsj between to_date('" + begin + "','yyyy/mm/dd') and to_date('" + end + "','yyyy/mm/dd')) group by o.ownerid) b on u.id = b.ownerid group by u.id,u.name,b.bf) utj left join (select s.name as server,o.name as xmmc,o.ownerid from xmbb o left join fwht f on o.xmbh11 = f.xmbh11 left join ccuser s on f.ownerid = s.id  where o.is_deleted <>'1' " + dateExpression + ") xm on utj.id = xm.ownerid";
    //     }


    //     params_xmzjd = "serviceName=cqlQuery&objectApiName=ccuser&expressions=" + encodeURIComponent(expressions_xmzjd) + "&binding=" + binding;

    //     var index1 = layer.load(1, {
    //         shade: false
    //     });
    //     $.ajax({
    //         type: "post",
    //         dataType: "json",
    //         url: url,
    //         data: params_xmzjd,
    //         success: function (data) {
    //             if (data != "") {
    //                 if (data.result) {
    //                     if (data.data.length > 0) {
    //                         if (role == '副总' || userCompany == '远大大数据市场管理') { //userId == '005cca20150528yEuh84'
    //                             var rowspan = 0;
    //                             var xsrwTotal = 0;
    //                             var html = "";
    //                             var html_zjrow = "";
    //                             var htmls = [];
    //                             for (var i = 0; i < data.data.length; i++) {
    //                                 var v = data.data[i];

    //                                 if (i == 0) {
    //                                     html_zjrow += "<tr>";
    //                                     html_zjrow += "<td rowspan='[rowspan]'>" + v.umname + "</td>";
    //                                     html_zjrow += "<td rowspan='[rowspan]'>" + (varIsNull(v.xsrw) ? "" : Common.prototype.NumFormat(v.xsrw)) + "</td>";
    //                                     html_zjrow += "<td rowspan='[rowspan]'>[xsrwTotal]</td>";
    //                                     html_zjrow += "<td " + (v.title == "总监" ? "style='color:red;'" : "") + ">" + (varIsNull(v.name) ? "" : v.name) + "</td>";
    //                                     html_zjrow += "<td>" + (varIsNull(v.m) ? "" : v.m.toFixed(0)) + "</td>";
    //                                     html_zjrow += "<td>" + Common.prototype.NumFormat(v.hte) + "</td>";

    //                                     rowspan += 1;
    //                                     xsrwTotal += v.hte;
    //                                     html_zjrow += "</tr>";
    //                                 } else if (v.umname == data.data[i - 1].umname) {
    //                                     html_zjrow += "<tr>";
    //                                     html_zjrow += "<td " + (v.title == "总监" ? "style='color:red;'" : "") + ">" + (varIsNull(v.name) ? "" : v.name) + "</td>";
    //                                     html_zjrow += "<td>" + (varIsNull(v.m) ? "" : v.m.toFixed(0)) + "</td>";
    //                                     html_zjrow += "<td>" + Common.prototype.NumFormat(v.hte) + "</td>";
    //                                     rowspan += 1;
    //                                     xsrwTotal += v.hte;
    //                                     html_zjrow += "</tr>";
    //                                 } else {
    //                                     html_zjrow = html_zjrow.replace(/\[rowspan\]/g, rowspan);
    //                                     html_zjrow = html_zjrow.replace(/\[xsrwTotal\]/g, varIsNull(xsrwTotal) ? "" : Common.prototype.NumFormat(xsrwTotal.toFixed(2)));
    //                                     //html += html_zjrow;
    //                                     htmls.push({
    //                                         "xse": xsrwTotal,
    //                                         "html": html_zjrow
    //                                     });
    //                                     html_zjrow = "";
    //                                     rowspan = 0;
    //                                     xsrwTotal = 0;
    //                                     html_zjrow += "<tr>";
    //                                     html_zjrow += "<td rowspan='[rowspan]'>" + v.umname + "</td>";
    //                                     html_zjrow += "<td rowspan='[rowspan]'>" + (varIsNull(v.xsrw) ? "" : Common.prototype.NumFormat(v.xsrw)) + "</td>";
    //                                     html_zjrow += "<td rowspan='[rowspan]'>[xsrwTotal]</td>";
    //                                     html_zjrow += "<td " + (v.title == "总监" ? "style='color:red;'" : "") + ">" + (varIsNull(v.name) ? "" : v.name) + "</td>";
    //                                     html_zjrow += "<td>" + (varIsNull(v.m) ? "" : v.m.toFixed(0)) + "</td>";
    //                                     html_zjrow += "<td>" + Common.prototype.NumFormat(v.hte) + "</td>";
    //                                     html_zjrow += "</tr>";
    //                                     rowspan += 1;
    //                                     xsrwTotal += v.hte;
    //                                 }
    //                                 if (i == data.data.length - 1) {
    //                                     html_zjrow = html_zjrow.replace(/\[rowspan\]/g, rowspan);
    //                                     html_zjrow = html_zjrow.replace(/\[xsrwTotal\]/g, varIsNull(xsrwTotal) ? "" : Common.prototype.NumFormat(xsrwTotal.toFixed(2)));
    //                                     //html += html_zjrow;
    //                                     htmls.push({
    //                                         "xse": xsrwTotal,
    //                                         "html": html_zjrow
    //                                     });
    //                                     html_zjrow = "";
    //                                 }

    //                                 //html += html_zjrow;
    //                             }
    //                             if (order == "desc") {
    //                                 htmls.sort(dataBoard.compare_r);
    //                             } else {
    //                                 htmls.sort(dataBoard.compare);
    //                             }

    //                             html = "";
    //                             for (var k = 0; k < htmls.length; k++) {
    //                                 html += htmls[k].html;
    //                             }
    //                             $(".role_fz_content").html(html);
    //                         } else {
    //                             var html = "";
    //                             for (var i = 0; i < data.data.length; i++) {
    //                                 var v = data.data[i];
    //                                 html += "<tr>";
    //                                 if (i == 0) {
    //                                     html += "<td rowspan='" + (varIsNull(v.rowspan) ? 1 : v.rowspan) + "'>" + v.name + "</td>";
    //                                     html += "<td rowspan='" + (varIsNull(v.rowspan) ? 1 : v.rowspan) + "'>" + v.bf + "</td>";
    //                                     html += "<td rowspan='" + (varIsNull(v.rowspan) ? 1 : v.rowspan) + "'>" + v.lx + "</td>";
    //                                     html += "<td rowspan='" + (varIsNull(v.rowspan) ? 1 : v.rowspan) + "'>" + Common.prototype.NumFormat(v.cj) + "万</td>";
    //                                     html += "<td>" + (varIsNull(v.server) ? "" : v.server) + "</td>";
    //                                     html += "<td>" + (varIsNull(v.xmmc) ? "" : v.xmmc) + "</td>";
    //                                     html += "<td></td>";
    //                                     html += "<td></td>";
    //                                 } else {
    //                                     if (v.id == data.data[i - 1].id) {
    //                                         html += "<td>" + (varIsNull(v.server) ? "" : v.server) + "</td>";
    //                                         html += "<td>" + (varIsNull(v.xmmc) ? "" : v.xmmc) + "</td>";
    //                                         html += "<td></td>";
    //                                         html += "<td></td>";
    //                                     } else {
    //                                         html += "<td rowspan='" + (varIsNull(v.rowspan) ? 1 : v.rowspan) + "'>" + v.name + "</td>";
    //                                         html += "<td rowspan='" + (varIsNull(v.rowspan) ? 1 : v.rowspan) + "'>" + v.bf + "</td>";
    //                                         html += "<td rowspan='" + (varIsNull(v.rowspan) ? 1 : v.rowspan) + "'>" + v.lx + "</td>";
    //                                         html += "<td rowspan='" + (varIsNull(v.rowspan) ? 1 : v.rowspan) + "'>" + Common.prototype.NumFormat(v.cj) + "万</td>";
    //                                         html += "<td>" + (varIsNull(v.server) ? "" : v.server) + "</td>";
    //                                         html += "<td>" + (varIsNull(v.xmmc) ? "" : v.xmmc) + "</td>";
    //                                         html += "<td></td>";
    //                                         html += "<td></td>";
    //                                     }
    //                                 }

    //                                 html += "</tr>";
    //                             }
    //                             $(".role_zj_content").html(html);
    //                         }
    //                         // layer.msg("没有更多数据了！");
    //                     }
    //                     layer.close(index1);
    //                     return;
    //                 } else {
    //                     layer.msg(data.returnInfo);
    //                 }
    //             }
    //             layer.close(index1);
    //         },
    //         error: function (XMLHttpRequest, textStatus, errorThrown) {
    //             //debugger;
    //             layer.close(index1);
    //         }
    //     });
    // },
    loadTdyj: function (begin, end, company, project) {
        var binding = Cookies.prototype.GetCookie('binding');
        var userId = Cookies.prototype.GetCookie('userId');
        var roleId = Cookies.prototype.GetCookie('roleId');
        var role = Cookies.prototype.GetCookie('role');
        var name = Cookies.prototype.GetCookie('name');
        var userCompany = Cookies.prototype.GetCookie('company');

        var nowYear = new Date().getFullYear();

        var dateExpression = "and o.tjsj between to_date('" + begin + "','yyyy-MM-dd') and to_date('" + end + "','yyyy-MM-dd')";

        var companyName = company.substring(3);

        var projectlx = project.substring(3);
        var projectlxExpression = "";
        if (projectlx != "全部") {
            projectlxExpression = "and o.xmlx = '" + projectlx + "'";
        }

        var expressions = "";
        var companyExpression = "";
        var companyExpression1 = "";
        if (role == '副总' || userCompany == '远大大数据市场管理') { //userId == '005cca20150528yEuh84'
            // 分公司数据            
            if (companyName == "全部") {
                companyExpression = "and u.company in ('长沙公司','岳阳公司','郴州公司','上海公司','杭州公司','天津公司','南京公司','合肥公司','阜阳公司','六安公司','广州公司','深圳公司')";
                // companyExpression1 = "g.ssgs in ('长沙公司','岳阳公司','郴州公司','上海公司','杭州公司','天津公司','南京公司','合肥公司','阜阳公司','六安公司','广州公司','深圳公司')";
                // companyExpression2 = "";
                companyExpression1 = "and g.ssgs in ('长沙公司','岳阳公司','郴州公司','上海公司','杭州公司','天津公司','南京公司','合肥公司','阜阳公司','六安公司','广州公司','深圳公司')";
                expressions = "select g.ssgs as team,g.xsrw2018 as xsrw,a.hte as hte,nvl(a.xmcb,0) as xmcb,nvl(a.yjcj,0) as yjcj,nvl(a.q1,0) as q1,nvl(a.q2,0) as q2,nvl(a.q3,0) as q3,nvl(a.q4,0) as q4 from (select ssgs,sum(xsrw2018) as xsrw2018 from gzxz where is_deleted <>'1' group by ssgs) g left join (SELECT nvl(sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " then o.yjpchte else null end,0)),0) as hte,nvl(sum(nvl(case when o.dqjd <> '3-项目签约' " + projectlxExpression + " then o.yjpchte else null end,0)),0) as xmcb,sum(nvl(case when o.dqjd in ('0-项目线索','1-项目立项','2-项目推进') and o.sfycjxm = '是' " + projectlxExpression + " then o.yjpchte else null end,0)) as yjcj," +
                    "sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (1,2,3) then o.yjpchte else null end,0)) as q1,sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (4,5,6) then o.yjpchte else null end,0)) as q2,sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (7,8,9) then o.yjpchte else null end,0)) as q3,sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (10,11,12) then o.yjpchte else null end,0)) as q4," +
                    "u.company from xmbb o left join contract c on o.xmbh11=c.xmbh11 and c.is_deleted <>'1' left join ccuser u on o.ownerid=u.id where o.is_deleted <>'1' and o.dqjd != '0-销项项目' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) group by u.company) a on g.ssgs = a.company where 1 = 1 " + companyExpression1 + " order by nvl(a.hte,0) desc";

                // expressions = "SELECT nvl(sum(nvl(case when o.dqjd = '3-项目签约' then o.yjpchte else null end,0)),0) as hte,nvl(sum(nvl(case when o.dqjd <> '3-项目签约' then o.yjpchte else null end,0)),0) as xmcb,sum(nvl(case when o.dqjd in ('0-项目线索','1-项目立项','2-项目推进') and o.sfycjxm = '是' then o.yjpchte else null end,0)) as yjcj," +
                //     "sum(nvl(case when o.dqjd = '3-项目签约' and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (1,2,3) then o.yjpchte else null end,0)) as q1,sum(nvl(case when o.dqjd = '3-项目签约' and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (4,5,6) then o.yjpchte else null end,0)) as q2,sum(nvl(case when o.dqjd = '3-项目签约' and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (7,8,9) then o.yjpchte else null end,0)) as q3,sum(nvl(case when o.dqjd = '3-项目签约' and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (10,11,12) then o.yjpchte else null end,0)) as q4," +
                //     "u.company from xmbb o left join contract c on o.xmbh11=c.xmbh11 left join ccuser u on o.ownerid=u.id left join ccuser um on u.manager = um.id where o.is_deleted <>'1' and o.dqjd != '0-销项项目' " + dateExpression + " " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) group by u.company";
            } else if (companyName == "安徽公司") {
                companyExpression = "and u.company in ('阜阳公司','合肥公司','六安公司')";
                companyExpression1 = "and g.ssgs in ('阜阳公司','合肥公司','六安公司')";
                expressions = "select g.team,g.xsrw2018 as xsrw,g.ssgs as com, a.hte,nvl(a.xmcb,0) as xmcb,nvl(a.yjcj,0) as yjcj,nvl(a.q1,0) as q1,nvl(a.q2,0) as q2,nvl(a.q3,0) as q3,nvl(a.q4,0) as q4,a.umname,a.umtitle,a.company from gzxz g left join (SELECT nvl(sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " then o.yjpchte else null end,0)),0) as hte,nvl(sum(nvl(case when o.dqjd <> '3-项目签约' " + projectlxExpression + " then o.yjpchte else null end,0)),0) as xmcb,sum(nvl(case when o.dqjd in ('0-项目线索','1-项目立项','2-项目推进') and o.sfycjxm = '是' " + projectlxExpression + " then o.yjpchte else null end,0)) as yjcj," +
                    "sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (1,2,3) then o.yjpchte else null end,0)) as q1,sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (4,5,6) then o.yjpchte else null end,0)) as q2,sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (7,8,9) then o.yjpchte else null end,0)) as q3,sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (10,11,12) then o.yjpchte else null end,0)) as q4," +
                    "u.zjname as umname,u.company,u.zjtitle as umtitle from xmbb o left join contract c on o.xmbh11=c.xmbh11 and c.is_deleted <>'1' left join (select uzj.name as zjname,uzj.title as zjtitle,usub.name,usub.title,usub.company,usub.id,usub.role from (select * from ccuser where (title='总监' or title='副总') and isusing='1' and is_deleted <>'1') uzj left join tp_sys_role r on uzj.role = r.parentrole_id left join ccuser usub on r.roleid = usub.role where usub.isusing='1' and usub.is_deleted <>'1' order by uzj.company,uzj.name) u on o.ownerid=u.id where o.is_deleted <>'1' and o.dqjd != '0-销项项目' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) group by u.zjname,u.company,u.zjtitle) a on g.ssgs = a.company and g.name = a.umname where g.is_deleted <>'1' " + companyExpression1 + " order by nvl(a.hte,0) desc";
            } else {
                companyExpression = "and u.company = '" + companyName + "'";
                companyExpression1 = "and g.ssgs ='" + companyName + "'";
                expressions = "select g.team,g.xsrw2018 as xsrw,g.ssgs as com, a.hte,nvl(a.xmcb,0) as xmcb,nvl(a.yjcj,0) as yjcj,nvl(a.q1,0) as q1,nvl(a.q2,0) as q2,nvl(a.q3,0) as q3,nvl(a.q4,0) as q4,a.umname,a.umtitle,a.company from gzxz g left join (SELECT nvl(sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " then o.yjpchte else null end,0)),0) as hte,nvl(sum(nvl(case when o.dqjd <> '3-项目签约' " + projectlxExpression + " then o.yjpchte else null end,0)),0) as xmcb,sum(nvl(case when o.dqjd in ('0-项目线索','1-项目立项','2-项目推进') and o.sfycjxm = '是' " + projectlxExpression + " then o.yjpchte else null end,0)) as yjcj," +
                    "sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (1,2,3) then o.yjpchte else null end,0)) as q1,sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (4,5,6) then o.yjpchte else null end,0)) as q2,sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (7,8,9) then o.yjpchte else null end,0)) as q3,sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (10,11,12) then o.yjpchte else null end,0)) as q4," +
                    "u.zjname as umname,u.company,u.zjtitle as umtitle from xmbb o left join contract c on o.xmbh11=c.xmbh11 and c.is_deleted <>'1' left join (select uzj.name as zjname,uzj.title as zjtitle,usub.name,usub.title,usub.company,usub.id,usub.role from (select * from ccuser where (title='总监' or title='副总') and isusing='1' and is_deleted <>'1') uzj left join tp_sys_role r on uzj.role = r.parentrole_id left join ccuser usub on r.roleid = usub.role where usub.isusing='1' and usub.is_deleted <>'1' order by uzj.company,uzj.name) u on o.ownerid=u.id where o.is_deleted <>'1' and o.dqjd != '0-销项项目' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) group by u.zjname,u.company,u.zjtitle) a on g.ssgs = a.company and g.name = a.umname where g.is_deleted <>'1' " + companyExpression1 + " order by nvl(a.hte,0) desc";
            }


            //doing   
            //expressions = "select nvl(sum(xm.pchte),0) as hte,u.name,u.zjname as umname,u.zjtitle as umtitle,u.title,g.xsrw2018 as xsrw from (SELECT c.pchte,c.ownerid from contract c left join xmbb o on c.xmbh11=o.xmbh11 where o.is_deleted <>'1' and o.dqjd = '3-项目签约' " + dateExpression + ") xm full join (select uzj.name as zjname,uzj.title as zjtitle,usub.name,usub.title,uzj.company,usub.id,usub.rzsj from (select * from ccuser u where u.title='总监' and u.isusing='1' and u.is_deleted <>'1' and u.company in ('长沙公司','岳阳公司','郴州公司','上海公司','杭州公司','天津公司','南京公司','合肥公司','阜阳公司','六安公司','广州公司','深圳公司')) uzj left join tp_sys_role r on uzj.role = r.parentrole_id left join ccuser usub on r.roleid = usub.role where usub.isusing='1' and usub.is_deleted <>'1' and usub.company in ('长沙公司','岳阳公司','郴州公司','上海公司','杭州公司','天津公司','南京公司','合肥公司','阜阳公司','六安公司','广州公司','深圳公司') order by uzj.company,uzj.name)u on xm.ownerid = u.id left join gzxz g on u.company = g.ssgs and u.zjname = g.name and g.is_deleted <>'1' where u.zjname is not null " + companyExpression + " group by u.name,u.title,u.rzsj,u.zjname,u.zjtitle,g.xsrw2018 order by u.zjname desc";
            //gzxz g on um.company = g.ssgs and um.name = g.name  and g.is_deleted <>'1'    " + dateExpression + "
        } else if (role == '总监') {
            companyExpression1 = "and g.ssgs = '" + userCompany + "'";
            expressions = "select g.team,g.xsrw2018 as xsrw,g.ssgs as com, a.hte,nvl(a.xmcb,0) as xmcb,nvl(a.yjcj,0) as yjcj,nvl(a.q1,0) as q1,nvl(a.q2,0) as q2,nvl(a.q3,0) as q3,nvl(a.q4,0) as q4,a.umname,a.umtitle,a.company from gzxz g left join (SELECT nvl(sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " then o.yjpchte else null end,0)),0) as hte,nvl(sum(nvl(case when o.dqjd <> '3-项目签约' " + projectlxExpression + " then o.yjpchte else null end,0)),0) as xmcb,sum(nvl(case when o.dqjd in ('0-项目线索','1-项目立项','2-项目推进') and o.sfycjxm = '是' " + projectlxExpression + " then o.yjpchte else null end,0)) as yjcj," +
                "sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (1,2,3) then o.yjpchte else null end,0)) as q1,sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (4,5,6) then o.yjpchte else null end,0)) as q2,sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (7,8,9) then o.yjpchte else null end,0)) as q3,sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (10,11,12) then o.yjpchte else null end,0)) as q4," +
                "u.zjname as umname,u.company,u.zjtitle as umtitle from xmbb o left join contract c on o.xmbh11=c.xmbh11 and c.is_deleted <>'1' left join (select uzj.name as zjname,uzj.title as zjtitle,usub.name,usub.title,usub.company,usub.id,usub.role from (select * from ccuser where (title='总监' or title='副总') and isusing='1' and is_deleted <>'1') uzj left join tp_sys_role r on uzj.role = r.parentrole_id left join ccuser usub on r.roleid = usub.role where usub.isusing='1' and usub.is_deleted <>'1' order by uzj.company,uzj.name) u on o.ownerid=u.id where o.is_deleted <>'1' and o.dqjd != '0-销项项目' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) group by u.zjname,u.company,u.zjtitle) a on g.ssgs = a.company and g.name = a.umname where g.is_deleted <>'1' " + companyExpression1 + " order by nvl(a.hte,0) desc";

            // expressions = "select g.team,g.xsrw2018 as xsrw,g.ssgs as com, a.hte,nvl(a.xmcb,0) as xmcb,nvl(a.yjcj,0) as yjcj,nvl(a.q1,0) as q1,nvl(a.q2,0) as q2,nvl(a.q3,0) as q3,nvl(a.q4,0) as q4,a.umname,a.umtitle,a.company from gzxz g left join (SELECT nvl(sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " then o.yjpchte else null end,0)),0) as hte,nvl(sum(nvl(case when o.dqjd <> '3-项目签约' then o.yjpchte else null end,0)),0) as xmcb,sum(nvl(case when o.dqjd in ('0-项目线索','1-项目立项','2-项目推进') and o.sfycjxm = '是' then o.yjpchte else null end,0)) as yjcj," +
            //     "sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (1,2,3) then o.yjpchte else null end,0)) as q1,sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (4,5,6) then o.yjpchte else null end,0)) as q2,sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (7,8,9) then o.yjpchte else null end,0)) as q3,sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (10,11,12) then o.yjpchte else null end,0)) as q4," +
            //     "(case when u.title = '总监' then u.name else um.name end) as umname,u.company,(case when u.title = '总监' then u.title else um.title end) as umtitle from xmbb o left join contract c on o.xmbh11=c.xmbh11 and c.is_deleted <>'1' left join ccuser u on o.ownerid=u.id left join ccuser um on u.manager = um.id where o.is_deleted <>'1' and o.dqjd != '0-销项项目' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) group by (case when u.title = '总监' then u.name else um.name end),u.company,(case when u.title = '总监' then u.title else um.title end)) a on g.ssgs = a.company and g.name = a.umname where g.is_deleted <>'1' " + companyExpression1 + " order by nvl(a.hte,0) desc";
        } else if (Common.prototype.isContains(role, '客户经理')) {
            companyExpression1 = "and g.ssgs = '" + userCompany + "'";
            
            expressions = "select g.team,g.xsrw2018 as xsrw,g.ssgs as com, a.hte,nvl(a.xmcb,0) as xmcb,nvl(a.yjcj,0) as yjcj,nvl(a.q1,0) as q1,nvl(a.q2,0) as q2,nvl(a.q3,0) as q3,nvl(a.q4,0) as q4,a.umname,a.umtitle,a.company from gzxz g left join (SELECT nvl(sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " then o.yjpchte else null end,0)),0) as hte,nvl(sum(nvl(case when o.dqjd <> '3-项目签约' " + projectlxExpression + " then o.yjpchte else null end,0)),0) as xmcb,sum(nvl(case when o.dqjd in ('0-项目线索','1-项目立项','2-项目推进') and o.sfycjxm = '是' " + projectlxExpression + " then o.yjpchte else null end,0)) as yjcj," +
                "sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (1,2,3) then o.yjpchte else null end,0)) as q1,sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (4,5,6) then o.yjpchte else null end,0)) as q2,sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (7,8,9) then o.yjpchte else null end,0)) as q3,sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (10,11,12) then o.yjpchte else null end,0)) as q4," +
                "u.zjname as umname,u.company,u.zjtitle as umtitle from xmbb o left join contract c on o.xmbh11=c.xmbh11 and c.is_deleted <>'1' left join (select uzj.name as zjname,uzj.title as zjtitle,usub.name,usub.title,usub.company,usub.id,usub.role from (select * from ccuser where (title='总监' or title='副总') and isusing='1' and is_deleted <>'1') uzj left join tp_sys_role r on uzj.role = r.parentrole_id left join ccuser usub on r.roleid = usub.role where usub.isusing='1' and usub.is_deleted <>'1' order by uzj.company,uzj.name) u on o.ownerid=u.id where o.is_deleted <>'1' and o.dqjd != '0-销项项目' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) group by u.zjname,u.company,u.zjtitle) a on g.ssgs = a.company and g.name = a.umname where g.is_deleted <>'1' " + companyExpression1 + " order by nvl(a.hte,0) desc";
            
            // expressions = "select g.team,g.xsrw2018 as xsrw,g.ssgs as com, a.hte,nvl(a.xmcb,0) as xmcb,nvl(a.yjcj,0) as yjcj,nvl(a.q1,0) as q1,nvl(a.q2,0) as q2,nvl(a.q3,0) as q3,nvl(a.q4,0) as q4,a.umname,a.umtitle,a.company from gzxz g left join (SELECT nvl(sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " then o.yjpchte else null end,0)),0) as hte,nvl(sum(nvl(case when o.dqjd <> '3-项目签约' then o.yjpchte else null end,0)),0) as xmcb,sum(nvl(case when o.dqjd in ('0-项目线索','1-项目立项','2-项目推进') and o.sfycjxm = '是' then o.yjpchte else null end,0)) as yjcj," +
            //     "sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (1,2,3) then o.yjpchte else null end,0)) as q1,sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (4,5,6) then o.yjpchte else null end,0)) as q2,sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (7,8,9) then o.yjpchte else null end,0)) as q3,sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (10,11,12) then o.yjpchte else null end,0)) as q4," +
            //     "(case when u.title = '总监' then u.name else um.name end) as umname,u.company,(case when u.title = '总监' then u.title else um.title end) as umtitle from xmbb o left join contract c on o.xmbh11=c.xmbh11 and c.is_deleted <>'1' left join ccuser u on o.ownerid=u.id left join ccuser um on u.manager = um.id where o.is_deleted <>'1' and o.dqjd != '0-销项项目' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) group by (case when u.title = '总监' then u.name else um.name end),u.company,(case when u.title = '总监' then u.title else um.title end)) a on g.ssgs = a.company and g.name = a.umname where g.is_deleted <>'1' " + companyExpression1 + " order by nvl(a.hte,0) desc";
        }

        // expressions = "SELECT sum(nvl(case when o.dqjd = '3-项目签约' then o.yjpchte else null end,0)) as hte,sum(nvl(case when o.dqjd <> '3-项目签约' then o.yjpchte else null end,0)) as xmcb,sum(nvl(case when o.dqjd in ('0-项目线索','1-项目立项','2-项目推进') and o.sfycjxm = '是' then o.yjpchte else null end,0)) as yjcj,"+
        // "sum(nvl(case when o.dqjd = '3-项目签约' and EXTRACT(YEAR FROM o.tjsj) = "+nowYear+" and EXTRACT(MONTH FROM o.tjsj) in (1,2,3) then o.yjpchte else null end,0)) as Q1,sum(nvl(case when o.dqjd = '3-项目签约' and EXTRACT(YEAR FROM o.tjsj) = "+nowYear+" and EXTRACT(MONTH FROM o.tjsj) in (4,5,6) then o.yjpchte else null end,0)) as Q2,sum(nvl(case when o.dqjd = '3-项目签约' and EXTRACT(YEAR FROM o.tjsj) = "+nowYear+" and EXTRACT(MONTH FROM o.tjsj) in (7,8,9) then o.yjpchte else null end,0)) as Q3,sum(nvl(case when o.dqjd = '3-项目签约' and EXTRACT(YEAR FROM o.tjsj) = "+nowYear+" and EXTRACT(MONTH FROM o.tjsj) in (10,11,12) then o.yjpchte else null end,0)) as Q4," + 
        // "(case when u.title = '总监' then u.name else um.name end) as umname,u.company,(case when u.title = '总监' then u.title else um.title end) as umtitle from xmbb o left join contract c on o.xmbh11=c.xmbh11 left join ccuser u on o.ownerid=u.id left join ccuser um on u.manager = um.id where o.is_deleted <>'1' and o.dqjd != '0-销项项目'  " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) group by (case when u.title = '总监' then u.name else um.name end),u.company,(case when u.title = '总监' then u.title else um.title end)";

        //expressions = "SELECT o.dqjd,c.id,o.yjpchte FROM xmbb o left join contract c on o.xmbh11=c.xmbh11 and c.is_deleted <>'1' left join ccuser u on o.ownerid=u.id left join ccuser um on u.manager = um.id where o.is_deleted <>'1' and o.dqjd != '0-销项项目' and u.company = '郴州公司' and u.role in (select roleid  from tp_sys_role where parentrole_id='2016ABC0191D21Bx9LmO' and gap >=0) and o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = 2018 and EXTRACT(MONTH FROM o.tjsj) in (7,8,9)";

        params = "serviceName=cqlQuery&objectApiName=xmbb&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding;
        // return;
        var index = layer.load(1, {
            shade: false
        });

        //提交ajax
        $.ajax({
            type: "post",
            dataType: "json",
            url: url,
            data: params,
            success: function (data) {
                if (data != "") {
                    if (data.result) {
                        if (data.data.length > 0) {
                            var html = "";
                            var html1 = "";
                            var sumXsrw = 0;
                            var sumGap = 0;
                            var sumCb = 0;
                            var sumYj = 0;
                            var sumQ1 = 0;
                            var sumQ2 = 0;
                            var sumQ3 = 0;
                            var sumQ4 = 0;
                            for (var i = 0; i < data.data.length; i++) {
                                var v = data.data[i];
                                if(!shwoAllData && v.umname == null){
                                    continue;
                                }
                                html1 += "<tr>";
                                html1 += "<td>" + v.team + "</td>";
                                html1 += "</tr>";
                                html += "<tr>";
                                html += "<td>" + Common.prototype.NumFormat(v.xsrw) + "</td>";
                                sumXsrw += Number(v.xsrw);
                                html += "<td>" + Common.prototype.NumFormat(Number(v.hte).toFixed(2)) + "</td>";
                                html += "<td>" + Common.prototype.NumFormat((Number(v.xsrw) - v.hte).toFixed(2)) + "</td>";
                                sumGap += Number(Number(v.xsrw) - Number(v.hte));
                                html += "<td>" + Common.prototype.NumFormat(v.xmcb) + "</td>";
                                sumCb += Number(v.xmcb);
                                html += "<td>" + Common.prototype.NumFormat(v.yjcj) + "</td>";
                                sumYj += Number(v.yjcj);
                                html += "<td>" + Common.prototype.NumFormat(v.q1) + "</td>";
                                sumQ1 += Number(v.q1);
                                html += "<td>" + Common.prototype.NumFormat(v.q2) + "</td>";
                                sumQ2 += Number(v.q2);
                                html += "<td>" + Common.prototype.NumFormat(v.q3) + "</td>";
                                sumQ3 += Number(v.q3);
                                html += "<td>" + Common.prototype.NumFormat(v.q4) + "</td>";
                                sumQ4 += Number(v.q4);
                                html += "</tr>";
                            }
                            html1 += "<tr>";
                            html1 += "<td>汇总</td>";
                            html1 += "</tr>";
                            html += "<tr>";
                            html += "<td>" + Common.prototype.NumFormat(sumXsrw.toFixed(2)) + "</td>";
                            html += "<td>" + Common.prototype.NumFormat((Number(sumXsrw) - Number(sumGap)).toFixed(2)) + "</td>";
                            html += "<td>" + Common.prototype.NumFormat(sumGap.toFixed(2)) + "</td>";
                            html += "<td>" + Common.prototype.NumFormat(sumCb.toFixed(2)) + "</td>";
                            html += "<td>" + Common.prototype.NumFormat(sumYj.toFixed(2)) + "</td>";
                            html += "<td>" + Common.prototype.NumFormat(sumQ1.toFixed(2)) + "</td>";
                            html += "<td>" + Common.prototype.NumFormat(sumQ2.toFixed(2)) + "</td>";
                            html += "<td>" + Common.prototype.NumFormat(sumQ3.toFixed(2)) + "</td>";
                            html += "<td>" + Common.prototype.NumFormat(sumQ4.toFixed(2)) + "</td>";
                            html += "</tr>";
                            $(".table_khb_content").html(html1);
                            $(".table_yeji_content").html(html);
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
    },
    compare: function (obj1, obj2) {
        var val1 = obj1.xse;
        var val2 = obj2.xse;
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }
    },
    compare_r: function (obj1, obj2) {
        var val1 = obj1.xse;
        var val2 = obj2.xse;
        if (val1 < val2) {
            return 1;
        } else if (val1 > val2) {
            return -1;
        } else {
            return 0;
        }
    },
    setLink: function (begin, end, company) {
        for (var i = 1; i < 18; i++) {
            $("#jd" + i).attr("href", "/crm/project/project.html?filter=true&begin=" + encodeURIComponent(begin) + "&end=" + encodeURIComponent(end) + "&companyName=" + encodeURIComponent(company) + "&filtertype=jd&jd=" + i + ".");
        }
    }
}

window.dataBoard = new DataBoard();