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
            return axios.post("/api/statistics/getMyAbnormityInfo").then(res => {
                data= res.data;
                if(data&&data.length>0){
                    let html = '';
                    data.forEach((value, index)=>{
                        html += '<a href="myAbnormityDetail.html?id='+value.id+'"  class="list-item"><div class="list-img"><img src="../image/icon/listNum-1.png"></div><div class="list-mes">';
                        html += '<h3 class="list-title">'+value.projectName+'</h3>';
                        html += '<div class="list-mes-item">';
                        html += '<div>'+value.content.substring(0,18)+"..."+'</div>';
                        html += '<div>'+value.createTime.substr(0,10)+'</div>';
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
    // CloaseDetail: function (htmlId) {
    //     if (!varIsNull(htmlId)) {
    //         $("." + htmlId).find("input").val("");
    //         $("." + htmlId).find("textarea").val("");
    //         $("." + htmlId).find("select").val("");
    //         $("." + htmlId).addClass("none");
    //     } else {
    //         $(".xmbbdetail").addClass("none");
    //     }
    // },
}

window.abnormity = new abnormity();
