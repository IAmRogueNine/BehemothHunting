$(document).ready(function() {
	resizeTheCover();
});


$( window ).resize(function() {
	resizeTheCover();
});


function resizeTheCover(){
	var w = $(window).width();
	if (w < 475){
		$("#myCover").css({"background-image": "url(assets/Aya.png)"});
	}else{
		$("#myCover").css({"background-image": "url(assets/RDM.png)"});
	}
}