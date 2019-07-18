$(document).ready(function () {
    Common.prototype.checkLoginStatu();
});

$(function () {
    $(".back").on("click", Common.prototype.Back);
    $(".approval").on("click", Customer.prototype.submitData);
    //绑定遮罩点击事件
    $(".masked").on("click", function () {
        Common.prototype.CloseMaskLayer("close-with-masklayer", Customer.prototype.MaskedClick);
    });

    //绑定搜索按钮点击事件，打开搜索菜单
    $(".btn_search").on("click", function () {
        Common.prototype.ShowMaskLayer();
        $(".search_content").css("display", "block");
        $(".addproject").css("display", "none");
        $(".filterName").html("全部");
        Customer.prototype.ShowSearchBackBtn();

    });

    //行业输入框点击事件，打开行业选择菜单
    $(".industry_input").on("click", function () {
        $(".industry_content").css("display", "block");
        Customer.prototype.ShowIndustryBackBtn();
    });

    //重置按钮点击事件
    $("#btn_reset").on("click", function () {
        Customer.prototype.ResetSearch();
    });

    //搜索按钮点击事件，搜索功能
    $("#btn_search").on("click", function () {
        currentPage = 0;
        var nameKeyWord = $(".proname").val();
        var creatorKeyWord = $(".creator").val();
        var expressions = "";
        if (nameKeyWord != null && nameKeyWord != undefined && $.trim(nameKeyWord) != "") {
            expressions += "o.name like '%" + nameKeyWord + "%'";
        }
        if (creatorKeyWord != null && creatorKeyWord != undefined && $.trim(creatorKeyWord) != "") {
            if (expressions != "") {
                expressions += " or ";
            }
            expressions += "u.name like '%" + creatorKeyWord + "%'";
        }
        Customer.prototype.LoadCustomer(1, 15, expressions);

        Common.prototype.CloseMaskLayer("close-with-masklayer", Customer.prototype.MaskedClick);
    });

    //按条件筛选功能
    $(".dropdown-menu").find("li").on("click", function () {
        var select = $(this).html();
        $(".filterName").html(select);        
        currentPage = 0;
        if(select == "全部"){
            Customer.prototype.LoadCustomer(1, 15);
        }else{
            Customer.prototype.LoadCustomer(1, 15, "o.dqjd= '" + select + "'");
        }
        //$(".dropdown-menu").html(select);
        
    });

    Customer.prototype.LoadCustomerNum("","全部");
    Customer.prototype.LoadCustomer(1, 15);
	

});

var Customer = function () {};

//显示搜索返回按钮
Customer.prototype.ShowSearchBackBtn = function () {
    $(".back").css("display", "block");
    $(".back").off("click", Common.prototype.Back);
    $(".back").on("click", Customer.prototype.SearchBack);
};

//搜索返回
Customer.prototype.SearchBack = function () {
    Common.prototype.CloseMaskLayer("close-with-masklayer", Customer.prototype.MaskedClick);
};

//遮罩点击时需要执行的操作
Customer.prototype.MaskedClick = function () {
    $(".back").off("click", Customer.prototype.SearchBack);
    // $(".back").css("display", "none");
    $(".back").on("click", Common.prototype.Back);
    $(".addproject").css("display", "block");
    Customer.prototype.ResetSearch();
}

//显示行业选择返回按钮
Customer.prototype.ShowIndustryBackBtn = function () {
    $(".back").off("click");
    $(".back").on("click", Customer.prototype.IndustryBack);
};

//行业选择返回
Customer.prototype.IndustryBack = function () {
    $(".back").off("click");
    $(".industry_content").css("display", "none");
    $(".back").on("click", Customer.prototype.SearchBack);
};

Customer.prototype.ResetSearch = function () {
    $(".search_content").find("input").val("");
};

$(window).scroll(function () {
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
        Customer.prototype.LoadCustomer(currentPage + 1, 15, currentExpressions);
    }
});


