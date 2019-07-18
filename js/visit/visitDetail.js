$(document).ready(function(){
    Common.prototype.checkLoginStatu();
});

$(function(){
    VisitDetail.prototype.loadVisit();
    $(".back").on("click", Common.prototype.Back);
});

var VisitDetail = function(){};

VisitDetail.prototype.loadVisit = function(){
    var binding = Cookies.prototype.GetCookie('binding');
    var userId = Cookies.prototype.GetCookie('userId');
    var id = Common.prototype.GetQueryString('id');
    var datas = "serviceName=cqueryWithRoleRight&objectApiName=khbf&expressions=" + encodeURIComponent("id='" + id + "'") + "&binding=" + binding;
    $.ajax({
        type: "get",
        dataType: "json",
        url: url,
        data: datas,
        success: function (data) {
            //客户拜访
            if (data != "") {
                if (data.result) {
                    if (data.data.length >= 0) {
                        var visit = data.data[0];
                        if(varIsNull(visit.bcbfsj) && !varIsNull(visit.plan1)){
                            $(".bf").addClass('none');
                            $("#xmmc").html(visit.xmmc1ccname);
                            var plan = "";
                            if(!varIsNull(visit.plan1)){
                                plan += "<div>1." + visit.plan1 + "</div>";
                            }
                            if(!varIsNull(visit.plan2)){
                                plan += "<div>2." + visit.plan2 + "</div>";
                            }
                            if(!varIsNull(visit.plan3)){
                                plan += "<div>3." + visit.plan3 + "</div>";
                            }
                            if(!varIsNull(visit.plan4)){
                                plan += "<div>4." + visit.plan4 + "</div>";
                            }
                            if(!varIsNull(visit.plan5)){
                                plan += "<div>5." + visit.plan5 + "</div>";
                            }
                            if(!varIsNull(visit.plan6)){
                                plan += "<div>6." + visit.plan6 + "</div>";
                            }
                            $('#jhsx').html(plan);
                        }else{
                            $(".jh").addClass('none');
                        }
                        $(".projectSurvey-mod").find("a").each(function() {
                            $(this).attr("href", $(this).attr("href").replace("[id]", visit.id));
                        });
                        $('#editorVisit').attr("data-id", visit.id);
                        $(".visitNum").html(visit.name);
                        var customerName = "<a href='/crm/customer/customerrecord.html?id="+visit.khmc+"'>"+visit.khmcccname+"</a>";
                        $("#customerName").html(customerName);
                        $("#visitNum").html(visit.name);
                        $("#visitDate").html(visit.bcbfsj);
                        $("#visitLocation").html(visit.bfaddress);
                        if(varIsNull(visit.lxrxm)){
                            $(".notice").css("display","block");
                            $(".noContact").css("display","block");
                            $(".withContact").css("display","none");
                            var contactPerson1 = "<a href='/crm/contact/contact.html?id="+visit.khname1+"'>"+visit.khname1ccname+"</a>";
                            $("#contactPerson1").html(contactPerson1);
                            $("#position1").html(visit.zhiwu1);
                            $("#role1").html(visit.role1);
                            $("#contactWay1").html(varIsNull(visit.tel1)?"":"<a href='tel:"+visit.tel1+"'>"+visit.tel1+"</a>");
                            var contactPerson2 = "<a href='/crm/contact/contact.html?id="+visit.khname2+"'>"+visit.khname2ccname+"</a>";
                            $("#contactPerson2").html(contactPerson2);
                            $("#position2").html(visit.zhiwu2);
                            $("#role2").html(visit.role2);
                            $("#contactWay2").html(varIsNull(visit.tel2)?"":"<a href='tel:"+visit.tel2+"'>"+visit.tel2+"</a>");
                        }
                        else
                        {
                            $(".noContact").css("display","none");
                            $(".withContact").css("display","block");
                            $("#contactName").html(visit.lxrxm);
                            $("#gender").html(visit.xb);
                            $("#contactWay").html(varIsNull(visit.lxfs)?"":"<a href='tel:"+visit.lxfs+"'>"+visit.lxfs+"</a>");
                            $("#age").html(visit.nl);
                            $("#position").html(visit.zw);
                            $("#getWx").html(visit.sfhqwx);
                            $("#attitude").html(visit.dwstd);
                            $("#projectRole").html(visit.js);
                            $("#hierarchy").html(visit.cj);
                            $("#maturity").html(visit.csd);
                            $("#appraise").html(visit.pj);
                            $("#visitOrNot").html(visit.sflwscg);
                        }
                        $("#visitPurpose").html(visit.bfmdnr);
                        $("#visitWay").html(visit.bfway);
                        $("#visitSummary").html(visit.bfjiyao);
                        $("#nextPlan").html(visit.nextjh);
                        var image = "";
                        $("#image").html(image);
                        $("#projectName").html(visit.xmmc1ccname);
                        $("#currentStage").html(visit.dqjd);
                        $("#owner").html(visit.owneridccname);
                        $("#latestModifier").html(visit.lastmodifybyidccname);
                        $("#creator").html(visit.createbyidccname);
                        $("#participantCollect").html(visit.cyryhz);
                        $("#visitTimes").html(visit.bfnum);
                        $("#recordType").html(visit.recordtypeccname);
                    }
                    return;
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //debugger;
        }
    });
}