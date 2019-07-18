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
	});

	$("#back-btn").on("click",function(){
		$(".search_content").hide();
		$("#back-btn").hide();
	});

	$("#btn_search").on("click",function(){
		$(".search_content").hide();
		$("#back-btn").hide();
		indexObj.loadNormData();
	});

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
			if(companyArr.length>1){
				let html = '';
				companyArr.forEach((value, index)=>{
					html += '<a class="actionsheet-item" onclick="indexObj.changeCompany(\''+value.id+'\',\''+value.name+'\')">'+value.name+'</a>';
				});
				html += '<a class="actionsheet-item" onclick="indexObj.changeCompany(\'全部\')">全部</a>';
				$("#companyList").html(html);
				$('#com_actionSheet').on('click', function () {
					$("#companyList").actionSheet('open');
				});
			}else if(companyArr.length>0){
				$("#company").html(companyArr[0].name);
			}

		})
	},
	//加载关键指标
	loadNormData:function(){
		YDUI.dialog.loading.open('加载中');
		let beginTime = new Date($(".beginTime").val()).Format("yyyy-MM-dd");
		let endTime = new Date($(".endTime").val()).Format("yyyy-MM-dd");
		let params = {
			'accountName':accountName,
			'account':account,
			'shareUserId':shareUserId,

		}
		return axios({
			url: 'api/account/save',
			method: 'post',
			params
		})

	},
	//根据职位加载菜单
	loadByTitle: function() {
		return new Promise(function(resolve,reject){
			let tile = YDUI.util.localStorage.get('title');
			let html = '';
			if(true){
				html+='<a href="customer/customerList.html" class="grids-item"><div class="grids-icon"><img src="image/account.png"alt=""></div><div class="grids-txt"><span>客户档案</span></div></a>';
			}
			html+='<a href="project/project.html" class="grids-item"><div class="grids-icon"><img src="image/account.png"alt=""></div><div class="grids-txt"><span>项目列表</span></div></a>';
			html+='<a href="#" class="grids-item"><div class="grids-icon"><img src="image/account.png"alt=""></div><div class="grids-txt"><span>客户拜访</span></div></a>';
			html+='<a href="#" class="grids-item"><div class="grids-icon"><img src="image/account.png"alt=""></div><div class="grids-txt"><span>工作日志</span></div></a>';
			$("#menus").html(html);
			resolve();
		})
	},
	changeCompany:function(companyId,company){
		$("#companyList").actionSheet('close');
		$("#company").html(company);
		companyIds = companyId;
		this.loadNormData();
	},
	changeProType(type){
		console.log(type);
		$("#projectType").actionSheet('close');
		$("#proType").html(type);
		if('全部'==type){
			projectType = '';
		}else{
			projectType = type;
		}
		this.loadNormData();
	},
}
window.indexObj = new Index();
