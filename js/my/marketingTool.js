$(function () {
    Common.prototype.checkLoginStatu();
    $(".back").on("click",Common.prototype.Back);
    $(".stage").on("click",mt.scrollToTop);
});

var MTool = function () {};
MTool.prototype = {
    scrollToTop:function(){
        var id = $(this).data("id");
        scroll_offset = $("#" + id).offset();
        $("body,html").animate({ 
            scrollTop:scroll_offset.top - 78 //让body的scrollTop等于pos的top，就实现了滚动 78px = 6.5rem(顶部固定栏高度) * 12px(html font-size)
            },0); 
    }  
}

window.mt = new MTool();