$(document).ready(function () {
    Common.prototype.checkLoginStatu();
});

$(function () {
	YDUI.dialog.loading.open("加载中");
	$("#back-btn").on("click", Common.prototype.Back);

	abnormity.getabnormity().then(()=>{
		YDUI.dialog.loading.close();
	})
});

var abnormity = function () {};

abnormity.prototype = {
    getabnormity:function(){
        let url = window.location.href;
        /*let str = url.split("?")[1];   //通过?得到一个数组,取?后面的参数
        let items = str.split("&");//参数列表
        let paramArr1 = items[0].split("=");
        let begin = paramArr1[1];
        let paramArr2 = items[1].split("=");
        let end = paramArr2[1];
        let paramArr3 = items[2].split("=");
        let companyId = paramArr3[1];
        let paramArr4 = items[3].split("=");
        let type = paramArr4[1];*/
        let begin = '';
        let end = '';
        let companyId = '';
        let type = '';
            return axios.post("/api/statistics/getAbnormityInfo?startTime="+ begin +"&endTime=" +end+"&companyId=" +companyId+"&type=" + type).then(res => {
                data= res.data;
                if(data&&data.length>0){
                    let html = '';
                    data.forEach((value, index)=>{
                        html += '<a href="abnormityDetail.html?id='+value.id+'"  class="list-item"><div class="list-img"><img src="../image/icon/listNum-1.png"></div><div class="list-mes">';
                        html += '<h3 class="list-title">'+value.projectName+'</h3>';
                        html += '<div class="list-mes-item">';
                        html += '<div>'+value.content.substring(0,18)+"..."+'</div>';
                        // html += '<div>'+new Date(value.joinTime)+'</div>';
                        html += '<div>'+common.dateFtt("yyyy-MM-dd",new Date(value.createTime))+'</div>';
                        html += '</div>';
                        html += '</div></a>';
                    });
                    $("#title").html("异常信息");
                    $("#abnormityList").html(html);
                }else{
                    $("#abnormityList").html('暂无异常信息。');
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

window.abnormity = new abnormity();
