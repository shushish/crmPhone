$(document).ready(function () {
    Common.prototype.checkLoginStatu();
});

let approvalCode = Common.prototype.GetQueryString("approvalCode");

$(function () {
	$("#back-btn").on("click", Common.prototype.Back);
    approval.ShowDetail();
    $(".btn-primary").on("click", approval.Approve);
    $(".btn-danger").on("click", approval.Refused);
	//console.log(wxcode)
});


var Approval = function () {};

Approval.prototype = {
    ShowDetail: function () {
		/*console.log("approvalCode:"+approvalCode);*/
        YDUI.dialog.loading.open('加载中。。。');
		let params = {'code':approvalCode};
		return axios({
			url: '/api/approval/getApprovalByCode2',
			method: 'post',
			params
		})
		.then(res => {
			let data = res.data;
            let html1 = '<div class="cell-item"><div class="cell-left">审批说明：</div><div class="cell-right">' + data.typeDescription + '</div></div>' +
                '<div class="cell-item"><div class="cell-left">提交人：</div><div class="cell-right" style="text-align: left !important;">' + data.originatorName + '</div></div>' +
                '<div class="cell-item"><div class="cell-right"><textarea id="approvalOpinion" class="cell-textarea" style="height: 4rem;" placeholder="请给出您的审批意见"></textarea></div></div>'

                //立项审批
            if(data.flowType == '1'){
                let html2 =
                    '<div class="cell-item"><div class="cell-left">项目名称：</div><div class="cell-right">'+ data.name +'</div></div>' +
                    '<div class="cell-item"><div class="cell-left">所有人：</div><div class="cell-right">' + data.projectPeople + '</div> </div>' +
                    '<div class="cell-item"><div class="cell-left">预制率：</div><div class="cell-right">' + data.prefabricateRate + '</div> </div>' +
                    '<div class="cell-item"><div class="cell-left">异形量：</div><div class="cell-right">' + data.abnormityNum + '</div> </div>' +
                    '<div class="cell-item"><div class="cell-left">异形率：</div><div class="cell-right">' + (data.abnormityNum*100/data.quantity).toFixed(1) + '%</div> </div>' +
                    '<div class="cell-item"><div class="cell-left">设计归属：</div><div class="cell-right">' + data.designOwnership + '</div> </div>' +
                    '<div class="cell-item"><div class="cell-left">地方意见：</div><div class="cell-right">' + data.opinionDesignOut + '</div> </div>' +
                    '<div class="cell-item"><div class="cell-left">总部意见：</div><div class="cell-right">' + data.opinionDesignHeadquarters + '</div> </div>' +
                    '<div class="cell-item"><div class="cell-left">审批类型：</div><div class="cell-right">立项审批</div></div>';
                $("#showPro").html(html2 + html1);
                //材料费审批
			} else if(data.flowType == '2'){
                let th =
                    '<a href="#" class="grids-item" style="border: 0.2px solid #D9D9D9;height: 1rem"><div class="grids-txt"><span>构件</span></div></a>' +
                    '<a href="#" class="grids-item" style="border: 0.2px solid #D9D9D9;height: 1rem"><div class="grids-txt"><span>工程量</span></div></a>' +
                    '<a href="#" class="grids-item" style="border: 0.2px solid #D9D9D9;height: 1rem"><div class="grids-txt"><span>小计</span></div></a>' +
                    '<a href="#" class="grids-item" style="border: 0.2px solid #D9D9D9;height: 1rem"><div class="grids-txt"><span>钢材量</span></div></a>' +
                    '<a href="#" class="grids-item" style="border: 0.2px solid #D9D9D9;height: 1rem"><div class="grids-txt"><span>硂标号</span></div></a>';
                let row = '';
                let table = '';
                let components = data.components;

                if(null != components){
                    for(let i=0;i<components.length;i++){
                        row = row +
                            '<a href="#" class="grids-item" style="border: 0.2px solid #D9D9D9;height: 1rem"><div class="grids-txt"><span>'+components[i].name + '</span></div></a>' +
                            '<a href="#" class="grids-item" style="border: 0.2px solid #D9D9D9;height: 1rem"><div class="grids-txt"><span>'+components[i].projectQuantity + '</span></div></a>' +
                            '<a href="#" class="grids-item" style="border: 0.2px solid #D9D9D9;height: 1rem"><div class="grids-txt"><span>'+components[i].priceMaterial + '</span></div></a>' +
                            '<a href="#" class="grids-item" style="border: 0.2px solid #D9D9D9;height: 1rem"><div class="grids-txt"><span>'+components[i].quanSteels + '</span></div></a>' +
                            '<a href="#" class="grids-item" style="border: 0.2px solid #D9D9D9;height: 1rem"><div class="grids-txt"><span>'+components[i].concretetype + '</span></div></a>';
                    }
                    if(row != ''){
                        table = '<div class="m-grids-5">' + th +row +'</div>'
                    }
                }
                let html2 =
                    '<div class="cell-item"><div class="cell-left">项目名称：</div><div class="cell-right">'+ data.name +'</div></div>' +
                    '<div class="cell-item"><div class="cell-left">所有人：</div><div class="cell-right">' + data.projectPeople + '</div></div>' +
                    '<div class="cell-item"><div class="cell-left">运输距离：</div><div class="cell-right">' + data.haulDistance + '</div></div>' +
                    '<div class="cell-item"><div class="cell-left">审批类型：</div><div class="cell-right">直接材料费审批</div></div>';

                $("#showPro").html(html2 + table + html1);
                //报价清单审批
			} else if(data.flowType == '3'){
                let html2 =
                    '<div class="cell-item"><div class="cell-left">项目名称：</div><div class="cell-right">'+ data.name +'</div></div>' +
                    '<div class="cell-item"><div class="cell-left">所有人：</div><div class="cell-right">' + data.projectPeople + '</div> </div>' +
                    '<div class="cell-item"><div class="cell-left">审批类型：</div><div class="cell-right">报价清单审批</div></div>';
                    $("#showPro").html(html2 + html1);
            //中标确认
            } else if(data.flowType == '4'){
                let th =
                    '<a href="#" class="grids-item" style="border: 0.2px solid #D9D9D9;height: 1rem"><div class="grids-txt"><span>构件</span></div></a>' +
                    '<a href="#" class="grids-item" style="border: 0.2px solid #D9D9D9;height: 1rem"><div class="grids-txt"><span>工程量</span></div></a>' +
                    '<a href="#" class="grids-item" style="border: 0.2px solid #D9D9D9;height: 1rem"><div class="grids-txt"><span>综合单价</span></div></a>' +
                    '<a href="#" class="grids-item" style="border: 0.2px solid #D9D9D9;height: 1rem"><div class="grids-txt"><span>材料</span></div></a>';
                let components = data.components;
                let row = '';
                let table = '';
                if(null != components){
                    for(let i=0;i<components.length;i++){
                        row = row +
                            '<a href="#" class="grids-item" style="border: 0.2px solid #D9D9D9;height: 1rem"><div class="grids-txt"><span>'+components[i].name + '</span></div></a>' +
                            '<a href="#" class="grids-item" style="border: 0.2px solid #D9D9D9;height: 1rem"><div class="grids-txt"><span>'+components[i].projectQuantity + '</span></div></a>' +
                            '<a href="#" class="grids-item" style="border: 0.2px solid #D9D9D9;height: 1rem"><div class="grids-txt"><span>'+components[i].price + '</span></div></a>' +
                            '<a href="#" class="grids-item" style="border: 0.2px solid #D9D9D9;height: 1rem"><div class="grids-txt"><span>'+components[i].percent + '</span></div></a>';
                    }
                    if(row != ''){
                        table = '<div class="m-grids-4">' + th +row +'</div>'
                    }
                }
                let date = ''
                if(null != data.winningDate && data.winningDate.length >10){
                    date = data.winningDate.substr(0,10);
                }
                let html2 =
                    '<div class="cell-item"><div class="cell-left">项目名称：</div><div class="cell-right">'+ data.name +'</div></div>' +
                    '<div class="cell-item"><div class="cell-left">所有人：</div><div class="cell-right">' + data.projectPeople + '</div></div>' +
                    '<div class="cell-item"><div class="cell-left">中标金额：</div><div class="cell-right">' + data.winningMoney + '</div></div>' +
                    '<div class="cell-item"><div class="cell-left">中标量：</div><div class="cell-right">' + data.quantity + '</div></div>' +
                    '<div class="cell-item"><div class="cell-left">中标均价：</div><div class="cell-right">' + data.winningMoney/data.quantity + '</div></div>' +
                    '<div class="cell-item"><div class="cell-left">中标日期：</div><div class="cell-right">' + date + '</div></div>' +
                    '<div class="cell-item"><div class="cell-left">审批类型：</div><div class="cell-right">中标通知书审批</div></div>';
                $("#showPro").html(html2 + table + html1);
                //合同评审
            } else if(data.flowType == '5'){
                let prepaymentRatio = '0';
                let proportionProgressPayment = '0';
                let acceptancePayment = '0';
                let settlementRatio = '0';
                let lengthWarranty = '0';
                let premiumRatio = '0';
                let sweepAndUnloading = '0';
                if(null != data.contract){
                    prepaymentRatio = data.contract.prepaymentRatio;
                    proportionProgressPayment = data.contract.proportionProgressPayment;
                    acceptancePayment = data.contract.acceptancePayment;
                    settlementRatio = data.contract.settlementRatio;
                    lengthWarranty = data.contract.lengthWarranty;
                    premiumRatio = data.contract.premiumRatio;
                    sweepAndUnloading = data.contract.sweepAndUnloading;
                }

                let html2 =
                    '<div class="cell-item"><div class="cell-left">项目名称：</div><div class="cell-right">'+ data.name +'</div></div>' +
                    '<div class="cell-item"><div class="cell-left">所有人：</div><div class="cell-right">' + data.projectPeople + '</div></div>' +
                    '<div class="cell-item"><div class="cell-left">首付款：</div><div class="cell-right">' + prepaymentRatio + '%</div></div>' +
                    '<div class="cell-item"><div class="cell-left">进度款：</div><div class="cell-right">' + proportionProgressPayment + '%</div></div>' +
                    '<div class="cell-item"><div class="cell-left">封顶付款：</div><div class="cell-right">' + acceptancePayment + '%</div></div>' +
                    '<div class="cell-item"><div class="cell-left">结算款：</div><div class="cell-right">' + settlementRatio + '%</div></div>' +
                    '<div class="cell-item"><div class="cell-left">质保年限：</div><div class="cell-right">' + lengthWarranty + '</div></div>' +
                    '<div class="cell-item"><div class="cell-left">质保金：</div><div class="cell-right">' + premiumRatio + '%</div></div>' +
                    '<div class="cell-item"><div class="cell-left">卸货区：</div><div class="cell-right">' + sweepAndUnloading + '</div></div>' +
                    '<div class="cell-item"><div class="cell-left">审批类型：</div><div class="cell-right">合同评审流程</div></div>';
                $("#showPro").html(html2  + html1);
                //合同复核
            } else if(data.flowType == '6'){
                let date = ''
                if(null != data.contract && null != data.contract.signDate && data.contract.signDate.length >10){
                    date = data.contract.signDate.substr(0,10);
                }
                let prepaymentRatio = '0';
                let proportionProgressPayment = '0';
                let acceptancePayment = '0';
                let settlementRatio = '0';
                let lengthWarranty = '0';
                let premiumRatio = '0';
                let sweepAndUnloading = '0';
                if(null != data.contract){
                    prepaymentRatio = data.contract.prepaymentRatio;
                    proportionProgressPayment = data.contract.proportionProgressPayment;
                    acceptancePayment = data.contract.acceptancePayment;
                    settlementRatio = data.contract.settlementRatio;
                    lengthWarranty = data.contract.lengthWarranty;
                    premiumRatio = data.contract.premiumRatio;
                    sweepAndUnloading = data.contract.sweepAndUnloading;
                }

                let html2 =
                    '<div class="cell-item"><div class="cell-left">项目名称：</div><div class="cell-right">'+ data.name +'</div></div>' +
                    '<div class="cell-item"><div class="cell-left">所有人：</div><div class="cell-right">' + data.projectPeople + '</div></div>' +
                    '<div class="cell-item"><div class="cell-left">首付款：</div><div class="cell-right">' + prepaymentRatio + '%</div></div>' +
                    '<div class="cell-item"><div class="cell-left">进度款：</div><div class="cell-right">' + proportionProgressPayment + '%</div></div>' +
                    '<div class="cell-item"><div class="cell-left">封顶付款：</div><div class="cell-right">' + acceptancePayment + '%</div></div>' +
                    '<div class="cell-item"><div class="cell-left">结算款：</div><div class="cell-right">' + settlementRatio + '%</div></div>' +
                    '<div class="cell-item"><div class="cell-left">质保年限：</div><div class="cell-right">' + lengthWarranty + '</div></div>' +
                    '<div class="cell-item"><div class="cell-left">质保金：</div><div class="cell-right">' + premiumRatio + '%</div></div>' +
                    '<div class="cell-item"><div class="cell-left">卸货区：</div><div class="cell-right">' + sweepAndUnloading + '</div></div>' +
                    '<div class="cell-item"><div class="cell-left">签约日期：</div><div class="cell-right">' + date + '</div></div>' +
                    '<div class="cell-item"><div class="cell-left">签约金额：</div><div class="cell-right">' + data.money + '</div></div>' +
                    '<div class="cell-item"><div class="cell-left">审批类型：</div><div class="cell-right">合同复核流程</div></div>';
                $("#showPro").html(html2  + html1);
            } else if(data.flowType == '7'){
                let html2 =
                    '<div class="cell-item"><div class="cell-left">项目名称：</div><div class="cell-right">'+ data.name +'</div></div>' +
                    '<div class="cell-item"><div class="cell-left">所有人：</div><div class="cell-right">' + data.projectPeople + '</div></div>' +
                        '<div class="cell-item"><div class="cell-left">审批类型：</div><div class="cell-right">合同设计审批</div></div>';
                $("#showPro").html(html2  + html1);
            }else if(data.flowType == '8'){
                let expectReason = '';
                let expectMonth = '';
                let deliveryMonth = '';
                if(null != data.expectedProject){
                    expectReason = data.expectedProject.expectReason;
                    expectMonth = data.expectedProject.expectMonth;
                    deliveryMonth = data.expectedProject.deliveryMonth;
                }
                let html2 =
                    '<div class="cell-item"><div class="cell-left">项目名称：</div><div class="cell-right">'+ data.name +'</div></div>' +
                    '<div class="cell-item"><div class="cell-left">所有人：</div><div class="cell-right">' + data.projectPeople + '</div></div>' +
                    '<div class="cell-item"><div class="cell-left">预计原因：</div><div class="cell-right">' + expectReason + '%</div></div>' +
                    '<div class="cell-item"><div class="cell-left">预计月份：</div><div class="cell-right">' + expectMonth + '%</div></div>' +
                    '<div class="cell-item"><div class="cell-left">交货月份：</div><div class="cell-right">' + deliveryMonth + '%</div></div>' + +
                        '<div class="cell-item"><div class="cell-left">审批类型：</div><div class="cell-right">预成交审批</div></div>';
                $("#showPro").html(html2  + html1);
            }else if(data.flowType == '9'){
                let html2 =
                    '<div class="cell-item"><div class="cell-left">项目名称：</div><div class="cell-right">'+ data.name +'</div></div>' +
                    '<div class="cell-item"><div class="cell-left">所有人：</div><div class="cell-right">' + data.projectPeople + '</div> </div>' +
                    '<div class="cell-item"><div class="cell-left">销项原因：</div><div class="cell-right">' + data.salesReason + '</div> </div>' +
                    '<div class="cell-item"><div class="cell-left">审批类型：</div><div class="cell-right">销项审批</div></div>';
                $("#showPro").html(html2 + html1);
            }else if(data.flowType == '10'){
                let html2 =
                    '<div class="cell-item"><div class="cell-left">项目名称：</div><div class="cell-right">'+ data.name +'</div></div>' +
                    '<div class="cell-item"><div class="cell-left">所有人：</div><div class="cell-right">' + data.projectPeople + '</div> </div>' +
                    '<div class="cell-item"><div class="cell-left">合同量：</div><div class="cell-right">' + data.quantity + '</div> </div>' +
                    '<div class="cell-item"><div class="cell-left">签约金额：</div><div class="cell-right">' + data.money + '</div> </div>' +
                    '<div class="cell-item"><div class="cell-left">审批类型：</div><div class="cell-right">项目方案审批</div></div>';
                $("#showPro").html(html2 + html1);
            } else{
                let html2 =
                    '<div class="cell-item"><div class="cell-left">审批类型：</div><div class="cell-right">其他审批</div></div>';
                $("#showPro").html(html2 + html1);
            }
            YDUI.dialog.loading.close();

            
		});
    },
    Approve: function () {
        let comments = $("#approvalOpinion").val();
        if(comments == null || comments == undefined || comments == ""){
            YDUI.dialog.alert("请输入审批意见");
            return;
        }
        let selectedCode = approvalCode+",";
        axios.post("/api/approval/approval", "codes="+ selectedCode +"&comments="+comments).then(res => {
            if (200 == res.code) {
                YDUI.dialog.toast(res.data, 'success')
            } else {
                YDUI.dialog.toast(res.data, 'error')
            }
        });
		setTimeout(function(){window.location.href = 'approval.html';},2000);
    },
    Refused: function () {
        let comments = $("#approvalOpinion").val();
        if(comments == null || comments == undefined || comments == ""){
            YDUI.dialog.alert("请输入审批意见");
            return;
        }
        let selectedCode = approvalCode+",";
        axios.post("/api/approval/batchReject", "codes="+ selectedCode +"&comments="+comments+"&rejectType=top").then(res => {
            if (200 == res.code) {
                YDUI.dialog.toast(res.data, 'success')
            } else {
                YDUI.dialog.toast(res.data, 'error')
            }
        });
        setTimeout(function(){window.location.href = 'approval.html';},500);
    },


}

window.approval = new Approval();