//---------------------获取数据------------------------------------------------------
var currentPage = 0;
var currentExpressions = "";


Customer.prototype.LoadCustomer = function (pageNum, pageSize, expressions) {
    var binding = Cookies.prototype.GetCookie('binding');
    //console.log("binding:"+binding);
    var userId = Cookies.prototype.GetCookie('userId');
    var roleId = Cookies.prototype.GetCookie('roleId');
	var title = Cookies.prototype.GetCookie('role');
    var begin = (pageNum - 1) * pageSize + 1;
    var end = begin + pageSize - 1;
    if (expressions == null || expressions == undefined || $.trim(expressions) == "") {
        //无条件 列表
        expressions = "select * from (select A.*,ROWNUM RN from (select o.*,u.name ownername from xmbb o,ccuser u where o.ownerid=u.id and o.is_deleted <> '1' and o.sfycjxm<>'是' and o.dqjd not in ('0-销项项目','3-项目签约') and u.role in (select roleid from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) order by o.lastmodifydate desc) A where ROWNUM <= " + end + ") where RN >= " + begin;
        currentExpressions = "";
    } else {
        currentExpressions = expressions;
        //expressions = "select * from (select A.*,ROWNUM RN from (select o.*,u.name ownername from xmbb o,ccuser u where o.ownerid=u.id and o.is_deleted <> '1' and (" + expressions + ") and u.role in (select roleid from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) order by o.lastmodifydate desc) A where ROWNUM <= " + end + ") where RN >= " + begin;
        expressions = "select * from (select A.*,ROWNUM RN from (select o.*,u.name ownername from xmbb o,ccuser u where o.ownerid=u.id and o.is_deleted <> '1' and (" + expressions + ") and o.sfycjxm<>'是' and o.dqjd not in ('0-销项项目','3-项目签约') and u.role in (select roleid from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0) order by o.lastmodifydate desc) A where ROWNUM <= " + end + ") where RN >= " + begin;
    }
	if(title == '总监'){
		//expressions = expressions.replace("o.sfycjxm<>'是'","o.sfycjxm<>'是'");
	}else if(title == '副总'){
		expressions = expressions.replace("o.sfycjxm<>'是'","o.sfycjxm='是' and (o.ycjqr is null or o.ycjqr<>'已确认')");
	}else{
		expressions = "";
	}
    
    var params = "serviceName=cqlQuery&objectApiName=xmbb&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding;
    //console.log(params);
    
    if (pageNum <= currentPage) {
        return;
    }
    var index = layer.load(1, {
        shade: false
    });
    $.ajax({
        type: "get",
        dataType: "json",
        url: url,
        data: params,
        async:false,
        success: function (data) {
        	//console.log(data);
        	var data_month=[
        		//{"mon":"2018年08月","week":["31周","32周","33周","34周","35周"]},
        		{"mon":"2019年01月","week":["01周","02周","03周","04周","05周"]},
        		{"mon":"2019年02月","week":["05周","06周","07周","08周","09周"]},
				{"mon":"2019年03月","week":["09周","10周","11周","12周","13周","14周"]},
				{"mon":"2019年04月","week":["14周","15周","16周","17周","18周"]},
				{"mon":"2019年05月","week":["18周","19周","20周","21周","22周"]},
				{"mon":"2019年06月","week":["22周","23周","24周","25周","26周","27周"]},
				{"mon":"2019年07月","week":["27周","28周","29周","30周","31周"]},
				{"mon":"2019年08月","week":["31周","32周","33周","34周","35周"]},
				{"mon":"2019年09月","week":["36周","37周","38周","39周","40周"]},
				{"mon":"2019年10月","week":["40周","41周","42周","43周","44周"]},
        		{"mon":"2019年11月","week":["44周","45周","46周","47周","48周"]},
        		{"mon":"2019年12月","week":["49周","50周","51周","52周","53周"]}
        	];
            if (data != "") {
                if (data.result) {
                	//console.log(data.data);
                    if (pageNum == 1) {
                        $("#projectList").html("");
                    }
                    if (data.data.length > 0) {
                        var html = '';
                        data.data.forEach(function (value, index) {
                            var temp = '<div class="pro" style="height:150px;"><div class="project_info col-lg-9 col-md-9 col-sm-9 col-xs-9" style="width: 100%;">';
                            temp += '<div class="projectName" style="margin-bottom: 5px;"><a href="/crm/project/projectDetail.html?id='+value.id+'&xmbh='+value.xmbh11+'#/jd_1">'+value.name+'</a></div>';
                            temp +='<div class="projectName" ><select class="longselect" name="ycjyy" id="'+value.id+'ycjyy" onchange="showOther(\''+value.id+'\');"><option value="'+value.id+'_0">请选择预成交原因</option><option value="'+value.id+'_1" select="1">已中标,暂未下发通知书</option><option value="'+value.id+'_2" select="2">甲方在走签约流程</option><option value="'+value.id+'_4" select="4">进入招投标</option><option value="'+value.id+'_5" select="5">二次合作或多次合作项目</option><option value="'+value.id+'_6" select="6">甲方合作意愿明朗、指定</option><option value="'+value.id+'_7" select="7">项目推进时间节点、落地时间明朗</option><option value="'+value.id+'_8" select="8">重点跟进项目，团队拿下项目意识强烈</option><option value="'+value.id+'_3" select="3">其他</option></select></div>';
                          	temp +='<div class="projectName"><input style="background-color: buttonface;display:none;" class="longselect" id="'+value.id+'qt" /></div>';  
							if("已中标"==value.ycjyy){
								temp=temp.replace(/select="1"/,'selected="selected"');
							}else if("在签约"==value.ycjyy){
								temp=temp.replace(/select="2"/,'selected="selected"');
							}else if("进入招投标"==value.ycjyy){
								temp=temp.replace(/select="4"/,'selected="selected"');
							}else if("有过合作"==value.ycjyy){
								temp=temp.replace(/select="5"/,'selected="selected"');
							}else if("甲方指定"==value.ycjyy){
								temp=temp.replace(/select="6"/,'selected="selected"');
							}else if("时间明朗"==value.ycjyy){
								temp=temp.replace(/select="7"/,'selected="selected"');
							}else if("重点跟进项目"==value.ycjyy){
								temp=temp.replace(/select="8"/,'selected="selected"');
							}else if("其他"==value.ycjyy){
								temp=temp.replace(/select="3"/,'selected="selected"');
								temp=temp.replace(/display:none;/,' ');
								temp=temp.replace(/style="height:150px;"/,'style="height:180px;"');
							}
							temp +='<div class="projectName"><select class="shorselect" id="'+value.id+'yf" onchange="weekChange(\''+value.id+'\');">';
							//<option value='+1+'>2018年06月</option><option value='+2+'>2018年07月</option><option value='+3+'>2018年08月</option><option value='+4+'>2018年09月</option><option value='+5+'>2018年10月</option><option value='+6+'>2018年11月</option><option value='+7+'>2018年12月</option>
							var week=null;
							for(var i=0;i<data_month.length;i++){
								if(value.ycjyf==data_month[i].mon){
									week = data_month[i].week;
									temp += '<option selected="selected">'+data_month[i].mon+'</option>';
								}else{
									temp += '<option>'+data_month[i].mon+'</option>';
								}
							}
							
							temp +='</select>';
							temp +='<select class="shorselect" id="'+value.id+'zs">';
							if(week!=null){
								for(var i=0;i<week.length;i++){
									if(value.ycjzs==week[i]){
										temp += '<option selected="selected">'+week[i]+'</option>';
									}else{
										temp += '<option>'+week[i]+'</option>';
									}
								}
							}
							temp +='</select></div>';
							temp +='<div class="projectName" ><select class="longselect" name="jhyf" id="'+value.id+'jhyf" ><option>请选择预计交货时间</option>';
							for(var i=0;i<data_month.length;i++){
								if(value.jhyf==data_month[i].mon){
									week = data_month[i].week;
									temp += '<option selected="selected">'+data_month[i].mon+'</option>';
								}else{
									temp += '<option>'+data_month[i].mon+'</option>';
								}
							}
							temp +='</select></div>';
							
							if(value.dqjd=='0-项目线索'){
								temp +='<div class="projectName"><select class="longselect" id="'+value.id+'dz"><option disabled="true" value='+1+'>1.客户关系介入</option><option disabled="true" value='+2+'>2.甲方内部情况摸查、陌拜</option><option value='+3+'>3.甲方设计主管（TB）首拜</option><option value='+4+'>4.甲方决策人（EB）首拜</option><option>5.邀请甲方考察</option><option>6.技术交流会</option><option>7.落实项目信息/图纸</option></select></div>';								
							}else if(value.dqjd=='1-项目立项'){
								temp +='<div class="projectName"><select class="longselect" id="'+value.id+'dz"><option>8.项目技术交流会</option><option>9.整体方案专属建议书</option><option>10.设计咨询合同签订</option><option>11.PC深化设计合同签订</option><option>12.报价/项目招投标</option></select></div>';
							}else if(value.dqjd=='2-项目推进'){
								temp +='<div class="projectName"><select class="longselect" id="'+value.id+'dz"><option>13.PC采购合同商务洽谈</option></select></div>';
							}
							if(value.bzdz=='3.甲方设计主管（TB）首拜'){
								temp=temp.replace(/select="b3"/,'selected="selected"');
							}else if(value.bzdz=='4.甲方决策人（EB）首拜'){
								temp=temp.replace(/select="b4"/,'selected="selected"');								
							}else if(value.bzdz=='5.邀请甲方考察'){
								temp=temp.replace(/select="b5"/,'selected="selected"');
							}else if(value.bzdz=='6.技术交流会'){
								temp=temp.replace(/select="b6"/,'selected="selected"');
							}else if(value.bzdz=='7.落实项目信息/图纸'){
								temp=temp.replace(/select="b7"/,'selected="selected"');
							}else if(value.bzdz=='8.项目技术交流会'){
								temp=temp.replace(/select="b8"/,'selected="selected"');
							}else if(value.bzdz=='9.整体方案专属建议书'){
								temp=temp.replace(/select="b9"/,'selected="selected"');
							}else if(value.bzdz=='10.设计咨询合同签订'){
								temp=temp.replace(/select="b10"/,'selected="selected"');
							}else if(value.bzdz=='11.PC深化设计合同签订'){
								temp=temp.replace(/select="b11"/,'selected="selected"');
							}else if(value.bzdz=='12.报价/项目招投标'){
								temp=temp.replace(/select="b12"/,'selected="selected"');
							}else if(value.bzdz=='13.PC采购合同商务洽谈'){
								temp=temp.replace(/select="b13"/,'selected="selected"');
							}
                            temp += "</div></div><br/>";
							html += temp;
                        });
                        if (pageNum > currentPage) {
                            $("#projectList").append(html);
                            currentPage = pageNum;
                            	$(".longselect").css("width","98%");
								$(".shorselect").css("width","48.9%");
                        }
                        $(".close_pro").on("click", Customer.prototype.ClosePro);
                    } else {
                        layer.msg("没有更多数据了！");
                    }
                    layer.close(index);
                    return;
                } else {
                    layer.msg(data.returnInfo);
                }
            }
            layer.close(index);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //debugger;
            layer.close(index);
        }
    });
}

