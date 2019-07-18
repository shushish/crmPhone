$(document).ready(function () {
    Common.prototype.checkLoginStatu();
});

$(function () {
    $(".back").on("click", Common.prototype.Back);
    customerR.loadCustomerRecord();
});

var CustomerR = function () {};

CustomerR.prototype.loadCustomerRecord = function () {
    var binding = Cookies.prototype.GetCookie('binding');
    var id = Common.prototype.GetQueryString('id');
    $(".projectSurvey-tit").find("a").each(function(){
        $(this).attr("href",$(this).attr("href").replace("[id]",id));
    });
    if (binding != null && id != null) {
        $.ajax({
            type: "get",
            dataType: "json",
            url: url,
            data: "serviceName=cqueryWithRoleRight&objectApiName=Account&expressions=" + encodeURIComponent("id='" + id + "'") + "&binding=" + binding,
            success: function (data) {
                //加载客户名称
                if (data != "") {
                    if (data.result) {
                        if (data.data.length > 0) {
                            var account = data.data[0];
                            // $('#editorCustomer').attr("data-id", account.id);
                            //项目小组
                            // $('.customername').html(account.name);
                            $('#groupLeader').html(account.zz);
                            $('#business').html(account.sw);
                            $('#design').html(account.sj);
                            $('#customerService').html(account.kf);
                            //基本信息
                            $('#customerName').html(account.name);
                            $('#membershipGroup').html(account.ssjt);
                            $('#customerType').html(account.accounttype);
                            $('#customerLocation').html(account.khdd);
                            $('#recordType').html(account.recordtypeccname);
                            $('#parentCompany').html(account.parentccname);
                            $('#owner').html(account.owneridccname);
                            $('#subordinateCompanies').html(account.ssgs);
                            //合作历史
                            $('#totalAmount').html(account.sumhtamount);
                            $('#projectTotalCount').html(account.isproj);
                            $('#fistCollaborateTime').html(account.schzrq);
                            $('#latestBuyTime').html(account.zjgmrq);
                            $('#latestContact').html(account.zjycbfsj);
                            $('#unContactDays').html(account.wlxts);
                            $('#VisitTimes').html(account.bfcs);
                            $('#remindTimes').html(account.txcs);

                            //关联信息
                            $('#customerAddress').html(account.reglocation);
                            $('#companyLandline').html(varIsNull(account.dianhua)?"":"<a href='tel:"+account.dianhua+"'>"+account.dianhua+"</a>");
                            $('#legalPerson').html(account.artificial_person_name);
                            $('#siteURL').html(account.wangzhi);
                            $('#companyType').html(account.companyorgtype);
                            $('#registeredCapital').html(account.org_registered_capital);
                            $('#trade').html(account.industry);
                            $('#managementForms').html(account.regstatus);
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
}



window.customerR = new CustomerR();