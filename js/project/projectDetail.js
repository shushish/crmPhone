$(document).ready(function () {
    Common.prototype.checkLoginStatu();
});

$(function () {
    var id = Common.prototype.GetQueryString("id");
    var xmbh = Common.prototype.GetQueryString("xmbh");
    $(".approval").on("click", pd.submitApproval);
    $(".projectSurvey-tit").find("a").each(function () {
        $(this).attr("href", $(this).attr("href").replace("[id]", id));
        $(this).attr("href", $(this).attr("href").replace("[xmbh]", xmbh));
    });
    $(".back").on("click", Common.prototype.Back);
    pd.loadData();
});

var approvalId = "";

var ProjectDetail = function () {};
ProjectDetail.prototype = {
    loadData: function () {
        var binding = Cookies.prototype.GetCookie('binding');
        // var userId = Cookies.prototype.GetCookie('userId');
        // var roleId = Cookies.prototype.GetCookie('roleId');
        // var id = Common.prototype.GetQueryString("id");
        var xmbh = Common.prototype.GetQueryString("xmbh");

        expressions = "select ac.name khmcccname,ac.recordtype as khrecordtype,(select count(*) from contract where (khmc=ac.id or kfs=ac.id) and dqjd='3-项目签约' and is_deleted<>'1') as hzcs,ac1.name kfsccname,ac2.name jzsccname,ac3.name sjyccname,u.company sjgsg,t.faspzt tfaspzt,c.htsh as cspzt,x.*,t.name t_name," +
            "t.id t_id,t.xmdz t_xmdz,t.xmlx t_xmlx,t.ysjl t_ysjl,t.yjqyyf t_yjqyyf,t.tzfa t_tzfa,t.cglx t_cglx,t.jfjd t_jfjd,t.cplx t_cplx,t.mj t_mj,t.yjpchte t_yjpchte,t.pcmj t_pcmj" +
            ",t.beizhu t_beizhu,t.sfsypkpm t_sfsypkpm,u2.name t_createbyname,t.createdate t_createdate,t.jzds t_jzds,t.cs t_cs,t.cd t_cd,t.cangs t_cangs,u.name ownername" +
            ",u1.name t_lastmodifybyname,t.lastmodifydate t_lastmodifydate,u.title title,c.id c_id,c.jzds c_jzds,c.shrxm c_shrxm,c.shrdh c_shrdh,c.smqsr c_smqsr,c.qsrdh c_qsrdh,c.scgs c_scgs" +
            ",c.name c_xmmc,c.ysjl c_ysjl,c.xmlx c_xmlx,c.cglx c_cglx,c.xmszd c_xmszd,c.dqjd c_dqjd,c.shsj c_shsj,c.sfqdht c_sfqdht,c.qdrq c_qdrq" +
            ",c.htbh c_htbh,c.zbrq c_zbrq,c.htlx c_htlx,c.htzt c_htzt,c.sfhgdk c_sfhgdk,c.sfhssy c_sfhssy,c.yfk c_yfk,c.jdk c_jdk,c.ysfk c_ysfk,c.jsk c_jsk" +
            ",c.zbj c_zbj,c.qdyf c_qdyf,c.htksrq c_htksrq,c.ghkssj c_ghkssj, c.htjsrq c_htjsrq,c.htjgsj c_htjgsj,c.je c_je,c.pchte c_pchte,c.cplx c_cplx,u.employeenum ygbh" +
            ",c.htsfbhyf c_htsfbhyf,c.pchte/c.pcmianji as c_thdj,c.detail c_detail,c.mj c_mj,c.pcmianji c_pcmianji,c.ds c_ds,c.cs c_cs,c.cd c_cd,c.cangs c_cangs,c.beizhu c_beizhu" +
            " from xmbb x left join xmfa t on x.xmbh11 = t.xmbh11 left join contract c on x.xmbh11 = c.xmbh11 left join Account ac on x.khmc = ac.id " +
            "left join Account ac1 on x.kfs = ac1.id left join Account ac2 on x.jzs = ac2.id left join Account ac3 on x.sjy = ac3.id " +
            "left join ccuser u on x.ownerid = u.id left join ccuser u1 on t.lastmodifybyid = u1.id left join ccuser u2 on t.createbyid = u2.id where x.xmbh11 = '" + xmbh + "' and NVL(x.is_deleted, '0') <> '1' and NVL(t.is_deleted,'0') <> '1' and NVL(c.is_deleted,'0') <> '1' ";

        var params = "serviceName=cqlQuery&objectApiName=xmbb&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding

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
                            if (pro.dqjd == "3-项目签约") {
                                approvalId = pro.c_id;
                                pd.writeXmqyData(pro);
                            } else if (pro.dqjd == "2-项目推进") {
                                approvalId = pro.t_id;
                                pd.writeXmtjData(pro);
                            } else if (pro.dqjd != "0-销项项目") {
                                approvalId = pro.id;
                                pd.writeXmlxData(pro);
                            } else {}
                            //txcs = pro.txcs;
                            pd.updateTxcs(pro.txcs);
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
    writeXmlxData: function (pro) {
        $("#xmbb_show").removeClass("none");
        $("#xmfa_show").addClass("none");
        $("#contract_show").addClass("none");
        if (pro.dqjd == "1-项目立项") {
            pd.loadxmhx(pro, "");
        }

        $("#khmc").html(varIsNull(pro.khmcccname) ? "" : "<a href='/crm/customer/customerrecord.html?id=" + pro.khmc + "'>" + pro.khmcccname + "</a>");
        $("#kff").html(varIsNull(pro.kfsccname) ? "" : "<a href='/crm/customer/customerrecord.html?id=" + pro.kfs + "'>" + pro.kfsccname + "</a>");
        $("#jzs").html(varIsNull(pro.jzsccname) ? "" : "<a href='/crm/customer/customerrecord.html?id=" + pro.jzs + "'>" + pro.jzsccname + "</a>");
        $("#sjy").html(varIsNull(pro.sjyccname) ? "" : "<a href='/crm/customer/customerrecord.html?id=" + pro.sjy + "'>" + pro.sjyccname + "</a>");
        $("#tjsj").html(pro.tjsj);
        $("#bjxtj").html(pro.bjxtj == true ? "是" : "否");
        $("#xmmc").html(pro.name);
        $("#xmbh").html(pro.xmbh11);
        $("#xmszs").html(pro.szs);
        $("#xmszshi").html(pro.szsjqy);
        $("#xmdz").html(pro.xmdz);
        $("#xmlx").html(pro.xmlx);
        $("#xmgs").html(pro.xmgs);
        $("#shengjgs").html(pro.sjgsg);
        $("#ysjl").html(pro.ysjl);
        $("#dqjd").html(pro.dqjd);
        $("#xmcgl").html(pro.xmcgl);
        $("#sjgs").html(pro.shsj);
        $("#tdndrq").html(pro.yjtbsj);
        $("#yxjbl").html(pro.yxjbl);
        $("#yjkgsj").html(pro.yjkgsj);
        $("#yjqyyf").html(pro.yjqyyf);
        $("#cglx").html(pro.khcglx);
        $("#khcbms").html(pro.cbms);
        $("#jfjd").html(pro.jfjd);
        $("#yzjyqksm").html(pro.yzjyqksm);
        $("#cplx").html(pro.cplx);
        $("#zghjzmj").html(pro.zpmj);
        $("#zpjzmj").html(pro.mj);
        $("#yjpchte").html(pro.yjpchte);
        $("#pcl").html(pro.pcmj);
        $("#ds").html(pro.jzds);
        $("#cs").html(pro.cs);
        $("#cd").html(pro.cd);
        $("#cangs").html(pro.cangs);
        $("#bz").html(pro.bz);
        $("#txcs").html(pro.txcs);

        if (pro.xmlx == "管廊") {
            $(".cplx").addClass("none");
            $(".zghjzmj").addClass("none");
            $(".zpjzmj").addClass("none");
            $(".ds").addClass("none");
            $(".cs").addClass("none");
        } else {
            $(".cd").addClass("none");
            $(".cangs").addClass("none");
        }

        if (pro.spztg == '审批通过') {
            $('.approval').off('click');
            $('.approval').addClass('enable');
            $('.approval').html(pro.spztg);
        }
    },
    writeXmtjData: function (pro) {
        $("#xmbb_show").addClass("none");
        $("#xmfa_show").removeClass("none");
        $("#contract_show").addClass("none");

        $("#xmfa_khmc").html(varIsNull(pro.khmcccname) ? "" : "<a href='/crm/customer/customerrecord.html?id=" + pro.khmc + "'>" + pro.khmcccname + "</a>");
        $("#xmfa_kff").html(varIsNull(pro.kfsccname) ? "" : "<a href='/crm/customer/customerrecord.html?id=" + pro.kfs + "'>" + pro.kfsccname + "</a>");
        $("#xmfa_jzs").html(varIsNull(pro.jzsccname) ? "" : "<a href='/crm/customer/customerrecord.html?id=" + pro.jzs + "'>" + pro.jzsccname + "</a>");
        $("#xmfa_sjy").html(varIsNull(pro.sjyccname) ? "" : "<a href='/crm/customer/customerrecord.html?id=" + pro.sjy + "'>" + pro.sjyccname + "</a>");

        $("#xmfa_xmmc").html(pro.t_name);
        $("#xmfa_xmbh").html(pro.xmbh11);
        $("#xmfa_xmdz").html(pro.t_xmdz);
        $("#xmfa_xmlx").html(pro.t_xmlx);
        $("#xmfa_ysjl").html(pro.t_ysjl);
        $("#xmfa_yjqyyf").html(pro.t_yjqyyf);
        $("#xmfa_tzfa").html(pro.t_tzfa);
        $("#xmfa_shengjgs").html(pro.sjgsg);
        $("#xmfa_cglx").html(pro.t_cglx);
        $("#xmfa_jfjd").html(pro.t_jfjd);
        $("#xmfa_cplx").html(pro.t_cplx);
        $("#xmfa_mj").html(pro.t_mj);
        $("#xmfa_yjpchte").html(pro.t_yjpchte);
        $("#xmfa_pcl").html(pro.t_pcmj);
        $("#xmfa_ds").html(pro.t_jzds);
        $("#xmfa_cs").html(pro.t_cs);
        $("#xmfa_yjpcdj").html((pro.t_yjpchte / pro.t_pcmj).toFixed(2));
        $("#xmfa_cd").html(pro.t_cd);
        $("#xmfa_cangs").html(pro.t_cangs);
        $("#xmfa_syr").html(pro.ownername);
        $("#xmfa_zhxgr").html(pro.t_lastmodifybyname + "," + pro.t_lastmodifydate);
        $("#xmfa_scryzw").html(pro.title);
        $("#xmfa_bz").html(pro.t_beizhu);
        $("#xmfa_sfsypkpmjm").html(pro.t_sfsypkpm);
        $("#xmfa_cjr").html(pro.t_createbyname + "," + pro.t_createdate);

        if (pro.tfaspzt == '审批通过') {
            $('.approval').off('click');
            $('.approval').addClass('enable');
            $('.approval').html(pro.tfaspzt);
        }
    },
    writeXmqyData: function (pro) {
        $("#xmbb_show").addClass("none");
        $("#xmfa_show").addClass("none");
        $("#contract_show").removeClass("none");

        pd.loadxmhx(pro, "contract_");

        $("#contract_khmc").html(varIsNull(pro.khmcccname) ? "" : "<a href='/crm/customer/customerrecord.html?id=" + pro.khmc + "'>" + pro.khmcccname + "</a>");
        $("#contract_kff").html(varIsNull(pro.kfsccname) ? "" : "<a href='/crm/customer/customerrecord.html?id=" + pro.kfs + "'>" + pro.kfsccname + "</a>");
        $("#contract_jzs").html(varIsNull(pro.jzsccname) ? "" : "<a href='/crm/customer/customerrecord.html?id=" + pro.jzs + "'>" + pro.jzsccname + "</a>");
        $("#contract_sjy").html(varIsNull(pro.sjyccname) ? "" : "<a href='/crm/customer/customerrecord.html?id=" + pro.sjy + "'>" + pro.sjyccname + "</a>");
        $("#contract_jzds").html(pro.c_jzds);
        $("#contract_khfzrxm").html(pro.c_shrxm);
        $("#contract_khfzrdh").html(varIsNull(pro.c_shrdh) ? "" : "<a href='tel:" + pro.c_shrdh + "'>" + pro.c_shrdh + "</a>");
        $("#contract_sqsmqsr").html(pro.c_smqsr);
        $("#contract_qsrdh").html(varIsNull(pro.c_qsrdh) ? "" : "<a href='tel:" + pro.c_qsrdh + "'>" + pro.c_qsrdh + "</a>");
        $("#contract_xmbh").html(pro.xmbh11);
        $("#contract_scgc").html(pro.c_scgs);
        $("#contract_xmmc").html(pro.c_xmmc);
        $("#contract_ysjl").html(pro.c_ysjl);
        $("#contract_xmlx").html(pro.c_xmlx);
        $("#contract_cglx").html(pro.c_cglx);
        $("#contract_xmszd").html(pro.c_xmszd);
        $("#contract_dqjd").html(pro.c_dqjd);
        $("#contract_shsj").html(pro.c_shsj);
        $("#contract_ssgs").html(pro.sjgsg);
        $("#contract_sfqdht").html(pro.c_sfqdht);
        $("#contract_qyrq").html(pro.c_qdrq);
        $("#contract_htbh").html(pro.c_htbh);
        $("#contract_zbrq").html(pro.c_zbrq);
        $("#contract_htlx").html(pro.c_htlx);
        $("#contract_htzt").html(pro.c_htzt);
        $("#contract_htsfhgdk").html(pro.c_sfhgdk);
        $("#contract_htsfhsqsmr").html(pro.c_sfhssy);

        $("#contract_yfk").html(pro.c_yfk);
        $("#contract_jdk").html(pro.c_jdk);
        $("#contract_ysfk").html(pro.c_ysfk);
        $("#contract_jsk").html(pro.c_jsk);
        $("#contract_zbj").html(pro.c_zbj);
        $("#contract_zbjhsnx").html(pro.c_qdyf);

        $("#contract_yjkgsj").html(pro.c_htksrq);
        $("#contract_ghkssj").html(pro.c_ghkssj);
        $("#contract_yjdzsj").html(pro.c_htjsrq);
        $("#contract_htjgsj").html(pro.c_htjgsj);

        $("#contract_htje").html(pro.c_je);
        $("#contract_pchte").html(pro.c_pchte);
        $("#contract_cplx").html(pro.c_cplx);
        $("#contract_jgsfbhysfy").html(pro.c_htsfbhyf);
        $("#contract_htdj").html(pro.c_thdj);
        $("#contract_xxpcje").html(pro.c_detail);
        $("#contract_mj").html(pro.c_mj);
        $("#contract_pcl").html(pro.c_pcmianji);
        $("#contract_ds").html(pro.c_ds);
        $("#contract_cs").html(pro.c_cs);
        $("#contract_cd").html(pro.c_cd);
        $("#contract_cangs").html(pro.c_cangs);

        $("#contract_bz").html(pro.c_beizhu);
        $("#contract_ygbh").html(pro.ygbh);
        $("#contract_htsyr").html(pro.ownername);
        if (pro.cspzt == '已审核') {
            $('.approval').off('click');
            $('.approval').addClass('enable');
            $('.approval').html(pro.cspzt);
        }
    },
    loadxmhx: function (pro, prefix) {
        if (varIsNull(prefix)) {
            $(".xmhx").removeClass("none");
            $("#dfsjyj").html(pro.dfsjyj);
            $("#zbsjyj").html(pro.zbsjyj);
        }
        var khtype = "";
        if ("20185C6759C8A039WerZ" == pro.khrecordtype) {
            khtype = "战略客户";
        } else if ("2018DC93F85F79DibdML" == pro.khrecordtype) {
            khtype = "重点客户";
        } else if ("2018DAC38ED8228JIoaE" == pro.khrecordtype) {
            khtype = "普通客户";
        }
        if (khtype != "重点客户") {
            $("#" + prefix + "kh").addClass("redMark");
        }
        $("#" + prefix + "kh").html(khtype);
        if (pro.yjpchte < 1000) {
            $("#" + prefix + "je").addClass("redMark");
        }
        $("#" + prefix + "je").html(pro.yjpchte);
        // if(pro.hzcs > 0){
        //     //$("#hz").addClass("redMark");
        // }
        $("#" + prefix + "hz").html(pro.hzcs < 1 ? "首次" : ((pro.hzcs + 1) + "次"));

        if (parseFloat(pro.cbms == "EPC总承包" || (varIsNull(pro.yxjbl) ? 0 : pro.yxjbl.replace(/%/, ""))) > 10) {
            $("#" + prefix + "yx").addClass("redMark");
        }
        $("#" + prefix + "yx").html(pro.cbms == "EPC总承包" ? "EPC" : (varIsNull(pro.yxjbl) ? 0 : pro.yxjbl));
        if (pro.shsj != "参与设计") {
            $("#" + prefix + "sj").addClass("redMark");
        }
        $("#" + prefix + "sj").html(pro.shsj);



        if (prefix == "contract_") {
            //首付
            var yfk = varIsNull(pro.c_yfk) ? 0 : (Common.prototype.isContains(pro.c_yfk, "%") ? parseFloat(pro.c_yfk.replace(/%/, "")) / 100 : pro.c_yfk);
            if (yfk < 1) {
                yfk = yfk * 100;
            } //百分号，小数统一为百分数整数部分
            if (yfk < 20) {
                $("#contract_sf").addClass("redMark");
            }
            $("#contract_sf").html(pro.c_yfk);

            //进度
            var jdk = varIsNull(pro.c_jdk) ? 0 : (Common.prototype.isContains(pro.c_jdk, "%") ? parseFloat(pro.c_jdk.replace(/%/, "")) / 100 : pro.c_jdk);
            if (jdk < 1) {
                jdk = jdk * 100;
            }
            if (jdk < 85) {
                $("#contract_jd").addClass("redMark");
            }
            $("#contract_jd").html(pro.c_jdk);

            //封顶
            var ysfk = varIsNull(pro.c_ysfk) ? 0 : (Common.prototype.isContains(pro.c_ysfk, "%") ? parseFloat(pro.c_ysfk.replace(/%/, "")) / 100 : pro.c_ysfk);
            if (ysfk < 1) {
                ysfk = ysfk * 100;
            }
            if (ysfk < 90) {
                $("#contract_fd").addClass("redMark");
            }
            $("#contract_fd").html(pro.c_ysfk);

            //结算
            var jsk = varIsNull(pro.c_jsk) ? 0 : (Common.prototype.isContains(pro.c_jsk, "%") ? parseFloat(pro.c_jsk.replace(/%/, "")) / 100 : pro.c_jsk);
            if (jsk < 1) {
                jsk = jsk * 100;
            }
            if (jsk < 97) {
                $("#contract_js").addClass("redMark");
            }
            $("#contract_js").html(pro.c_jsk);

            var gdk = pro.c_sfhgdk;
            var sfhssy = pro.c_sfhssy;
            if (gdk != "是" || sfhssy != "是") {
                $("#contract_gdk").addClass("redMark");
            }
            $("#contract_gdk").html((gdk != "是" || sfhssy != "是") ? "不具备" : "具备");
        }
    },
    submitApproval: function () {
        var binding = Cookies.prototype.GetCookie('binding');
        // var userId = Cookies.prototype.GetCookie('userId');
        // var roleId = Cookies.prototype.GetCookie('roleId');
        var id = Common.prototype.GetQueryString("id");
        var xmbh = Common.prototype.GetQueryString("xmbh");
        var datas = {};
        if (varIsNull(approvalId)) {
            layer.msg("页面加载中，请稍后再试！");
            return false;
        }
        datas['relateId'] = approvalId;
        var params = "serviceName=submitForApproval&data=" + encodeURIComponent(JSON.stringify(datas)) + "&binding=" + binding
        var index = layer.load(1, {
            shade: false
        });
        $.ajax({
            type: "get",
            dataType: "json",
            url: url,
            data: params,
            success: function (data) {
                layer.close(index);
                if (data != "") {
                    if (data.result) {
                        //layer.msg("提交成功");
                    } else {
                        layer.msg(data.returnInfo);
                    }
                }

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //debugger;
                layer.close(index);
            }
        });
    },
    updateTxcs: function (txcs) {
        var data = "[{";
        var id = Common.prototype.GetQueryString("id");
        data += "\"id\":\"" + id + "\""; //项目Id

        data += ",\"txcs\":\"" + (Number(txcs) + 1) + "\"";

        data += "}]";

        var binding = Cookies.prototype.GetCookie('binding');
        // return;
        if (binding != null) {
            $.ajax({
                type: "post",
                dataType: "json",
                url: url,
                data: "serviceName=updateWithRoleRight&objectApiName=xmbb&data=" + encodeURIComponent(data) + "&binding=" + binding,
                success: function (data) {                    
                    if (data != "") {
                        if (data.result) {
                            
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

window.pd = new ProjectDetail();