$(document).ready(function() {
	Common.prototype.checkLoginStatu();
});

var filter = "false";
var dateExpression = "";
var companyExpression = "";
var projectlxExpression = "";
var filterExpression = "";

var expressions_f = "";

$(function() {
	//每月1、2、15、16号显示预成交按钮
	var today = new Date().getDate();
	if (today == 1 || today == 2 || today == 15 || today == 16) {
		$("#ycjbutton").css("display", "block");
	}

	//绑定遮罩点击事件
	$(".masked").on("click", function() {
		Common.prototype.CloseMaskLayer("close-with-masklayer", Project.prototype.MaskedClick);
	});

	var title = Cookies.prototype.GetCookie('role');
	//初始化公司
	let comStr = localStorage.getItem("company");
	let companys = comStr.split(",");
	companys.forEach((value, index) => {
		let option = '<li class="company" onclick="return false;">'+value+'</li>';
		$("#option_com").append(option);
	});

	filter = Common.prototype.GetQueryString("filter");
	if (filter == "true") {
		$(".back").css("display", "block");
		$(".back").on("click", Common.prototype.Back);
		//$(".companyFilter").addClass('none');
	}

	var begin = varIsNull(Common.prototype.GetQueryString("begin")) ? null : decodeURIComponent(Common.prototype.GetQueryString(
		"begin"));
	var end = varIsNull(Common.prototype.GetQueryString("end")) ? null : decodeURIComponent(Common.prototype.GetQueryString(
		"end"));
	var companyName = varIsNull(Common.prototype.GetQueryString("companyName")) ? null : decodeURIComponent(Common.prototype
		.GetQueryString("companyName"));
	var projectlx = varIsNull(Common.prototype.GetQueryString("projectlx")) ? null : decodeURIComponent(Common.prototype
		.GetQueryString("projectlx"));;
	var filtertype = Common.prototype.GetQueryString("filtertype");

	if (!varIsNull(begin) && !varIsNull(end)) {
		dateExpression = "and o.tjsj between to_date('" + begin + "','yyyy-MM-dd') and to_date('" + end + "','yyyy-MM-dd')";
	}


	//季度信息
	var now = new Date();
	var nowYear = now.getFullYear();
	var nowMonth = now.getMonth() + 1;
	var quarterBeginyf = 1;
	var quarterEndyf = 3;
	var quarter = 1;
	if (nowMonth <= 3) {
		quarter = 1;
		quarterBeginyf = 1;
		quarterEndyf = 3;
	}
	if (3 < nowMonth && nowMonth < 7) {
		quarter = 2;
		quarterBeginyf = 4;
		quarterEndyf = 6;
	}
	if (6 < nowMonth && nowMonth < 10) {
		quarter = 3;
		quarterBeginyf = 7;
		quarterEndyf = 9;
	}
	if (nowMonth > 9) {
		quarter = 4;
		quarterBeginyf = 10;
		quarterEndyf = 12;
	}


	if (!varIsNull(projectlx) && projectlx != "全部") {
		projectlxExpression = "and o.xmlx = '" + projectlx + "'";
		//projectlxExpressionC = "and c.xmlx = '" + projectlx + "'";
	}

	if (varIsNull(companyName) || companyName == "全部") {
		companyExpression = ""; //and u.company <> '远大大数据市场管理'
	} else if (companyName == "安徽公司") {
		companyExpression = "and u.company in ('阜阳公司','合肥公司','六安公司')";
	} else {
		companyExpression = "and u.company = '" + companyName + "'";
	}

	if (filtertype == "je") {
		filterExpression = "o.dqjd='3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and u.company <> '远大大数据市场管理'";
		$(".dropdown").html("公司：" + companyName);
		$(".filterName").html("成交项目");
		expressions_f = filterExpression + " " + companyExpression + " " + dateExpression + " " + projectlxExpression;
	} else if (filtertype == "xs") {
		filterExpression = "(o.dqjd='0-项目线索' or o.dqjd='1-项目立项' or o.dqjd='2-项目推进') and u.company <> '远大大数据市场管理'";
		$(".dropdown").html("公司：" + companyName);
		$(".filterName").html("项目线索");
		expressions_f = filterExpression + " " + companyExpression + " " + projectlxExpression;
	} else if (filtertype == "yj") { //预计销售
		filterExpression = "o.sfycjxm='是' and o.dqjd not in('0-销项项目','3-项目签约') and u.company <> '远大大数据市场管理'";
		$(".dropdown").html("公司：" + companyName);
		$(".filterName").html("预成交项目");
		expressions_f = filterExpression + " " + companyExpression + " " + projectlxExpression;
	} else if (filtertype == "dr") {
		filterExpression = "o.dqjd='0-项目线索' and u.company <> '远大大数据市场管理'";
		$(".dropdown").html("公司：" + companyName);
		$(".filterName").html("导入项目");
		expressions_f = filterExpression + " " + companyExpression + " " + projectlxExpression;
	} else if (filtertype == "lx") {
		filterExpression = "o.dqjd='1-项目立项' and u.company <> '远大大数据市场管理'";
		$(".dropdown").html("公司：" + companyName);
		$(".filterName").html("立项项目");
		expressions_f = filterExpression + " " + companyExpression + " " + projectlxExpression;
	} else if (filtertype == "tj") {
		filterExpression = "o.dqjd='2-项目推进' and u.company <> '远大大数据市场管理'";
		$(".dropdown").html("公司：" + companyName);
		$(".filterName").html("推进项目");
		expressions_f = filterExpression + " " + companyExpression + " " + projectlxExpression;
	} else if (filtertype == "cb") {
		filterExpression = "o.dqjd in ('0-项目线索','1-项目立项','2-项目推进') and u.company <> '远大大数据市场管理'";
		$(".dropdown").html("公司：" + companyName);
		$(".filterName").html("项目储备");
		expressions_f = filterExpression + " " + companyExpression + " " + projectlxExpression;
	} else if (filtertype == "qy") {
		filterExpression = "o.dqjd='3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and u.company <> '远大大数据市场管理'";
		$(".dropdown").html("公司：" + companyName);
		$(".filterName").html("成交项目");
		expressions_f = filterExpression + " " + companyExpression + " " + dateExpression + " " + projectlxExpression;
	} else if (filtertype == "qyysh") {
		filterExpression =
			"o.dqjd='3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and c.htsh = '已审核' and u.company <> '远大大数据市场管理'";
		$(".dropdown").html("公司：" + companyName);
		$(".filterName").html("签约项目");
		expressions_f = filterExpression + " " + companyExpression + " " + dateExpression + " " + projectlxExpression;
	} else if (filtertype == "yjdb") {
		filterExpression =
			"o.dqjd in ('0-项目线索','1-项目立项','2-项目推进') and o.sfycjxm = '是' and o.ycjyy not in ('已中标','在签约') and u.company <> '远大大数据市场管理'";
		$(".dropdown").html("公司：" + companyName);
		$(".filterName").html("预计项目");
		expressions_f = filterExpression + " " + companyExpression + " " + projectlxExpression;
	} else if (filtertype == "jq") {
		filterExpression =
			"o.dqjd in ('0-项目线索','1-项目立项','2-项目推进') and o.sfycjxm = '是' and o.ycjyf is not null and length(o.ycjyf) >= 7 and SUBSTR(o.ycjyf,0,4)='" +
			nowYear + "' and to_number(SUBSTR(o.ycjyf,6,2)) >= " + quarterBeginyf + " and to_number(SUBSTR(o.ycjyf,6,2)) <= " +
			quarterEndyf + " and u.company <> '远大大数据市场管理' and u.company <> '安徽公司'";
		$(".dropdown").html("公司：" + companyName);
		$(".filterName").html("即签项目");
		expressions_f = filterExpression + " " + companyExpression + " " + projectlxExpression;
	} else if (filtertype == "zb") {
		filterExpression =
			"o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and (c.htsh is null or c.htsh <> '已审核') and u.company <> '远大大数据市场管理'";
		$(".dropdown").html("公司：" + companyName);
		$(".filterName").html("中标项目");
		expressions_f = filterExpression + " " + companyExpression + " " + dateExpression + " " + projectlxExpression;
	} else if (filtertype == "jd") {
		var jd = Common.prototype.GetQueryString("jd");
		filterExpression = "o.bzdz like '" + jd + "%'";
		$(".dropdown").html("公司：" + companyName);
		$(".filterName").html("中标项目");
		expressions_f = filterExpression + " " + companyExpression + " " + dateExpression + " " + projectlxExpression;
	} else if (filtertype == "kg") {
		filterExpression = "f.fwjd = '交付中' and u.company <> '远大大数据市场管理' and f.is_deleted <> '1'";
		$(".dropdown").html("公司：" + companyName);
		$(".filterName").html("开工项目");
		expressions_f = filterExpression + " " + companyExpression + " " + dateExpression + " " + projectlxExpression;
	} else if (filtertype == "wdg") {
		filterExpression = "f.fwjd = '交付前' and u.company <> '远大大数据市场管理' and f.is_deleted <> '1'";
		$(".dropdown").html("公司：" + companyName);
		$(".filterName").html("未开工项目");
		expressions_f = filterExpression + " " + companyExpression + " " + dateExpression + " " + projectlxExpression;
	} else if (filtertype == "ywg") {
		filterExpression = "f.fwjd = '交付完结' and u.company <> '远大大数据市场管理' and f.is_deleted <> '1'";
		$(".dropdown").html("公司：" + companyName);
		$(".filterName").html("完工项目");
		expressions_f = filterExpression + " " + companyExpression + " " + dateExpression + " " + projectlxExpression;
	} else if (filtertype == "ts") {
		filterExpression = "x.id is not null and u.company <> '远大大数据市场管理' and f.is_deleted <> '1'";
		$(".dropdown").html("公司：" + companyName);
		$(".filterName").html("投诉项目");
		expressions_f = filterExpression + " " + companyExpression + " " + dateExpression + " " + projectlxExpression;
	}


	//绑定搜索按钮点击事件，打开搜索菜单
	$(".btn_search").on("click", function() {
		Common.prototype.ShowMaskLayer();
		$(".search_content").css("display", "block");
		$(".addproject").css("display", "none");
		Project.prototype.ShowSearchBackBtn();

	});

	//行业输入框点击事件，打开行业选择菜单
	$(".industry_input").on("click", function() {
		$(".industry_content").css("display", "block");
		Project.prototype.ShowIndustryBackBtn();
	});

	//重置按钮点击事件
	$("#btn_reset").on("click", function() {
		Project.prototype.ResetSearch();
	});

	//搜索按钮点击事件，搜索功能
	$("#btn_search").on("click", function() {
		currentPage = 0;
		var nameKeyWord = $(".proname").val();
		var creatorKeyWord = $(".creator").val();
		var expressions = "";
		if (nameKeyWord != null && nameKeyWord != undefined && $.trim(nameKeyWord) != "") {
			expressions = "&searchValue="+nameKeyWord;
		}
		Project.prototype.loadPorjectNum("全部", expressions);
		Project.prototype.LoadPorject(1, 15, expressions);
		Common.prototype.CloseMaskLayer("close-with-masklayer", Project.prototype.MaskedClick);
	});

	//按条件筛选功能 公司、阶段
	$(".dropdown-menu").find("li").on("click", function() {
		var select = $(this).html();
		$(".filterName").html(select);
		currentPage = 0;
		if ($(this).hasClass('company')) {
			$("#company").html(select);
			var stage = $("#stage").html();
			if (select == "全部") {
				if (stage == "全部" || stage == "阶段") {
					Project.prototype.LoadPorject(1, 15);
					Project.prototype.loadPorjectNum(select);
				} else if (stage == "4-项目交付") {
					Project.prototype.LoadPorject(1, 15,"");
					Project.prototype.loadPorjectNum("", "");
				} else {
					Project.prototype.LoadPorject(1, 15, "&=projectStage"+stage);
					Project.prototype.loadPorjectNum(stage);
				}
			} else {
				if (stage == "全部" || stage == "阶段") {
					Project.prototype.LoadPorject(1, 15, "&selectCompany=" + select );
					Project.prototype.loadPorjectNum("全部", "&selectCompany=" + select);
				} else if (stage == "4-项目交付") {
					Project.prototype.LoadPorject(1, 15,
						"o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and f.fwjd = '交付完结' and u.company = '" +
						select + "'");
					Project.prototype.loadPorjectNum('3-项目签约', "f.fwjd = '交付完结' and u.company = '" + select + "'");
				} else {
					Project.prototype.LoadPorject(1, 15, "o.dqjd = '" + stage + "' and u.company = '" + select + "'");
					Project.prototype.loadPorjectNum(stage, "u.company = '" + select + "'");
				}
			}
		} else {
			$("#stage").html(select);
			var company = $("#company").html();
			if (select == "全部") {
				if (company == "全部" || company == "公司") {
					Project.prototype.LoadPorject(1, 15);
					Project.prototype.loadPorjectNum(select);
				} else {
					Project.prototype.LoadPorject(1, 15, "u.company = '" + company + "'");
					Project.prototype.loadPorjectNum("全部", "u.company = '" + company + "'");
				}
			} else if (select == "4-项目交付") {
				if (company == "全部" || company == "公司") {
					Project.prototype.LoadPorject(1, 15,
						"o.dqjd = '3-项目签约' and (o.bjxtj is null or o.bjxtj = 'false') and f.fwjd = '交付完结'");
					Project.prototype.loadPorjectNum('3-项目签约', "f.fwjd = '交付完结'");
				} else {
					Project.prototype.LoadPorject(1, 15,"&projectStage="+stage);
					Project.prototype.loadPorjectNum('3-项目签约', "f.fwjd = '交付完结' and u.company = '" + company + "'");
				}

			} else {
				if (company == "全部" || company == "公司") {
					Project.prototype.LoadPorject(1, 15,"&projectStage="+select);
					Project.prototype.loadPorjectNum(select);
				} else {
					Project.prototype.LoadPorject(1, 15, "o.dqjd = '" + select + "' and u.company = '" + company + "'");
					Project.prototype.loadPorjectNum(select, "u.company = '" + company + "'");
				}

			}
		}
	});
	if (filter == "true") {
		Project.prototype.loadPorjectNum("全部", expressions_f);
		Project.prototype.LoadPorject(1, 15, expressions_f);
	} else {
		Project.prototype.loadPorjectNum("全部");
		Project.prototype.LoadPorject(1, 15);
	}


});