Customer.prototype.submitData = function () {
	var binding = Cookies.prototype.GetCookie('binding');
	var title = Cookies.prototype.GetCookie('role');
	var data=[];
	$("select[name='ycjyy'] option:selected").each(function(index,element){
		var ycjyy=$(this).val();
		var ycjyys=ycjyy.split("_");
		var id="";
		var obj={};
		if(ycjyys.length>1){
			id=ycjyys[0];
			ycjyy=ycjyys[1];
			console.log(title);
			if(title=="总监"){
				if(ycjyy!='0'){
					var time = new Date();   // 程序计时的月从0开始取值后+1   
					var m = time.getMonth() + 1;   
					var t = time.getFullYear() + "-" + m + "-" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds(); 
					
					if("1"==ycjyy){
						obj.ycjyy='已中标';
					}else if("2"==ycjyy){
						obj.ycjyy='在签约';
					}else if("4"==ycjyy){
						obj.ycjyy='进入招投标';
					}else if("5"==ycjyy){
						obj.ycjyy='有过合作';
					}else if("6"==ycjyy){
						obj.ycjyy='甲方指定';
					}else if("7"==ycjyy){
						obj.ycjyy='时间明朗';
					}else if("8"==ycjyy){
						obj.ycjyy='重点跟进项目';
					}else if("3"==ycjyy){
						obj.ycjyy='其他';
						var ycjyy_qt=$("#"+id+"qt").val();
						if(ycjyy_qt){
							obj.ycjqtyy=ycjyy_qt;
						}else{
							alert("预成交原因选择其他时，必须说明原因！");
							return;
						}
					}
	//				var jhyf = $("#"+id+"jhyf").find("option:selected").text();
	//				if(jhyf=='请选择预计交货时间'){
	//					layer.msg("请选择预计交货时间！");
	//					return;
	//				}
					obj.id = id;
					obj.sfycjxm = '是';
					obj.ycjyf = $("#"+id+"yf").find("option:selected").text();
					obj.scycjyf = $("#"+id+"yf").find("option:selected").text();
					obj.ycjtjsj = t;
					obj.bzdz = $("#"+id+"dz").find("option:selected").text();
					obj.jhyf = $("#"+id+"jhyf").find("option:selected").text();
					obj.ycjzs = $("#"+id+"zs").find("option:selected").text();
					data.push(obj);

				}
			}else if(title == "副总"){
				if("1"==ycjyy){
					obj.ycjyy='已中标';
				}else if("2"==ycjyy){
					obj.ycjyy='在签约';
				}else if("4"==ycjyy){
					obj.ycjyy='进入招投标';
				}else if("5"==ycjyy){
					obj.ycjyy='有过合作';
				}else if("6"==ycjyy){
					obj.ycjyy='甲方指定';
				}else if("7"==ycjyy){
					obj.ycjyy='时间明朗';
				}else if("8"==ycjyy){
					obj.ycjyy='重点跟进项目';
				}else if("3"==ycjyy){
					obj.ycjyy='其他';
					var ycjyy_qt=$("#"+id+"qt").val();
					if(ycjyy_qt){
						obj.ycjqtyy=ycjyy_qt;
					}else{
						alert("预成交原因选择其他时，必须说明原因！");
						return;
					}
				}
				obj.id = id;
				if(ycjyy!='0'){
					obj.sfycjxm = '是';
					obj.ycjqr = '已确认';
				}else{
					obj.sfycjxm = '否';
				}
				obj.ycjyf = $("#"+id+"yf").find("option:selected").text();
				obj.bzdz = $("#"+id+"dz").find("option:selected").text();
				obj.jhyf = $("#"+id+"jhyf").find("option:selected").text();
				obj.ycjzs = $("#"+id+"zs").find("option:selected").text();
				data.push(obj);
			}
		}

//		alert()
//  	console.log(element["attr"]);
       
	});
    //console.log(JSON.stringify(data));
    //return;
    $.ajax({
    	type:"post",
    	//url:"http://app1.cloudcc.com/distributor.action?serviceName=update&objectApiName=Contact&binding=8E1B6C79210BC222567CC5E404EE8794",
    	url:"http://app1.cloudcc.com/distributor.action?serviceName=update",
    	async:false,
    	data:{
    		"objectApiName":"xmbb",
    		"binding":binding,
    		"data":JSON.stringify(data)
    	},
    	success: function (data) {
    		//console.log(data);
    		window.location.href="/crm/index.html";
    	},
    	error:function (XMLHttpRequest, textStatus, errorThrown) {
    		console.log(XMLHttpRequest);
    		console.log(textStatus);
            //layer.close();
        }
    });
    
}

