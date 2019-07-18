$(document).ready(function() {
	Common.prototype.checkLoginStatu();
});

let companyIds = '';
let projectType = '';

$(function() {
    // YDUI.dialog.loading.open('很快加载好了');
    $("#back-btn").on("click",function(){
        $(".search_content").hide();
        $("#back-btn").hide();
    })
    initUserListDropdown();
    initByDictValue();
    initDictionary();
    //点击跳转选择客户页面
    $("#accountId").on("click",function(){
        location.href='/mobile/searchCustomer.html?rtUrl=/mobile/visit/addvisit.html'
    })
    //获取客户信息参数
    initInfoAboutAccount();
});



//获取联系人下拉框
function initContact(accountId){
    $("#ContactList").html(""); //绑定模号下拉菜单
    $("#ContactList").append($("<option value=\"\">－请选择－</option>"));
  //  let accountId =  $("#accountName").attr("name");
    axios.post("/api/contact/selectContactList","accountId="+accountId)
    .then(res =>{
        for (var i = 0; i < res.data.length; i++) {
            $("#ContactList").append($("<option value=\"" + res.data[i].id + "\">" + res.data[i].name + "</option>"));
        }
    });
}

//获取对应项目下拉框
function initProject(accountId){
    $("#ProjectList").html(""); //绑定模号下拉菜单
    $("#ProjectList").append($("<option value=\"\">－请选择－</option>"));
	//let accountId = $("#accountName").attr("name");
    axios.post("/api/visit/selectProjectList","accountId="+accountId)
        .then(res =>{
        for (var i = 0; i < res.data.length; i++) {
            $("#ProjectList").append($("<option value=\"" + res.data[i].id + "\">" + res.data[i].name + "</option>"));
        }
    });
}

//获取微信提醒对象
function initUserListDropdown(){
    $("#UserListDropdown").html(""); //绑定模号下拉菜单
    $("#UserListDropdown").append($("<option value=\"\">－请选择－</option>"));
   axios.post("/api/visit/queryUserListDropdown").then(res => {
         for (var i = 0; i < res.data.length; i++) {
             $("#UserListDropdown").append($("<option value=\"" + res.data[i].id + "\">" + res.data[i].name + "</option>"));
         }
    });
}

//获取拜访方式
function initByDictValue(){
    $("#visitWayList").html(""); //绑定模号下拉菜单
    $("#visitWayList").append($("<option value=\"\">－请选择－</option>"));
    axios.post("/api/dictionary/findDictionaryByDictValue","dictValue=visitWay")
        .then(res =>{
            for (var i = 0; i < res.data.length; i++) {
                $("#visitWayList").append($("<option value=\"" + res.data[i].dataName + "\">" + res.data[i].dataName + "</option>"));
            }
        })
}

//获取拜访目的
function initDictionary(){
    $("#DictionaryByDictValue").html(""); //绑定模号下拉菜单
    $("#DictionaryByDictValue").append($("<option value=\"\">－请选择－</option>"));
    axios.post("/api/dictionary/findDictionaryByDictValue","dictValue=visitGoal")
        .then(res =>{
            for (var i = 0; i < res.data.length; i++) {
                $("#DictionaryByDictValue").append($("<option value=\"" + res.data[i].dataName + "\">" + res.data[i].dataName + "</option>"));
            }
        });
}

//获取客户信息参数
function initInfoAboutAccount(){
    var id = Common.prototype.GetQueryString("id");
    var name = decodeURIComponent(Common.prototype.GetQueryString("name"));
    if(name != "null"){
        $("#accountId").val(name);
    }else {
        $("#accountId").val("");
    }
    $("#accountId").attr("name",id);
    initContact(id);
    initProject(id);

}






