$(document).ready(function () {
    Common.prototype.checkLoginStatu();
});

$(function () {
	YDUI.dialog.loading.open("加载中");
	$("#back-btn").on("click", Common.prototype.Back);
	approval.getApproval()
	.then(()=>{
		YDUI.dialog.loading.close();
	})
});

var Approval = function () {};

Approval.prototype = {
    getApproval:function() {
    	return axios.post("/api/approval/queryPage","pageNum=1&pageSize=1000")
    	.then(res =>{
    		let data = res.records;
    		// console.log(JSON.stringify(data))
			console.log(data)
    		if(data&&data.length>0){
    			let html = '';
    			let flowType = '';

    			data.forEach((value, index)=>{
                    if('1' == value.flowType){
                        flowType = '立项审批';
                    }else if ('2' == value.flowType){
                        flowType = '直接材料费审批';
                    }else if ('3' == value.flowType){
                        flowType = '报价清单审批';
                    }else if ('4' == value.flowType){
                        flowType = '中标通知书审批';
                    }else if ('5' == value.flowType){
                        flowType = '合同评审流程';
                    }else if ('6' == value.flowType){
                        flowType = '合同复核流程';
                    }else if ('7' == value.flowType){
                        flowType = '合同设计审批';
                    }else if ('8' == value.flowType){
                        flowType = '项目预成交审批';
                    }else if ('9' == value.flowType){
                        flowType = '项目销项审批';
                    }else{
                        flowType = '其他';
                    }

    				html += '<a href="myApproval.html?approvalCode='+value.approvalCode+'" class="list-item"><div class="list-img"><img src="../image/icon/listNum-1.png"></div><div class="list-mes">';
    				html += '<h3 class="list-title">'+value.objName+'</h3>';
    				html += '<div class="list-mes-item">';
    				html += '<div>'+ flowType +'</div>';
    				// html += '<div>'+new Date(value.joinTime)+'</div>';
    				html += '<div>'+common.dateFtt("yyyy-MM-dd hh:mm:ss",new Date(value.joinTime))+'</div>';
    				html += '</div>';
    				html += '</div></a>';
    			});
    			$("#approvalingList").html(html);
    		}else{
    			$("#approvalingList").html('暂无审批流程。');
    		}
    	});
    },
    CloaseDetail: function (htmlId) {
        if (!varIsNull(htmlId)) {
            // $(".detail_title").html("");
            // $("#sjgs").html("");
            // $("#dfsjyj").html("");
            // $("#yxjbl").html("");
            // $("#zbsjyj").html("");
            // $("#spyj").val("");
            $("." + htmlId).find("input").val("");
            $("." + htmlId).find("textarea").val("");
            $("." + htmlId).find("select").val("");
            $("." + htmlId).addClass("none");
        } else {
            $(".xmbbdetail").addClass("none");
        }
    },
}

window.approval = new Approval();