Customer.prototype.LoadCustomerNum = function (fieldName,stage) {
    var binding = Cookies.prototype.GetCookie('binding');
    var userId = Cookies.prototype.GetCookie('userId');
    var roleId = Cookies.prototype.GetCookie('roleId');
    var expressions = "";
    if (stage == "全部") {
        expressions = "select count(1) as num from Account o,ccuser u where o.ownerid=u.id and o.is_deleted <> '1' and u.role in (select roleid from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";
    } else {
        expressions = "select count(1) as num from Account o,ccuser u where o.ownerid=u.id and o.is_deleted <> '1' and o."+fieldName+"='" + stage + "' and u.role in (select roleid from tp_sys_role where parentrole_id='" + roleId + "' and gap >=0)";
    }

    var params = "serviceName=cqlQuery&objectApiName=Account&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding;
    $.ajax({
        type: "get",
        dataType: "json",
        url: url,
        data: params,
        success: function (data) {
            if (data != "") {
                if (data.result) {
                    if (data.data.length > 0) {
                        //$("#proNum").html(data.data[0].num);                        
                    }
                    return;
                } else {
                    layer.msg(data.returnInfo);
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //debugger;
        }
    });
}

Customer.prototype.ProToggle = function (obj) {
    var editBlock = $(obj).parents(".pro").children(".pro_edit");
    if (editBlock.hasClass("pro_edit_hidden")) {
        editBlock.removeClass("pro_edit_hidden");
        $(obj).children(".slid_up").addClass("reversal");
    } else {
        editBlock.addClass("pro_edit_hidden");
        $(obj).children(".slid_up").removeClass("reversal");
    }
};

function showOther(id){
	var val_yy=$("#"+id+"ycjyy").val();
	val_yy=val_yy.split("_")[1];
	if(val_yy=="3"){
		$("#"+id+"qt").parent().parent().parent().css("height","180px");
        $("#"+id+"qt").css("display","block");
    }else{
    	$("#"+id+"qt").parent().parent().parent().css("height","150px");
        $("#"+id+"qt").css("display","none");
    }
	//alert(val_yy);
}

function weekChange(id){
	var data_month=[
        		{"mon":"2019年01月","week":["01周","02周","03周","04周","05周"]},
        		{"mon":"2019年02月","week":["05周","06周","07周","08周","09周"]},
				{"mon":"2019年03月","week":["09周","10周","11周","12周","13周","14周"]},
				{"mon":"2019年04月","week":["14周","15周","16周","17周","18周"]},
				{"mon":"2019年05月","week":["18周","19周","20周","21周","22周"]},
				{"mon":"2019年06月","week":["22周","23周","24周","25周","26周","27周"]},
				{"mon":"2019年07月","week":["27周","28周","29周","30周","31周"]},
				{"mon":"2019年08月","week":["31周","32周","33周","34周","35周"]},
				{"mon":"2019年09月","week":["36周","37周","38周","39周","40周"]},
				{"mon":"2019年10月","week":["40周","41周","42周","43周","44周"]},
        		{"mon":"2019年11月","week":["44周","45周","46周","47周","48周"]},
        		{"mon":"2019年12月","week":["49周","50周","51周","52周","53周"]}
    ];
	var month=$("#"+id+"yf").val();
	var week=document.getElementById(id+"zs");
	var add=null;
	for(var i=0;i<data_month.length;i++){
		if(month==data_month[i].mon){
			add=data_month[i].week;
			break;
		}
	}
	week.length=0;
	if(add==null){
		return;
	}
	for(var i=0;i<add.length;i++){
		var option=new Option();
		option.value=add[i];
		option.text=add[i];
		week.add(option);
	}
	//alert(month);
}