var Project = function() {};

//显示搜索返回按钮
Project.prototype.ShowSearchBackBtn = function() {
	$(".back").css("display", "block");
	var customerId = Common.prototype.GetQueryString('customerId');
	if (!varIsNull(customerId) || filter == "true") {
		$(".back").off("click");
	}
	$(".back").on("click", Project.prototype.SearchBack);
};

//搜索返回
Project.prototype.SearchBack = function() {
	Common.prototype.CloseMaskLayer("close-with-masklayer", Project.prototype.MaskedClick);
};

//遮罩点击时需要执行的操作
Project.prototype.MaskedClick = function() {
	$(".back").off("click");
	var customerId = Common.prototype.GetQueryString('customerId');
	if (!varIsNull(customerId) || filter == "true") {
		$(".back").off("click");
		$(".back").on("click", Common.prototype.Back);
	} else {
		$(".back").css("display", "none");
	}
	$(".addproject").css("display", "block");
	Project.prototype.ResetSearch();
}

//显示行业选择返回按钮
Project.prototype.ShowIndustryBackBtn = function() {
	$(".back").off("click");
	$(".back").on("click", Project.prototype.IndustryBack);
};

//行业选择返回
Project.prototype.IndustryBack = function() {
	$(".back").off("click");
	$(".industry_content").css("display", "none");
	$(".back").on("click", Project.prototype.SearchBack);
};

