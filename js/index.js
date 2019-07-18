$(document).ready(function() {
	Common.prototype.checkLoginStatu();

});

let companyIds = '';
let projectType = '';

$(function() {	
	// YDUI.dialog.loading.open('很快加载好了');
	//加载默认日期
	var year = new Date().getFullYear();
	$(".beginTime").val(year + "-01-01");
	$(".endTime").val((year + 1) + "-01-01");
	
	//绑定时间选择事件
	$(".btn_time").on("click", function () {
		$(".search_content").css("display", "block");
		$("#back-btn").show();
	})

	$("#back-btn").on("click",function(){
		$(".search_content").hide();
		$("#back-btn").hide();
	})



	$("#btn_search").on("click",function(){
		$(".search_content").hide();
		$("#back-btn").hide();
        let begin = $(".beginTime").val();
        let end = $(".endTime").val();
        let companyId = $("#company").val();
        let type = $("#proType").val();
		debugger
        getGroupInfo(begin,end,companyId,type);
	})

    $("#btn_reset").on("click",function(){
        let year = new Date().getFullYear();
        $(".beginTime").val(year + "-01-01");
        $(".endTime").val((year + 1) + "-01-01");
    })

	$("#forecast").on("click",function () {
        let begin = $(".beginTime").val();
        let end = $(".endTime").val();
        let companyId = $("#company").val();
        let type = $("#proType").val();
		window.location.href = "project/projectList.html?type=1"+"&begin="+begin+"&end="+end+"&companyId="+companyId+"&type="+type;
    })

	$("#finish").on("click",function () {
        let begin = $(".beginTime").val();
        let end = $(".endTime").val();
        let companyId = $("#company").val();
        let type = $("#proType").val();
        window.location.href = "project/projectList.html?type=0"+"&begin="+begin+"&end="+end+"&companyId="+companyId+"&type="+type;
    })

	$("#abnormal").on("click",function () {
        let begin = $(".beginTime").val();
        let end = $(".endTime").val();
        let companyId = $("#company").val();
        let type = $("#proType").val();
        window.location.href = "my/abnormity.html?"+"begin="+begin+"&end="+end+"&companyId="+companyId+"&type="+type;
    })


	
	indexObj.loadByTitle()
	.then(function(){
		return indexObj.loadCompanySelect();
	})
	.then(function(){
		return indexObj.loadProType();
	})
// 	.then(function(){
// 		return indexObj.loadNormData();
// 	})
	.then(function(){
		//YDUI.dialog.loading.close();
	});
	
	
});

var Index = function() {};

Index.prototype = {
	loadProType:function(){
		return axios.post("/api/dictionary/findDictionaryByDictValue","dictValue=projectType")
		.then(res =>{
			let data = res.data;
			if(data&&data.length>0){
				let html = '';
				data.forEach((value, index)=>{
					html += '<a class="actionsheet-item" onclick="indexObj.changeProType(\''+value.dataName+'\')">'+value.dataName+'</a>';
				});
				html += '<a class="actionsheet-item" onclick="indexObj.changeProType(\'全部\')">全部</a>';
				$("#projectType").html(html);
				$('#pro_actionSheet').on('click', function () {
					$("#projectType").actionSheet('open');
				});
			}
		})
	},
	//加载公司选择器
	loadCompanySelect:function(){
		return axios({
			url: '/api/company/queryCompanyByUserId',
			method:'post'
		})
		.then(res =>{
			let companyArr = res.data;
			if(companyArr.length>0){
				let html = '';
				companyArr.forEach((value, index)=>{
					html += '<a class="actionsheet-item" onclick="indexObj.changeCompany(\''+value.id+'\',\''+value.name+'\')">'+value.name+'</a>';
				});
					html += '<a class="actionsheet-item" onclick="indexObj.changeCompany(\'全部\')">全部</a>';
				$("#companyList").html(html);
                $("#company").val(companyArr[0].id);
				$("#company").html(companyArr[0].name);
                let begin = $(".beginTime").val();
                let end = $(".endTime").val();
				getGroupInfo(begin,end,companyArr[0].id,'');
			}

           /* $('#com_actionSheet').on('click', function () {
                $("#companyList").actionSheet('open');
            });*/
		})
	},
	//加载关键指标
/*	loadNormData:function(){
                YDUI.dialog.loading.open('加载中');
                let beginTime = new Date($(".beginTime").val()).Format("yyyy-MM-dd");
                let endTime = new Date($(".endTime").val()).Format("yyyy-MM-dd");
                let params = {
                    'startTime':beginTime,
                    'endTime':endTime,
                    'companyIds':companyIds,
			'projectType':projectType,
		}
		return axios({
			url: '/api/data/queryBoardData',
			method: 'post',
			params
		}).then(res => {
			debugger
			let data = res.data;
			if(data.length > 0){
				let showData = data[data.length-1];
				$("#task").html(common.formatMoney(showData.task));
				$("#finish").html(common.formatMoney(showData.money));
				$("#pcAvg").html(common.formatMoney(showData.pcAvg));
				$("#forecast").html(showData.biddingAmount);
				$("#quality").html(showData.quantity);
				// $("#started").html();
				$("#abnormal").html(showData.excessiveAbnormity+'个');
			}
			YDUI.dialog.loading.close();
		})
	},*/
	//根据职位加载菜单
	loadByTitle: function() {
		return new Promise(function(resolve,reject){
			let tile = YDUI.util.localStorage.get('title');
			let html = '';
			if(true){
				html+='<a href="customer/customerList.html" class="grids-item"><div class="grids-icon"><img src="image/icon/account.png"alt=""></div><div class="grids-txt"><span>客户档案</span></div></a>';
			}
			html+='<a href="customer/Contacts.html" class="grids-item"><div class="grids-icon"><img src="image/icon/contacts.png"alt=""></div><div class="grids-txt"><span>联系人</span></div></a>';
			html+='<a href="visit/visit.html" class="grids-item"><div class="grids-icon"><img src="image/icon/visits.png"alt=""></div><div class="grids-txt"><span>客户拜访</span></div></a>';
			html+='<a href="project/project.html" class="grids-item"><div class="grids-icon"><img src="image/icon/project.png"alt=""></div><div class="grids-txt"><span>项目列表</span></div></a>';
			html+='<a href="#" class="grids-item"><div class="grids-icon"><img src="image/icon/rizhi.png"alt=""></div><div class="grids-txt"><span>工作日志</span></div></a>';
            html+='<a href="my/abnormityFeedback.html" class="grids-item"><div class="grids-icon"><i class="icon-compose" style="font-size: .5rem"></i></div><div class="grids-txt"><span>新建异常</span></div></a>';
            html+='<a href="https://m.fang.com/tudi/zpg/" class="grids-item"><div class="grids-icon"><i class="icon-type" style="font-size: .5rem"></i></div><div class="grids-txt"><span>土地信息</span></div></a>';
            $("#menus").html(html);
			resolve();
		})
	},
	changeCompany:function(companyId,company){
		$("#companyList").actionSheet('close');
		$("#company").html(company);
		companyIds = companyId;
		alert("companyIds"+companyIds);
	},
	changeProType(type){
		$("#projectType").actionSheet('close');
		$("#proType").html(type);
        let begin = $(".beginTime").val();
        let end = $(".endTime").val();
        let company = $("#company").val();
		if('全部'==type){
			projectType = '';
            $("#proType").val("");
            getGroupInfo(begin,end,company,'');
		}else{
			projectType = type;
            $("#proType").val(type);
            getGroupInfo(begin,end,company,type);
		}
	},
}

window.indexObj = new Index();
