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
            return axios.post("/api/statistics/getMissionInfo?pageNum=1&pageSize=1000").then(res => {
                data= res.data.records;
                if(data&&data.length>0){
                    let html = '';
                    data.forEach((value, index)=>{
                        html += '<a href="#" class="list-item"><div class="list-img"><img src="../image/icon/listNum-1.png"></div><div class="list-mes">';
                        html += '<h3 class="list-title">'+value.projectId+'</h3>';
                        html += '<div class="list-mes-item">';
                        html += '<div>'+value.missionContent+'</div>';
                        html += '<div>'+common.dateFtt("yyyy-MM-dd",new Date(value.createTime))+'</div>';
                        html += '</div>';
                        html += '</div></a>';
                    });
                    $("#title").html("我的任务");
                    $("#missionList").html(html);
                }else{
                    $("#missionList").html('暂无任务信息。');
                }
                })


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