$(document).ready(function () {
    Common.prototype.checkLoginStatu();
});

$(function () {
	YDUI.dialog.loading.open("加载中");
	$("#back-btn").on("click", Common.prototype.Back);

	showProject.getshowProject().then(()=>{
		YDUI.dialog.loading.close();
	})
});

var showProject = function () {};

showProject.prototype = {

    getshowProject:function(){
    	let url = window.location.href;
        let str = url.split("?")[1];   //通过?得到一个数组,取?后面的参数
        var items = str.split("&");//参数列表
        let paramArr = items[0].split("=");
        let param = paramArr[1];
        let paramArr1 = items[1].split("=");
        let begin = paramArr1[1];
        let paramArr2 = items[2].split("=");
        let end = paramArr2[1];
        let paramArr3 = items[3].split("=");
        let companyId = paramArr3[1];
        let paramArr4 = items[4].split("=");
        let type = paramArr4[1];
        let data = '';
        if('0' == param){
            return axios.post("/api/statistics/getSinningProjectInfo?startTime="+ begin +"&endTime=" +end+"&companyId=" +companyId+"&type=" + type).then(res => {
                data= res.data;
                /*else if('1' == param){
            axios.post("/api/statistics/getBiddingProjectInfo?startTime=''&endTime=''").then(res => {
                data= res.data.records;
                })*/
                if(data&&data.length>0){
                    let html = '';
                    data.forEach((value, index)=>{
                        html += '<a href="#" class="list-item"><div class="list-img"><img src="../image/icon/listNum-1.png"></div><div class="list-mes">';
                        html += '<h3 class="list-title">'+value.name+'</h3>';
                        html += '<div class="list-mes-item">';
                        html += '<div>'+value.projectPeople+'</div>';
                        // html += '<div>'+new Date(value.joinTime)+'</div>';
                        html += '<div>'+common.dateFtt("yyyy-MM-dd",new Date(value.statisticsDate))+'</div>';
                        html += '</div>';
                        html += '</div></a>';
                    });
                    $("#title").html("成交项目");
                    $("#projectList").html(html);
                }else{
                    $("#projectList").html('暂无审批流程。');
                }
                })
		}
        else if('1' == param){
            return axios.post("/api/statistics/getBiddingProjectInfo?startTime="+ begin +"&endTime=" +end+"&companyId=" +companyId+"&type=" + type).then(res => {
                data= res.data;
                if(data&&data.length>0){
                    let html = '';
                    data.forEach((value, index)=>{
                        html += '<a href="#" class="list-item"><div class="list-img"><img src="../image/icon/listNum-1.png"></div><div class="list-mes">';
                        html += '<h3 class="list-title">'+value.name+'</h3>';
                        html += '<div class="list-mes-item">';
                        html += '<div>'+value.projectPeople+'</div>';
                        // html += '<div>'+new Date(value.joinTime)+'</div>';
                        html += '<div>'+common.dateFtt("yyyy-MM-dd",new Date(value.statisticsDate))+'</div>';
                        html += '</div>';
                        html += '</div></a>';
                    });
                    $("#title").html("中标项目");
                    $("#projectList").html(html);
                }else{
                    $("#projectList").html('暂无审批流程。');
                }
            })
        }

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

window.showProject = new showProject();