Project.prototype.ResetSearch = function() {
	$(".search_content").find("input").val("");
};

Project.prototype.ProToggle = function(obj) {
	var editBlock = $(obj).parents(".pro").children(".pro_edit");
	if (editBlock.hasClass("pro_edit_hidden")) {
		editBlock.removeClass("pro_edit_hidden");
		$(obj).children(".slid_up").addClass("reversal");
	} else {
		editBlock.addClass("pro_edit_hidden");
		$(obj).children(".slid_up").removeClass("reversal");
	}
};

$(window).scroll(function() {
	var scrollTop = $(this).scrollTop();
	var scrollHeight = $(document).height();
	if (scrollTop > 3000) {
		$("#GoToTop").fadeIn("slow");
	} else {
		$("#GoToTop").fadeOut("slow");
	}
	var windowHeight = $(this).height();
	var positionValue = (scrollTop + windowHeight) - scrollHeight;
	if (positionValue >= 0) {
		//执行ajax，获取数据
		Project.prototype.LoadPorject(currentPage + 1, 15, currentExpressions);
	}
});


//---------------------获取数据------------------------------------------------------
var currentPage = 0;
var currentExpressions = "";
Project.prototype.LoadPorject = function(pageNum, pageSize, expressions) {
	var index = layer.load(1, {
		shade: false
	});
	console.log(expressions)
	if(varIsNull(expressions)){
		expressions="";
	}
	axios.post("/api/project/listPage", "pageNum=" + pageNum + "&pageSize=" + pageSize+expressions)
		.then(res => {
			console.log(res);
			let content = res.records;
			if (pageNum == 1) {
				$("#projectList").html("");
			}
			if (content.length > 0) {
				let html = "";
				content.forEach((value, index) => {

					html += "<div class='clearfix'></div>";
					html += "<div class='pro'>";
					var project_img = "";
					var bzdzId = "";
					if (value.dqjd == "0-项目线索") {
						bzdzId = 1;
						project_img = "clew";
					} else if (value.dqjd == "1-项目立项") {
						bzdzId = 3;
						project_img = "begin";
					} else if (value.dqjd == "2-项目推进") {
						bzdzId = 8;
						project_img = "boost";
					} else if (value.dqjd == "3-项目签约" && value.fwjd != '交付完结') {
						bzdzId = 14;
						project_img = "signed";
					} else if (value.dqjd == "3-项目签约" && value.fwjd == '交付完结') {
						bzdzId = 14;
						project_img = "jiaofu";
					} else {
						bzdzId = 1;
						project_img = "clew";
					}
					var projectRemind = "";
					if (!varIsNull(value.txcs) && Number(value.txcs) < 3 && value.xmly == '是') {
						projectRemind = 'projectRemind';
					}
					html += "<div class='icon_p col-lg-2 col-md-2 col-sm-2 col-xs-2 " + projectRemind + "'>"
					html += "<div class='icon_project " + project_img + "'></div>"
					html += "</div>";

					html += "<div class='project_info col-lg-5 col-md-5 col-sm-5 col-xs-5'>";
					if (!varIsNull(value.bzdz)) {
						bzdzId = value.bzdz.substring(0, value.bzdz.indexOf('.'));
					}

					html += "<div class='projectName'><a href='/crm/project/projectDetail.html?id=" + value.id + "&xmbh=" + value.xmbh11 +
						"#/jd_" + bzdzId + "'>" + value.name + "</a></div>";
					html += "<div class='industry'>" + value.type + "</div>";
					html += "</div>";

					html += "<div class='icon_slid col-lg-5 col-md-5 col-sm-5 col-xs-5'>";
					html += "<div class='padding-0 col-lg-10 col-md-10 col-sm-10 col-xs-10'>";
					html += "<div class='date'>&nbsp;</div>";

					html += "<div class='date'>" + value.projectPeople +
						"</div>";
					html += "</div>";
					html += "<div class='padding-0 project_right col-lg-2 col-md-2 col-sm-2 col-xs-2'>";
					html += "<a class='pro_slid' onclick='Project.prototype.ProToggle(this)'>";
					html += "<span class='slid_up'></span>";
					html += "</a>";
					html += "</div>";
					html += "</div>";

					html += "<div class='pro_edit pro_edit_hidden'>";
					html += "<div class='col-xs-3 col-sm-3 col-md-3 col-lg-3 btn_editor'>";
					html += "<a href='/crm/visit/visitList.html?proId=" + value.id + "' data-proId='" + value.id + "'>";
					html += "<span class='visit editor-span'></span>";
					html += "<div class='lable_footer'>拜访</div>";
					html += "</a>";
					html += "</div>";

					html += "<div class='col-xs-3 col-sm-3 col-md-3 col-lg-3 btn_editor'>";
					html += "<a href='/crm/project/contactsRoleList.html?proId=" + value.id + "' data-proId='" + value.id + "'>";
					html += "<span class='contact editor-span'></span>";
					html += "<div class='lable_footer'>联系</div>";
					html += "</a>";
					html += "</div>";

					html += "<div class='col-xs-3 col-sm-3 col-md-3 col-lg-3 btn_editor'>";
					html += "<a href='/crm/project/attachmentList.html?proId=" + value.id + "&customerId=" + value.contractBodyId + "&xmbh=" +
						value.number + "' data-proId='" + value.id + "'>";
					html += "<span class='attachment editor-span'></span>";
					html += "<div class='lable_footer'>附件</div>";
					html += "</a>";
					html += "</div>";

					html += "<div class='col-xs-3 col-sm-3 col-md-3 col-lg-3 btn_editor'>";
					html += "<a href='javascript:void(0);' class='close_pro' data-proId='" + value.id + "' data-xmbh='" + value.number +
						"'>";
					html += "<span class='closepro editor-span'></span>";
					html += "<div class='lable_footer'>销项</div>";
					html += "</a>";
					html += "</div>";

					html += "</div>"; //pro_edit end

					html += "</div>";
				});
				if (pageNum > currentPage) {
					$("#projectList").append(html);
					currentPage = pageNum;
				}
				$(".close_pro").on("click", Project.prototype.ClosePro);

			} else {
				layer.msg("没有更多数据了！");
			}
			layer.close(index);
		})
		.catch(error => {
			layer.close(index);
			layer.msg("系统错误，请联系系统管理员！");
		});
}

