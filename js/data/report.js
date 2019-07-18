$(function () {
    Common.prototype.checkLoginStatu();
    $(".back").on("click", Common.prototype.Back);
    $(".company").on("change", report.loadXmjdb);
    var role = Cookies.prototype.GetCookie('role');
    var userCompany = Cookies.prototype.GetCookie('company');
    if (role == '副总' || userCompany == '远大大数据市场管理') {

    }else{
        $(".company").html("<option>"+userCompany+"</option>");
    }
    report.initData();
});

var Report = function () {}

Report.prototype = {
    initData: function () {
        var type = Common.prototype.GetQueryString('type');
        var types = {
            "1": "合同业绩表",
            "2": "项目进度表",
            "3": "预成交周计划表",
            "4": "项目回款表",
            "5": "信用额度表"
        };
        $(".filterName").html(types[type + ""]);
        $(".item").addClass("none");
        $(".type_" + type).removeClass("none");

        var typeFunction = {
            "1": report.loadHtyjb,
            "2": report.loadXmjdb,
            "3": report.loadYcjzjhb,
            "4": report.loadXmhkb,
            "5": report.loadXyedb
        }
        typeFunction[type + ""]();

    },
    loadHtyjb: function () {
        var binding = Cookies.prototype.GetCookie('binding');
        var roleId = Cookies.prototype.GetCookie('roleId');
        companyExpression = ""; //"and u.company in ('长沙公司','岳阳公司','郴州公司','上海公司','杭州公司','天津公司','南京公司','合肥公司','阜阳公司','六安公司','广州公司','深圳公司')";
        var nowYear = new Date().getFullYear();

        expressions = "select g.team,g.xsrw2018 as xsrw,g.ssgs as com, a.hte,a.cjgs,nvl(a.xmcb,0) as xmcb,nvl(a.yjcj,0) as yjcj,nvl(a.q1,0) as q1,nvl(a.q2,0) as q2,nvl(a.q3,0) as q3,nvl(a.q4,0) as q4,a.umname,a.umtitle,a.company from gzxz g left join (SELECT nvl(sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " then o.yjpchte else null end,0)),0) as hte,nvl(sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " then 1 else 0 end,0)),0) as cjgs,nvl(sum(nvl(case when o.dqjd <> '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') then o.yjpchte else null end,0)),0) as xmcb,sum(nvl(case when o.dqjd in ('0-项目线索','1-项目立项','2-项目推进') and o.sfycjxm = '是' then o.yjpchte else null end,0)) as yjcj," +
            "sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (1,2,3) then o.yjpchte else null end,0)) as q1,sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (4,5,6) then o.yjpchte else null end,0)) as q2,sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (7,8,9) then o.yjpchte else null end,0)) as q3,sum(nvl(case when o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " and EXTRACT(MONTH FROM o.tjsj) in (10,11,12) then o.yjpchte else null end,0)) as q4," +
            "u.zjname as umname,u.company,u.zjtitle as umtitle from xmbb o left join contract c on o.xmbh11=c.xmbh11 and c.is_deleted <>'1' left join (select uzj.name as zjname,uzj.title as zjtitle,usub.name,usub.title,usub.company,usub.id,usub.role from (select * from ccuser where (title='总监' or title = '副总') and isusing='1' and is_deleted <>'1') uzj left join tp_sys_role r on uzj.role = r.parentrole_id left join ccuser usub on r.roleid = usub.role where usub.isusing='1' and usub.is_deleted <>'1' order by uzj.company,uzj.name) u on o.ownerid=u.id where o.is_deleted <>'1' and o.dqjd != '0-销项项目' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) group by u.zjname,u.company,u.zjtitle) a on g.ssgs = a.company and g.name = a.umname where g.is_deleted <>'1' and a.company is not null order by a.company,a.hte desc";
        // expressions = "select sum(o.yjpchte) from xmbb o left join (select uzj.name as zjname,uzj.title as zjtitle,usub.name,usub.title,usub.company,usub.id,usub.role from (select * from ccuser where (title='总监' or title = '副总') and isusing='1' and is_deleted <>'1') uzj left join tp_sys_role r on uzj.role = r.parentrole_id left join ccuser usub on r.roleid = usub.role where usub.isusing='1' and usub.is_deleted <>'1' order by uzj.company,uzj.name) u on o.ownerid=u.id where o.dqjd <> '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and o.is_deleted <>'1' and o.dqjd != '0-销项项目' and u.company = '六安公司' and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";
        // expressions = "SELECT o.yjpchte,c.pchte,"+
        // "u.zjname as umname,u.company,u.zjtitle as umtitle,u.name,u.title from xmbb o left join contract c on o.xmbh11=c.xmbh11 and c.is_deleted <>'1' left join (select uzj.name as zjname,uzj.title as zjtitle,usub.name,usub.title,usub.company,usub.id,usub.role from (select * from ccuser where (title='总监' or title = '副总') and isusing='1' and is_deleted <>'1') uzj left join tp_sys_role r on uzj.role = r.parentrole_id left join ccuser usub on r.roleid = usub.role where usub.isusing='1' and usub.is_deleted <>'1' order by uzj.company,uzj.name) u on o.ownerid=u.id where o.is_deleted <>'1' and o.dqjd != '0-销项项目' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) and u.company = '六安公司' and o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + "";
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
                            var sumHte = 0;
                            var sumCjgs = 0;
                            var sumGap = 0;
                            var sumCb = 0;
                            var sumYj = 0;
                            var sumQ1 = 0;
                            var sumQ2 = 0;
                            var sumQ3 = 0;
                            var sumQ4 = 0;
                            for (var i = 0; i < data.data.length; i++) {
                                var v = data.data[i];
                                html1 += "<tr>";
                                html1 += "<td>" + v.company + "</td>";
                                html1 += "<td>" + v.team + "</td>";
                                html1 += "<td>" + v.umname + "</td>";
                                html1 += "</tr>";
                                html += "<tr>";
                                html += "<td>" + Common.prototype.NumFormat(v.xsrw) + "</td>";
                                sumXsrw += Number(v.xsrw);
                                html += "<td>" + Common.prototype.NumFormat(v.hte.toFixed(2)) + "</td>";
                                sumHte += Number(v.hte);
                                html += "<td>" + Common.prototype.NumFormat(v.cjgs) + "</td>";
                                sumCjgs += Number(v.cjgs);
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
                            html1 += "<td colspan='3'>汇总</td>";
                            html1 += "</tr>";
                            html += "<tr>";
                            html += "<td>" + Common.prototype.NumFormat(sumXsrw.toFixed(2)) + "</td>";
                            html += "<td>" + Common.prototype.NumFormat(sumHte.toFixed(2)) + "</td>";
                            html += "<td>" + Common.prototype.NumFormat(sumCjgs) + "</td>";
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
    loadXmjdb: function () {
        var binding = Cookies.prototype.GetCookie('binding');
        var roleId = Cookies.prototype.GetCookie('roleId');
        var company = $(".company").val();
        companyExpression = "and u.company = '" + company + "'"; //"and u.company in ('长沙公司','岳阳公司','郴州公司','上海公司','杭州公司','天津公司','南京公司','合肥公司','阜阳公司','六安公司','广州公司','深圳公司')";
        var nowYear = new Date().getFullYear();

        expressions = "select o.name as xmname,o.yjpchte,o.pcmj,o.bzdz,u.company as team,u.company as ssgs, '' as name from xmbb o left join ccuser u on o.ownerid=u.id where o.is_deleted <> '1' and o.dqjd !='0-销项项目' and u.role in (select roleid from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) " + companyExpression + " and o.dqjd not in('0-销项项目','3-项目签约') and o.sfycjxm = '是'" + //公司统计数据
            " union SELECT o.name as xmname,o.yjpchte,o.pcmj,o.bzdz,g.team,g.ssgs,g.name from xmbb o left join (select uzj.name as zjname,uzj.title as zjtitle,usub.name,usub.title,usub.company,usub.id,usub.role from (select * from ccuser where (title='总监' or title = '副总') and isusing='1' and is_deleted <>'1') uzj left join tp_sys_role r on uzj.role = r.parentrole_id left join ccuser usub on r.roleid = usub.role where usub.isusing='1' and usub.is_deleted <>'1' order by uzj.company,uzj.name) u on o.ownerid=u.id full join gzxz g on u.company = g.ssgs and g.is_deleted <>'1' and u.zjname = g.name where o.is_deleted <> '1' and g.id is not null and o.dqjd !='0-销项项目' and u.role in (select roleid from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) " + companyExpression + " and o.dqjd not in('0-销项项目','3-项目签约') and o.sfycjxm = '是' " + //+ " and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + "";          
            " union select o.name as xmname,o.yjpchte,o.pcmj, '14.PC采购合同签订成交' as bzdz,g.team,g.ssgs,g.name from xmbb o left join (select uzj.name as zjname,uzj.title as zjtitle,usub.name,usub.title,usub.company,usub.id,usub.role from (select * from ccuser where (title='总监' or title = '副总') and isusing='1' and is_deleted <>'1') uzj left join tp_sys_role r on uzj.role = r.parentrole_id left join ccuser usub on r.roleid = usub.role where usub.isusing='1' and usub.is_deleted <>'1' order by uzj.company,uzj.name) u on o.ownerid=u.id left join gzxz g on u.company = g.ssgs and g.is_deleted <>'1' and u.zjname = g.name where o.is_deleted <> '1' and g.id is not null and o.dqjd !='0-销项项目' and u.role in (select roleid from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) " + companyExpression + " and o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " " +
            " union select o.name as xmname,o.yjpchte,o.pcmj, '14.PC采购合同签订成交' as bzdz,u.company as team,u.company as ssgs,'' as name from xmbb o left join ccuser u on o.ownerid=u.id where o.is_deleted <> '1' and o.dqjd !='0-销项项目' and u.role in (select roleid from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) " + companyExpression + " and o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + " " +
            " union select o.name as xmname,o.yjpchte,o.pcmj, '15.交付前：开工令、工地库、收验扫码人确认' as bzdz,g.team,g.ssgs,g.name from xmbb o left join fwht f on o.xmbh11 = f.xmbh11 left join (select uzj.name as zjname,uzj.title as zjtitle,usub.name,usub.title,usub.company,usub.id,usub.role from (select * from ccuser where (title='总监' or title = '副总') and isusing='1' and is_deleted <>'1') uzj left join tp_sys_role r on uzj.role = r.parentrole_id left join ccuser usub on r.roleid = usub.role where usub.isusing='1' and usub.is_deleted <>'1' order by uzj.company,uzj.name) u on o.ownerid=u.id left join gzxz g on u.company = g.ssgs and g.is_deleted <>'1' and u.zjname = g.name where o.is_deleted <> '1' and g.id is not null and f.id is not null and o.dqjd !='0-销项项目' and u.role in (select roleid from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) " + companyExpression + " and f.fwjd = '交付前' and f.is_deleted <> '1' " +
            " union select o.name as xmname,o.yjpchte,o.pcmj, '16.交付中：现场协调、异常反馈、客户例会' as bzdz,g.team,g.ssgs,g.name from xmbb o left join fwht f on o.xmbh11 = f.xmbh11 left join (select uzj.name as zjname,uzj.title as zjtitle,usub.name,usub.title,usub.company,usub.id,usub.role from (select * from ccuser where (title='总监' or title = '副总') and isusing='1' and is_deleted <>'1') uzj left join tp_sys_role r on uzj.role = r.parentrole_id left join ccuser usub on r.roleid = usub.role where usub.isusing='1' and usub.is_deleted <>'1' order by uzj.company,uzj.name) u on o.ownerid=u.id left join gzxz g on u.company = g.ssgs and g.is_deleted <>'1' and u.zjname = g.name where o.is_deleted <> '1' and g.id is not null and f.id is not null and o.dqjd !='0-销项项目' and u.role in (select roleid from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) " + companyExpression + " and f.fwjd = '交付中' and f.is_deleted <> '1' " +
            " union select o.name as xmname,o.yjpchte,o.pcmj, '17.交付后：物料回收、关系维护、完工报告' as bzdz,g.team,g.ssgs,g.name from xmbb o left join fwht f on o.xmbh11 = f.xmbh11 left join (select uzj.name as zjname,uzj.title as zjtitle,usub.name,usub.title,usub.company,usub.id,usub.role from (select * from ccuser where (title='总监' or title = '副总') and isusing='1' and is_deleted <>'1') uzj left join tp_sys_role r on uzj.role = r.parentrole_id left join ccuser usub on r.roleid = usub.role where usub.isusing='1' and usub.is_deleted <>'1' order by uzj.company,uzj.name) u on o.ownerid=u.id left join gzxz g on u.company = g.ssgs and g.is_deleted <>'1' and u.zjname = g.name where o.is_deleted <> '1' and g.id is not null and f.id is not null and o.dqjd !='0-销项项目' and u.role in (select roleid from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) " + companyExpression + " and f.fwjd = '交付完结' and f.is_deleted <> '1' " +
            " union select o.name as xmname,o.yjpchte,o.pcmj, '15.交付前：开工令、工地库、收验扫码人确认' as bzdz,u.company as team,u.company as ssgs,'' as name from xmbb o left join fwht f on o.xmbh11 = f.xmbh11 left join ccuser u on o.ownerid=u.id where o.is_deleted <> '1' and f.id is not null and o.dqjd !='0-销项项目' and u.role in (select roleid from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) " + companyExpression + " and f.fwjd = '交付前' and f.is_deleted <> '1' " +
            " union select o.name as xmname,o.yjpchte,o.pcmj, '16.交付中：现场协调、异常反馈、客户例会' as bzdz,u.company as team,u.company as ssgs,'' as name from xmbb o left join fwht f on o.xmbh11 = f.xmbh11 left join ccuser u on o.ownerid=u.id where o.is_deleted <> '1' and f.id is not null and o.dqjd !='0-销项项目' and u.role in (select roleid from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) " + companyExpression + " and f.fwjd = '交付中' and f.is_deleted <> '1' " +
            " union select o.name as xmname,o.yjpchte,o.pcmj, '17.交付后：物料回收、关系维护、完工报告' as bzdz,u.company as team,u.company as ssgs,'' as name from xmbb o left join fwht f on o.xmbh11 = f.xmbh11 left join ccuser u on o.ownerid=u.id where o.is_deleted <> '1' and f.id is not null and o.dqjd !='0-销项项目' and u.role in (select roleid from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) " + companyExpression + " and f.fwjd = '交付完结' and f.is_deleted <> '1' ";

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
                            var a = data.data;
                            var reducer = function (v, i) {
                                if (!varIsNull(i.team)) {
                                    for (var k = 1; k <= 17; k++) {
                                        if (varIsNull(v[k][i.team + (varIsNull(i.name) ? "" : "(" + i.name + ")")])) {
                                            v[k][i.team + (varIsNull(i.name) ? "" : "(" + i.name + ")")] = {
                                                "项目数": 0,
                                                "合同额": 0,
                                                "PC量": 0
                                            }
                                        }
                                    }
                                }
                                if (!varIsNull(i.bzdz)) {
                                    // v[report.getBzdzKey(i.bzdz)][company]["项目数"] += 1;
                                    // v[report.getBzdzKey(i.bzdz)][company]["合同额"] += Number(i.yjpchte);
                                    // v[report.getBzdzKey(i.bzdz)][company]["PC量"] += Number(i.pcmj);
                                    if (varIsNull(v[report.getBzdzKey(i.bzdz)][i.team + (varIsNull(i.name) ? "" : "(" + i.name + ")")])) {
                                        v[report.getBzdzKey(i.bzdz)][i.team + (varIsNull(i.name) ? "" : "(" + i.name + ")")] = {
                                            "项目数": 1,
                                            "合同额": Number(i.yjpchte),
                                            "PC量": Number(i.pcmj)
                                        };
                                    } else {
                                        v[report.getBzdzKey(i.bzdz)][i.team + (varIsNull(i.name) ? "" : "(" + i.name + ")")]["项目数"] += 1;
                                        v[report.getBzdzKey(i.bzdz)][i.team + (varIsNull(i.name) ? "" : "(" + i.name + ")")]["合同额"] += Number(i.yjpchte);
                                        v[report.getBzdzKey(i.bzdz)][i.team + (varIsNull(i.name) ? "" : "(" + i.name + ")")]["PC量"] += Number(i.pcmj);
                                    }
                                }
                                return v;
                            };

                            var initValue = {};
                            for (var k = 1; k <= 17; k++) {
                                initValue[k] = {};
                                initValue[k][company] = {
                                    "项目数": 0,
                                    "合同额": 0,
                                    "PC量": 0
                                }
                            }
                            var table = a.reduce(reducer, initValue);

                            var html = "<thead><tr>";
                            var head2 = "<tr>";
                            Object.keys(table["1"]).forEach(function (value, index) {
                                html += "<th class='th_blue' colspan='3'>" + value + "</th>";
                                head2 += "<th class='th_blue'>项目数</th>";
                                head2 += "<th class='th_blue'>合同额</th>";
                                head2 += "<th class='th_blue'>PC量</th>";
                            });
                            html += "</tr>";
                            head2 += "</tr>";
                            html += head2;
                            html += "</thead>";
                            html += "<tbody class='table_yeji_content'>";

                            for (var k = 1; k <= 17; k++) {
                                html += "<tr>";
                                Object.keys(table["1"]).forEach(function (value, index) {
                                    html += "<td class=''>" + table[k][value]["项目数"] + "</td>";
                                    html += "<td class=''>" + common.NumFormat(table[k][value]["合同额"].toFixed(2)) + "</td>";
                                    html += "<td class=''>" + table[k][value]["PC量"].toFixed(2) + "</td>";
                                });
                                html += "</tr>";
                                if (k == 14) {
                                    html += "<tr>";
                                    Object.keys(table["1"]).forEach(function (value, index) {
                                        html += "<td class=''>" + report.getTotal(table, 1, 14, value, "项目数") + "</td>";
                                        html += "<td class=''>" + common.NumFormat(report.getTotal(table, 1, 14, value, "合同额").toFixed(2)) + "</td>";
                                        html += "<td class=''>" + report.getTotal(table, 1, 14, value, "PC量").toFixed(2) + "</td>";
                                    });
                                    html += "</tr>";
                                }
                                if (k == 17) {
                                    html += "<tr>";
                                    Object.keys(table["1"]).forEach(function (value, index) {
                                        html += "<td class=''>" + report.getTotal(table, 15, 17, value, "项目数") + "</td>";
                                        html += "<td class=''>" + common.NumFormat(report.getTotal(table, 15, 17, value, "合同额").toFixed(2)) + "</td>";
                                        html += "<td class=''>" + report.getTotal(table, 15, 17, value, "PC量").toFixed(2) + "</td>";
                                    });
                                    html += "</tr>";
                                }
                            }
                            html += "</tbody>";
                            $("#type2Data").html(html);
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
    loadYcjzjhb: function () {
        // 构造表头
        var months = {
            "01": "Jan",
            "02": "Feb",
            "03": "Mar",
            "04": "Apr",
            "05": "May",
            "06": "Jun",
            "07": "Jul",
            "08": "Aug",
            "09": "Sep",
            "10": "Oct",
            "11": "Nov",
            "12": "Dec",

        }

    var role = Cookies.prototype.GetCookie('role');
    var userCompany = Cookies.prototype.GetCookie('company');
    var showAll = false;
    if (role == '副总' || userCompany == '远大大数据市场管理') {
        showAll = true;
    }else{
        showAll = false;
    }

        var now = new Date()
        var year = now.getFullYear(); //年
        //var month = now.getMonth() + 7; //月 +6个月  因为js里month从0开始，所以要加1
        var html = "<tr>";
        var html_week = "<tr>";
        var beginWeek = 1;
        var beginYear = year;
        var endWeek = 1;
        var endYear = year;
        var endWeek1 = 1;
        for (var i = 1; i < 7; i++) {
            var month = now.getMonth() + i;
            if (month > 12) {
                //break;
                if (month == 13) {
                    year++;
                }
                month -= 12;
            }
            var weeks = common.weekInMonth(year, month);
            if (month < 10) {
                month = "0" + month;
            }
            var text = months[month];

            html += "<th class='th_blue' colspan='" + weeks.length + "'>" + text + "(" + year + ")</th>";
            weeks.forEach(function (value, index) {
                if (i == 1 && index == 0) {
                    beginWeek = value;
                    beginYear = year;
                }
                if (beginYear == year) {
                    endWeek1 = value;
                }
                endWeek = value;
                endYear = year;
                html_week += "<th class='th_blue'>" + value + "周</th>";
            });

        }
        html += "<th class='th_blue' rowspan='2'>SUM</th>";
        html += "</tr>";
        html_week += "</tr>";
        $(".months").html(html + html_week);
        //end表头

        //获取数据
        var binding = Cookies.prototype.GetCookie('binding');
        var roleId = Cookies.prototype.GetCookie('roleId');
        companyExpression = "and u.company in ('长沙公司','岳阳公司','郴州公司','上海公司','杭州公司','天津公司','南京公司','合肥公司','阜阳公司','六安公司','广州公司','深圳公司')";
        // companyExpression = "and u.company = '深圳公司' ";
        var nowYear = new Date().getFullYear();

        expressions = "select g.team,g.xsrw2018 as xsrw,g.ssgs as com,g.name,a.hte,a.ycjyf,a.ycjzs,a.umname,a.umtitle,a.company from gzxz g left join (SELECT sum(o.yjpchte) as hte,o.ycjyf,o.ycjzs," +
            "u.zjname as umname,u.company,u.zjtitle as umtitle from xmbb o left join (select uzj.name as zjname,uzj.title as zjtitle,usub.name,usub.title,usub.company,usub.id,usub.role " +
            "from (select * from ccuser where (title='总监' or title = '副总') and isusing='1' and is_deleted <>'1') uzj left join tp_sys_role r on uzj.role = r.parentrole_id left join ccuser usub on r.roleid = usub.role where usub.isusing='1' and usub.is_deleted <>'1' order by uzj.company,uzj.name) u on o.ownerid=u.id " +
            "where o.is_deleted <>'1' and o.dqjd != '0-销项项目' and o.dqjd != '3-项目签约' and o.sfycjxm = '是' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) group by u.zjname,u.company,u.zjtitle,o.ycjyf,o.ycjzs) a on g.ssgs = a.company and g.name = a.umname where g.is_deleted <>'1' order by g.ssgs,g.name,a.ycjyf,a.ycjzs,a.hte desc";

        // expressions = "SELECT sum(o.yjpchte) as hte,o.ycjyf,o.ycjzs," +
        // "u.zjname as umname,u.company,u.zjtitle as umtitle from xmbb o left join (select uzj.name as zjname,uzj.title as zjtitle,usub.name,usub.title,usub.company,usub.id,usub.role " +
        // "from (select * from ccuser where (title='总监' or title = '副总') and isusing='1' and is_deleted <>'1') uzj left join tp_sys_role r on uzj.role = r.parentrole_id left join ccuser usub on r.roleid = usub.role where usub.isusing='1' and usub.is_deleted <>'1' order by uzj.company,uzj.name) u on o.ownerid=u.id " +
        // "where o.is_deleted <>'1' and o.dqjd != '0-销项项目' and o.dqjd != '3-项目签约' and o.sfycjxm = '是' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) group by u.zjname,u.company,u.zjtitle,o.ycjyf,o.ycjzs";
        // expressions = "select * from ccuser where (title='总监' or title = '副总') and isusing='1' and is_deleted <>'1'";
        // expressions = "select * from gzxz g where g.ssgs = '深圳公司'";
        // expressions = "select title from ccuser where name = '饶勇为'";

        // expressions = "SELECT o.yjpchte,c.pchte,"+
        // "u.zjname as umname,u.company,u.zjtitle as umtitle,u.name,u.title from xmbb o left join contract c on o.xmbh11=c.xmbh11 and c.is_deleted <>'1' left join (select uzj.name as zjname,uzj.title as zjtitle,usub.name,usub.title,usub.company,usub.id,usub.role from (select * from ccuser where (title='总监' or title = '副总') and isusing='1' and is_deleted <>'1') uzj left join tp_sys_role r on uzj.role = r.parentrole_id left join ccuser usub on r.roleid = usub.role where usub.isusing='1' and usub.is_deleted <>'1' order by uzj.company,uzj.name) u on o.ownerid=u.id where o.is_deleted <>'1' and o.dqjd != '0-销项项目' " + companyExpression + " and u.role in (select roleid  from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) and u.company = '六安公司' and o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and EXTRACT(YEAR FROM o.tjsj) = " + nowYear + "";
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
                            //转换表结构
                            var reducer = function (v, i) {
                                if(!showAll && i.umname == null){
                                    return v;
                                }
                                if (varIsNull(v[i.com + i.team + i.name])) {
                                    v[i.com + i.team + i.name] = {};
                                    if (common.startWith(i.ycjyf, beginYear)) {
                                        v[i.com + i.team + i.name][beginYear] = {};
                                        v[i.com + i.team + i.name]["公司"] = i.com;
                                        v[i.com + i.team + i.name]["部门"] = i.team;
                                        v[i.com + i.team + i.name]["总监"] = i.name;
                                        for (var k = beginWeek; k <= endWeek1; k++) {
                                            if (varIsNull(v[i.com + i.team + i.name][beginYear][k])) {
                                                if (i.ycjzs == (k + "周")) {
                                                    v[i.com + i.team + i.name][beginYear][k] = Number(i.hte);
                                                } else {
                                                    v[i.com + i.team + i.name][beginYear][k] = 0;
                                                }

                                            } else {
                                                if (i.ycjzs == (k + "周")) {
                                                    v[i.com + i.team + i.name][beginYear][k] += Number(i.hte);
                                                }
                                            }

                                        }
                                    } else if (common.startWith(i.ycjyf, endYear)) {
                                        v[i.com + i.team + i.name][endYear] = {};
                                        v[i.com + i.team + i.name]["公司"] = i.com;
                                        v[i.com + i.team + i.name]["部门"] = i.team;
                                        v[i.com + i.team + i.name]["总监"] = i.name;
                                        for (var k = 1; k <= endWeek; k++) {
                                            if (varIsNull(v[i.com + i.team + i.name][endYear][k])) {
                                                if (i.ycjzs == (k + "周")) {
                                                    v[i.com + i.team + i.name][endYear][k] = Number(i.hte);
                                                } else {
                                                    v[i.com + i.team + i.name][endYear][k] = 0;
                                                }

                                            } else {
                                                if (i.ycjzs == (k + "周")) {
                                                    v[i.com + i.team + i.name][endYear][k] += Number(i.hte);
                                                }
                                            }
                                        }
                                    } else {
                                        // v[i.com + i.team + i.name][beginYear] = {};
                                        v[i.com + i.team + i.name]["公司"] = i.com;
                                        v[i.com + i.team + i.name]["部门"] = i.team;
                                        v[i.com + i.team + i.name]["总监"] = i.name;
                                    }
                                } else {
                                    var y = i.ycjyf.substr(0, 4);
                                    var w = varIsNull(i.ycjzs) ? "" : i.ycjzs.replace("周", "");
                                    if (!varIsNull(w)) {
                                        v[i.com + i.team + i.name][y][w] += Number(i.hte);
                                    }
                                }
                                return v;
                            };
                            var initValue = {};
                            var table = data.data.reduce(reducer, initValue);
                            //拼接html展示表
                            var html_c = "";
                            var html = "";
                            for (var key in table) {
                                var value = table[key];                                
                                html_c += "<tr>";
                                html_c += "<td>" + value["公司"] + "</td>";
                                html_c += "<td>" + value["部门"] + "</td>";
                                html_c += "<td>" + value["总监"] + "</td>";
                                html_c += "</tr>";

                                html += "<tr>";
                                var sum = 0;
                                if (!varIsNull(value[beginYear])) {
                                    for (var k = beginWeek; k <= endWeek1; k++) {
                                        html += "<td>" + value[beginYear][k] + "</td>";
                                        sum += Number(value[beginYear][k]);
                                    }
                                } else {
                                    for (var k = beginWeek; k <= endWeek1; k++) {
                                        html += "<td>" + 0 + "</td>";
                                    }
                                }
                                if (!varIsNull(value[endYear])) {
                                    for (var k = 1; k <= endWeek; k++) {
                                        html += "<td>" + value[endYear][k] + "</td>";
                                        sum += Number(value[endYear][k]);
                                    }
                                } else {
                                    for (var k = 1; k <= endWeek; k++) {
                                        html += "<td>" + 0 + "</td>";
                                    }
                                }
                                html += "<td>" + common.NumFormat(sum.toFixed(1)) + "</td>";
                                html += "</tr>";
                            };
                            $(".weeksHead").html(html_c);
                            $(".weeksData").html(html);
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
    loadXmhkb: function () {

    },
    loadXyedb: function () {

    },
    getBzdzKey: function (bzdz) {
        var index = bzdz.indexOf('.');
        if (index >= 0) {
            return bzdz.substr(0, index);
        } else {
            return "0";
        }
    },
    getTotal: function (table, start, end, key, key1) {
        var sum = 0;
        for (var i = start; i <= end; i++) {
            sum += table[i][key][key1];
        }
        return sum;
    }
}

window.report = new Report();