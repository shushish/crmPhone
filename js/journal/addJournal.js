$(document).ready(function() {
	Common.prototype.checkLoginStatu();
});
//
// let companyIds = '';
// let projectType = '';
//
$(function() {
    // YDUI.dialog.loading.open('很快加载好了');
    //加载默认日期
//     var year = new Date().getFullYear();
//     $(".beginTime").val(year + "-01-01");
//     $(".endTime").val((year + 1) + "-01-01");
//
//     //绑定时间选择事件
//     $(".btn_time").on("click", function () {
//         $(".search_content").css("display", "block");
//     })
//
//     $("#back-btn").on("click",function(){
//         $(".search_content").hide();
//         $("#back-btn").hide();
//     })
//
//     $("#btn_search").on("click",function(){
//         $(".search_content").hide();
//         $("#back-btn").hide();
//         indexObj.loadNormData();
//     })
    // initAccount();
    // initContact();
    initvisit();
    // initUserListDropdown();
    // initByDictValue();
    // initDictionary();
});
//
// function initAccount(){
//     let str="";
//     $("#accountList").html(""); //绑定模号下拉菜单
//     $("#accountList").append($("<option value=\"0\">－请选择－</option>"));
//     axios({
// 		url:"/api/account/queryAccountList",
// 		method:"post"
// 	}).then(res =>{
// 		let accoutList = res.data;
//         for (var i = 0; i < res.data.length; i++) {
//             $("#accountList").append($("<option value=\"" + res.data[i].id + "\">" + res.data[i].name + "</option>"));
//         }
// 	});
// }
//获取联系人下拉框
// function initContact(){
//     let str="";
//     $("#ContactList").html(""); //绑定模号下拉菜单
//     $("#ContactList").append($("<option value=\"0\">－请选择－</option>"));
//     let acountId = $("#accountList").val();
//     axios.post("/api/contact/selectContactList","id=acountId")
//     .then(res =>{
//         let ContactList = res.data;
//         for (var i = 0; i < res.data.length; i++) {
//             $("#ContactList").append($("<option value=\"" + res.data[i].id + "\">" + res.data[i].name + "</option>"));
//         }
//     });
// }

//获取微信提醒对象
// function initUserListDropdown(){
//     $("#UserListDropdown").html(""); //绑定模号下拉菜单
//     $("#UserListDropdown").append($("<option value=\"0\">－请选择－</option>"));
//    axios.post("/api/visit/queryUserListDropdown").then(res => {
//          let accoutList = res.data;
//          for (var i = 0; i < res.data.length; i++) {
//              $("#UserListDropdown").append($("<option value=\"" + res.data[i].id + "\">" + res.data[i].name + "</option>"));
//          }
//     });
// }
//
// //获取拜访方式
// function initByDictValue(){
//     // return axios.post("/api/dictionary/findDictionaryByDictValue","dictValue=visitGoal")
//     $("#visitWayList").html(""); //绑定模号下拉菜单
//     $("#visitWayList").append($("<option value=\"0\">－请选择－</option>"));
//     axios.post("/api/dictionary/findDictionaryByDictValue","dictValue=visitWay")
//         .then(res =>{
//             let accoutList = res.data;
//             for (var i = 0; i < res.data.length; i++) {
//                 $("#visitWayList").append($("<option value=\"" + res.data[i].id + "\">" + res.data[i].dataName + "</option>"));
//             }
//         })
//
// }
// //获取拜访目的
// function initDictionary(){
//   /*  return axios.post("/api/dictionary/findDictionaryByDictValue","dictValue=visitWay")*/
//     $("#DictionaryByDictValue").html(""); //绑定模号下拉菜单
//     $("#DictionaryByDictValue").append($("<option value=\"0\">－请选择－</option>"));
//
//     axios.post("/api/dictionary/findDictionaryByDictValue","dictValue=visitGoal")
//         .then(res =>{
//             let accoutList = res.data;
//             for (var i = 0; i < res.data.length; i++) {
//                 $("#DictionaryByDictValue").append($("<option value=\"" + res.data[i].id + "\">" + res.data[i].dataName + "</option>"));
//             }
//         });
//
// }
//
// //获取拜访目的
// function initCy(){
//     debugger
//
//
// }