Project.prototype.loadPorjectNum = function(stage, expressions) {
	var binding = Cookies.prototype.GetCookie('binding');
	var userId = Cookies.prototype.GetCookie('userId');
	var roleId = Cookies.prototype.GetCookie('roleId');
	var customerId = Common.prototype.GetQueryString('customerId');

	var filtertype = Common.prototype.GetQueryString("filtertype");

	if (varIsNull(expressions)) {
		expressions = "";
	}
	if (!varIsNull(customerId)) {
		if (!varIsNull(expressions)) {
			expressions = "(" + expressions + ") and o.khmc = '" + customerId + "'";
		} else {
			expressions += "o.khmc = '" + customerId + "'";
		}
	} else {
		expressions = (expressions != "" ? "(" + expressions + ")" : "");
	}
	if (expressions != "") {
		expressions = "and " + expressions;
	}
	//var expressions = "";
	if (!varIsNull(filtertype) && (filtertype == "kg" || filtertype == "wdg" || filtertype == "ywg")) {
		if (stage == "全部") {
			expressions =
				"select count(1) as num,sum(nvl(o.yjpchte,0)) totalmoney from xmbb o left join fwht f on o.xmbh11=f.xmbh11 and f.is_deleted <> '1' left join contract c on o.xmbh11=c.xmbh11 and c.is_deleted <> '1' left join ccuser u on f.ownerid=u.id left join Account ac on o.khmc=ac.id left join xtwtfk x on f.id = x.xmmc and x.is_deleted <>'1' where o.is_deleted <> '1' and o.dqjd !='0-销项项目' " +
				expressions + " and u.role in (select roleid from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";
		} else {
			expressions =
				"select count(1) as num,sum(nvl(o.yjpchte,0)) totalmoney from xmbb o left join fwht f on o.xmbh11=f.xmbh11 and f.is_deleted <> '1' left join contract c on o.xmbh11=c.xmbh11 and c.is_deleted <> '1' left join ccuser u on f.ownerid=u.id left join Account ac on o.khmc=ac.id left join xtwtfk x on f.id = x.xmmc and x.is_deleted <>'1' where o.is_deleted <> '1' and o.dqjd='" +
				stage + "' " + (stage == '3-项目签约' ? "and (o.bjxtj is null or o.bjxtj = 'false')" : "") + " " + expressions +
				" and u.role in (select roleid from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";
		}
	} else {
		if (stage == "全部") {
			expressions =
				"select count(1) as num,sum(nvl(o.yjpchte,0)) totalmoney from xmbb o left join fwht f on o.xmbh11=f.xmbh11 and f.is_deleted <> '1' left join contract c on o.xmbh11=c.xmbh11 and c.is_deleted <> '1' left join ccuser u on o.ownerid=u.id left join Account ac on o.khmc=ac.id left join xtwtfk x on f.id = x.xmmc and x.is_deleted <>'1' where o.is_deleted <> '1' and o.dqjd !='0-销项项目' " +
				expressions + " and u.role in (select roleid from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";
		} else {
			expressions =
				"select count(1) as num,sum(nvl(o.yjpchte,0)) totalmoney from xmbb o left join fwht f on o.xmbh11=f.xmbh11 and f.is_deleted <> '1' left join contract c on o.xmbh11=c.xmbh11 and c.is_deleted <> '1' left join ccuser u on o.ownerid=u.id left join Account ac on o.khmc=ac.id left join xtwtfk x on f.id = x.xmmc and x.is_deleted <>'1' where o.is_deleted <> '1' and o.dqjd='" +
				stage + "' " + (stage == '3-项目签约' ? "and (o.bjxtj is null or o.bjxtj = 'false')" : "") + " " + expressions +
				" and u.role in (select roleid from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";
		}
	}


	var params = "serviceName=cqlQuery&objectApiName=xmbb&expressions=" + encodeURIComponent(expressions) + "&binding=" +
		binding;
	$.ajax({
		type: "get",
		dataType: "json",
		url: url,
		data: params,
		success: function(data) {
			if (data != "") {
				if (data.result) {
					if (data.data.length > 0) {
						$("#proNum").html(data.data[0].num);
						$("#total").html(data.data[0].totalmoney);
					}
					return;
				} else {
					layer.msg(data.returnInfo);
				}
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			//debugger;
		}
	});
}

//项目销项
Project.prototype.ClosePro = function() {
	var id = $(this).data("proid");
	var xmbh = $(this).data("xmbh");
	var binding = Cookies.prototype.GetCookie('binding');
	var data = "[{";
	data += "\"id\":\"" + id + "\""; //项目Id
	data += ",\"dqjd\":\"0-销项项目\""; //仓数
	data += "}]";
	layer.confirm('确定要销项？', {
		btn: ['确定', '取消'] //按钮
	}, function() {
		// layer.msg("该功能暂未开放！");
		// return false;
		if (!varIsNull(binding)) {
			$.ajax({
				type: "post",
				dataType: "json",
				url: url,
				data: "serviceName=updateWithRoleRight&objectApiName=xmbb&data=" + encodeURIComponent(data) + "&binding=" +
					binding,
				success: function(data) {
					//加载联系人名称
					if (data != "") {
						if (data.result) {
							Project.prototype.CloseXmfa(xmbh);
							layer.msg("项目销项成功", function() {
								window.location.href = "/crm/project/project.html";
							});
							return;
						} else {
							layer.msg(data.returnInfo);
						}
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					//debugger;
				}
			});
		}
	}, function() {

	});

}

Project.prototype.CloseXmfa = function(xmbh) {
	var binding = Cookies.prototype.GetCookie('binding');
	var data = "[{";
	data += "\"xmbh11\":\"" + xmbh + "\""; //项目Id
	data += ",\"dqjd\":\"0-销项项目\"";
	data += "}]";

	if (!varIsNull(binding)) {
		$.ajax({
			type: "post",
			dataType: "json",
			url: url,
			data: "serviceName=updateWithRoleRight&objectApiName=xmfa&data=" + encodeURIComponent(data) + "&binding=" +
				binding,
			success: function(data) {
				//加载联系人名称
				if (data != "") {
					if (data.result) {
						Project.prototype.CloseContract(xmbh);
						return true;
					} else {
						layer.msg(data.returnInfo);
					}
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				//debugger;
			}
		});
	}
}

Project.prototype.CloseContract = function(xmbh) {
	var binding = Cookies.prototype.GetCookie('binding');
	var data = "[{";
	data += "\"xmbh11\":\"" + xmbh + "\""; //项目Id
	data += ",\"dqjd\":\"0-销项项目\""; //仓数
	data += "}]";

	if (!varIsNull(binding)) {
		$.ajax({
			type: "post",
			dataType: "json",
			url: url,
			data: "serviceName=updateWithRoleRight&objectApiName=contract&data=" + encodeURIComponent(data) + "&binding=" +
				binding,
			success: function(data) {
				if (data != "") {
					if (data.result) {
						return;
					} else {
						layer.msg(data.returnInfo);
					}
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				//debugger;
			}
		});
	}
}
