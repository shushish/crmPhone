$(document).ready(function () {
    Common.prototype.checkLoginStatu();
});

$(function () {
    $(".back").on("click", Common.prototype.Back);
    $(".masked").on("click", Common.prototype.CloseMaskLayer);
    $(".projectSurvey-edit").on('click', AttachmentList.prototype.UploadFile);
    $("#fileUpload").on('change', function () {
        layer.load(1, {
            content: '上传中请稍后',
            shade: [0.4, '#393D49'],
            // time: 10 * 1000,
            success: function (layero) {
                //layero.css('padding-left', '30px');
                layero.find('.layui-layer-content').css({
                    'padding-top': '40px',
                    'width': '81px',
                    'background-position-x': '16px'
                });
            }
        });
        $("#myForm").submit();
        $(this).val("");
    });
    AttachmentList.prototype.LoadZlxyAttachments();
    AttachmentList.prototype.LoadAttachments();
    AttachmentList.prototype.LoadXmbjAttachments();
    AttachmentList.prototype.LoadXmqyAttachments();
    AttachmentList.prototype.LoadXmjfAttachments();
});

var AttachmentList = function () {};

AttachmentList.prototype.LoadAttachments = function () {
    var binding = Cookies.prototype.GetCookie('binding');
    var id = Common.prototype.GetQueryString("proId");
    var expressions = "relatedid = '" + id + "'";
    $(".attachments").data("relatedid", id);
    var params = "serviceName=cqueryWithRoleRight&objectApiName=Attachement&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding + "&isAddDelete=" + false;

    var index = layer.load(1, {
        shade: false
    });
    $.ajax({
        type: "get",
        dataType: "json",
        url: url,
        data: params,
        success: function (data) {
            if (data != "") {
                if (data.result) {
                    $("#xmlxNum").html(data.data.length);
                    $("#sjhtNum").html(data.data.length);
                    //$("#contactsRoleList").html("");
                    if (data.data.length > 0) {
                        var html = "";
                        data.data.forEach(function (value, index) {
                            html += "<div class='pro'>";
                            html += "<a href='javascript:void(0);' class='download' data-id='" + value.id + "'>";
                            html += "<div class='icon_p col-lg-2 col-md-2 col-sm-2 col-xs-2'>";
                            html += "<div class='icon_project attachment'></div>";
                            html += "</div>";
                            html += "<div class='project_info col-lg-9 col-md-9 col-sm-9 col-xs-9'>";
                            html += "<div class='projectName'>" + value.name + value.suffix + "</div>";
                            html += "<div class='industry'>" + parseInt(parseInt(value.attachementsize) / 1024) + "KB" + "</div>";
                            html += "<div class='industry'>" + value.createdate + "</div>";
                            html += "</div>";
                            html += "<div class='icon_slid col-lg-1 col-md-1 col-sm-1 col-xs-1'>";
                            html += "<span class='slid_up'></span>";
                            html += "</div>";
                            html += "</a>";
                            html += "</div>";
                        });
                        $("#xmlxList").append(html);
                        $("#sjhtList").append(html);
                        $("#xmlxList").find(".download").on("click", AttachmentList.prototype.DownLoad);
                        $("#sjhtList").find(".download").on("click", AttachmentList.prototype.DownLoad);
                    } else {
                        // layer.msg("没有更多数据了！");
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
};

AttachmentList.prototype.LoadZlxyAttachments = function () {
    var binding = Cookies.prototype.GetCookie('binding');
    var id = Common.prototype.GetQueryString("proId");
    var customerId = Common.prototype.GetQueryString("customerId");
    var expressions = "relatedid = '" + customerId + "'";
    var params = "serviceName=cqueryWithRoleRight&objectApiName=Attachement&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding + "&isAddDelete=" + false;

    $(".zlxy").data("relatedid", customerId);

    var index = layer.load(1, {
        shade: false
    });
    $.ajax({
        type: "get",
        dataType: "json",
        url: url,
        data: params,
        success: function (data) {
            if (data != "") {
                if (data.result) {
                    $("#zlxyNum").html(data.data.length);
                    // $("#sjhtNum").html(data.data.length);
                    //$("#contactsRoleList").html("");
                    if (data.data.length > 0) {
                        var html = "";
                        data.data.forEach(function (value, index) {
                            html += "<div class='pro'>";
                            html += "<a href='javascript:void(0);' class='download' data-id='" + value.id + "'>";
                            html += "<div class='icon_p col-lg-2 col-md-2 col-sm-2 col-xs-2'>";
                            html += "<div class='icon_project attachment'></div>";
                            html += "</div>";
                            html += "<div class='project_info col-lg-9 col-md-9 col-sm-9 col-xs-9'>";
                            html += "<div class='projectName'>" + value.name + value.suffix + "</div>";
                            html += "<div class='industry'>" + parseInt(parseInt(value.attachementsize) / 1024) + "KB" + "</div>";
                            html += "<div class='industry'>" + value.createdate + "</div>";
                            html += "</div>";
                            html += "<div class='icon_slid col-lg-1 col-md-1 col-sm-1 col-xs-1'>";
                            html += "<span class='slid_up'></span>";
                            html += "</div>";
                            html += "</a>";
                            html += "</div>";
                        });
                        $("#zlxyList").append(html);
                        $("#zlxyList").find(".download").on("click", AttachmentList.prototype.DownLoad);
                    } else {
                        // layer.msg("没有更多数据了！");
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
};

AttachmentList.prototype.LoadXmbjAttachments = function () {
    var binding = Cookies.prototype.GetCookie('binding');
    var xmbh = Common.prototype.GetQueryString("xmbh");
    var expressions = "select a.id,a.name,a.suffix,a.attachementsize,a.createdate,x.id as relatedid from Attachement a full join xmfa x on a.relatedid = x.id where x.xmbh11 = '" + xmbh + "' and x.is_deleted <> '1'";
    var params = "serviceName=cqlQuery&objectApiName=Attachement&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding;

    var index = layer.load(1, {
        shade: false
    });
    $.ajax({
        type: "get",
        dataType: "json",
        url: url,
        data: params,
        success: function (data) {
            if (data != "") {
                if (data.result) {
                    
                    //$("#contactsRoleList").html("");
                    if (data.data.length > 0) {
                        var html = "";
                        var num = 0;
                        data.data.forEach(function (value, index) {
                            if (!varIsNull(value.id)) {
                                html += "<div class='pro'>";
                                html += "<a href='javascript:void(0);' class='download' data-id='" + value.id + "'>";
                                html += "<div class='icon_p col-lg-2 col-md-2 col-sm-2 col-xs-2'>";
                                html += "<div class='icon_project attachment'></div>";
                                html += "</div>";
                                html += "<div class='project_info col-lg-9 col-md-9 col-sm-9 col-xs-9'>";
                                html += "<div class='projectName'>" + value.name + value.suffix + "</div>";
                                html += "<div class='industry'>" + parseInt(parseInt(value.attachementsize) / 1024) + "KB" + "</div>";
                                html += "<div class='industry'>" + value.createdate + "</div>";
                                html += "</div>";
                                html += "<div class='icon_slid col-lg-1 col-md-1 col-sm-1 col-xs-1'>";
                                html += "<span class='slid_up'></span>";
                                html += "</div>";
                                html += "</a>";
                                html += "</div>";
                                num += 1;
                            }
                            $(".xmbj").data("relatedid", value.relatedid);
                        });
                        $("#xmbjNum").html(num);
                        $("#xmfaNum").html(num);
                        $("#xmbjList").append(html);
                        $("#xmfaList").append(html);
                        $("#xmbjList").find(".download").on("click", AttachmentList.prototype.DownLoad);
                        $("#xmfaList").find(".download").on("click", AttachmentList.prototype.DownLoad);
                    } else {
                        // layer.msg("没有更多数据了！");
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
};

AttachmentList.prototype.LoadXmqyAttachments = function () {
    var binding = Cookies.prototype.GetCookie('binding');
    var xmbh = Common.prototype.GetQueryString("xmbh");
    var expressions = "select a.id,a.name,a.suffix,a.attachementsize,a.createdate,x.id as relatedid from Attachement a full join contract x on a.relatedid = x.id where x.xmbh11 = '" + xmbh + "' and x.is_deleted <> '1'";
    var params = "serviceName=cqlQuery&objectApiName=Attachement&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding;

    var index = layer.load(1, {
        shade: false
    });
    $.ajax({
        type: "get",
        dataType: "json",
        url: url,
        data: params,
        success: function (data) {
            if (data != "") {
                if (data.result) {
                    
                    //$("#contactsRoleList").html("");
                    if (data.data.length > 0) {
                        var html = "";
                        var num = 0;
                        data.data.forEach(function (value, index) {
                            if (!varIsNull(value.id)) {
                                html += "<div class='pro'>";
                                html += "<a href='javascript:void(0);' class='download' data-id='" + value.id + "'>";
                                html += "<div class='icon_p col-lg-2 col-md-2 col-sm-2 col-xs-2'>";
                                html += "<div class='icon_project attachment'></div>";
                                html += "</div>";
                                html += "<div class='project_info col-lg-9 col-md-9 col-sm-9 col-xs-9'>";
                                html += "<div class='projectName'>" + value.name + value.suffix + "</div>";
                                html += "<div class='industry'>" + parseInt(parseInt(value.attachementsize) / 1024) + "KB" + "</div>";
                                html += "<div class='industry'>" + value.createdate + "</div>";
                                html += "</div>";
                                html += "<div class='icon_slid col-lg-1 col-md-1 col-sm-1 col-xs-1'>";
                                html += "<span class='slid_up'></span>";
                                html += "</div>";
                                html += "</a>";
                                html += "</div>";
                                num += 1;
                            }
                            $(".xmqy").data("relatedid", value.relatedid);
                        });
                        $("#htqyNum").html(num);
                        //$("#kglNum").html(num);
                        //$("#jfwcNum").html(num);
                        $("#htqyList").append(html);
                        //$("#kglList").append(html);
                        //$("#jfwcList").append(html);
                        $("#htqyList").find(".download").on("click", AttachmentList.prototype.DownLoad);
                        //$("#kglList").find(".download").on("click", AttachmentList.prototype.DownLoad);
                        //$("#jfwcList").find(".download").on("click", AttachmentList.prototype.DownLoad);
                    } else {
                        // layer.msg("没有更多数据了！");
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
};

AttachmentList.prototype.LoadXmjfAttachments = function () {
    var binding = Cookies.prototype.GetCookie('binding');
    var xmbh = Common.prototype.GetQueryString("xmbh");
    var expressions = "select a.id,a.name,a.suffix,a.attachementsize,a.createdate,x.id as relatedid from Attachement a full join fwht x on a.relatedid = x.id where x.xmbh11 = '" + xmbh + "' and x.is_deleted <> '1'";
    var params = "serviceName=cqlQuery&objectApiName=Attachement&expressions=" + encodeURIComponent(expressions) + "&binding=" + binding;

    var index = layer.load(1, {
        shade: false
    });
    $.ajax({
        type: "get",
        dataType: "json",
        url: url,
        data: params,
        success: function (data) {
            if (data != "") {
                if (data.result) {               
                    if (data.data.length > 0) {
                        var html = "";
                        var num = 0;
                        data.data.forEach(function (value, index) {
                            if (!varIsNull(value.id)) {
                                html += "<div class='pro'>";
                                html += "<a href='javascript:void(0);' class='download' data-id='" + value.id + "'>";
                                html += "<div class='icon_p col-lg-2 col-md-2 col-sm-2 col-xs-2'>";
                                html += "<div class='icon_project attachment'></div>";
                                html += "</div>";
                                html += "<div class='project_info col-lg-9 col-md-9 col-sm-9 col-xs-9'>";
                                html += "<div class='projectName'>" + value.name + value.suffix + "</div>";
                                html += "<div class='industry'>" + parseInt(parseInt(value.attachementsize) / 1024) + "KB" + "</div>";
                                html += "<div class='industry'>" + value.createdate + "</div>";
                                html += "</div>";
                                html += "<div class='icon_slid col-lg-1 col-md-1 col-sm-1 col-xs-1'>";
                                html += "<span class='slid_up'></span>";
                                html += "</div>";
                                html += "</a>";
                                html += "</div>";
                                num += 1;
                            }
                            $(".xmjf").data("relatedid", value.relatedid);
                        });
                        //$("#htqyNum").html(num);
                        $("#kglNum").html(num);
                        $("#jfwcNum").html(num);
                        //$("#htqyList").append(html);
                        $("#kglList").append(html);
                        $("#jfwcList").append(html);
                        //$("#htqyList").find(".download").on("click", AttachmentList.prototype.DownLoad);
                        $("#kglList").find(".download").on("click", AttachmentList.prototype.DownLoad);
                        $("#jfwcList").find(".download").on("click", AttachmentList.prototype.DownLoad);
                    } else {
                        // layer.msg("没有更多数据了！");
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
};


AttachmentList.prototype.DownLoad = function () {
    var binding = Cookies.prototype.GetCookie('binding');
    var fileId = $(this).data("id");
    var params = "serviceName=downloadFile&fileId=" + fileId + "&binding=" + binding;
    var fileName = $(this).find(".projectName").html();
    var ua = navigator.userAgent;
    var isWeixin = !!/MicroMessenger/i.test(ua);
    if (isWeixin) {
        Common.prototype.ShowMaskLayer();
        return;
    }

    layer.confirm("确定下载？", {
        btn: ['确定', '取消']
    }, function () {
        var form = $("<form></form>").attr("action", url + "?" + params).attr("method", "post");
        // form.append($("<input></input>").attr("type", "hidden").attr("name", "fileName").attr("value", fileName));
        form.appendTo('body').submit().remove();
        layer.closeAll('dialog');
    }, function () {});
};

AttachmentList.prototype.UploadFile = function () {

    var relatedid = $(this).data("relatedid");

    var binding = Cookies.prototype.GetCookie('binding');
    var fileId = $(this).data("id");
    var params = "serviceName=downloadFile&fileId=" + fileId + "&binding=" + binding;
    var fileName = $(this).find(".projectName").html();
    var url = "http://app1.cloudcc.com/distributor.action?serviceName=uploadFile&binding="+binding+"&relatedId=" + relatedid;
    $("#uploadUrl").val(url);
    $("#rturl").val(window.location.href);
    $("#fileUpload").click();
};