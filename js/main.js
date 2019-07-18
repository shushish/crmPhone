$(function(){
 
	resize();
	$(window).resize(function(event) {
		resize();
	});
	font();





	document.body.addEventListener('touchstart', function () { });


});



/*main*/
//

function font() {
    var sw = $("body,html").width() < 750 ? $("body,html").width() : 750;
    var pw = 750;
    var f = 100 * sw / pw;
    $('html').css('font-size', f + 'px');
}


/*call*/
//
function resize(){
	var ht=$(window).height();
	font();
} 