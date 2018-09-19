// $(document).ready(function() {
//     $("img").on("click", function(event) {
//         var x = event.pageX - this.offsetLeft;
//         var y = event.pageY - this.offsetTop;
//         alert("X Coordinate: " + x + " Y Coordinate: " + y);
//     });
// });


var clicked = false;

$(document).ready(function() {

	$(".mapPic").on("click", function(event) {
		


		// $(".mapPic").on("click", function(event) {

		var x = event.pageX - this.offsetLeft;
        var y = event.pageY - this.offsetTop;

        var xy = $(".mapPic").offset()

		console.log("pageX", event.pageX)
		console.log("this.offsetLeft", this.offsetLeft)
		console.log("x", x)
		console.log("pageY", event.pageY)
		console.log("this.offsetTop", this.offsetTop)
		console.log("y", y)
		console.log("xy",xy.left,xy.top)


		var x = event.pageX - xy.left;
        var y = event.pageY - xy.top;
        console.log("REAL x,y", x,y)
        console.log("ADJ COORD: (",(x*.041)+1,",",(y*.041)+1,")")

        if (clicked){
        	$("#marker").remove()
        }

		 $("body").append(            
			            $('<div id="marker"></div>').css({
			                position: 'absolute',
			                top: event.pageY-5 + 'px',
			                left: event.pageX-5 + 'px',
			                width: '10px',
			                height: '10px',
			                background: '#000000'
			            })              
			        );

		clicked = true;

	// });		 







	});
});

		// HandleClick();

	// HandleClick();



	// $("#Western_Thanalan_Map").on("click", function(event) {

		// HandleClick();

		// var x = event.pageX - this.offsetLeft;
  //       var y = event.pageY - this.offsetTop;

  //       var xy = $("#Western_Thanalan_Map").offset()

		// console.log("pageX", event.pageX)
		// console.log("this.offsetLeft", this.offsetLeft)
		// console.log("x", x)
		// console.log("pageY", event.pageY)
		// console.log("this.offsetTop", this.offsetTop)
		// console.log("y", y)
		// console.log("xy",xy.left,xy.top)


		// var x = event.pageX - xy.left;
  //       var y = event.pageY - xy.top;
  //       console.log("REAL x,y", x,y)

		//  $("body").append(            
		// 	            $('<div></div>').css({
		// 	                position: 'absolute',
		// 	                top: event.pageY-5 + 'px',
		// 	                left: event.pageX-5 + 'px',
		// 	                width: '10px',
		// 	                height: '10px',
		// 	                background: '#000000'
		// 	            })              
		// 	        );               


	// });



function HandleClick(){
	$("#Western_Thanalan_Map").on("click", function(event) {

		var x = event.pageX - this.offsetLeft;
        var y = event.pageY - this.offsetTop;

        var xy = $("#Western_Thanalan_Map").offset()

		console.log("pageX", event.pageX)
		console.log("this.offsetLeft", this.offsetLeft)
		console.log("x", x)
		console.log("pageY", event.pageY)
		console.log("this.offsetTop", this.offsetTop)
		console.log("y", y)
		console.log("xy",xy.left,xy.top)


		var x = event.pageX - xy.left;
        var y = event.pageY - xy.top;
        console.log("REAL x,y", x,y)

		 $("body").append(            
			            $('<div></div>').css({
			                position: 'absolute',
			                top: event.pageY-5 + 'px',
			                left: event.pageX-5 + 'px',
			                width: '10px',
			                height: '10px',
			                background: '#000000'
			            })              
			        );               

	});		 

}
	// HandleClick("#Western_Thanalan_Map","#Western_Thanalan_Container");

	// $("#Western_Thanalan_Map").on("click", function(event) {
 //        var x = event.pageX - this.offsetLeft;
 //        var y = event.pageY - this.offsetTop;
 //        alert("X Coordinate: " + x + " Y Coordinate: " + y);
 //        $("#Western_Thanalan_Container").append(            
	//             $('<div></div>').css({
	//                 position: 'absolute',
	//                 top: event.pageY + 'px',
	//                 left: event.pageX + 'px',
	//                 width: '10px',
	//                 height: '10px',
	//                 background: '#000000'
	//             })              
	//         );               
    // });




function HandleClick(idOfMap,idOfContainer){

	$("idOfMap").on("click", function(event) {

		var x = event.pageX - this.offsetLeft;
        var y = event.pageY - this.offsetTop;

        var xy = $("idOfMap").offset()

		console.log("pageX", event.pageX)
		console.log("this.offsetLeft", this.offsetLeft)
		console.log("xy",xy.x,xy.y)
		console.log("x", x)
		console.log("pageY", event.pageY)
		console.log("this.offsetTop", this.offsetTop)
		console.log("y", y)
		console.log("xy",xy.x,xy.y)
	});
}


	// $(document).click(function (ev) {        
	//         $("body").append(            
	//             $('<div></div>').css({
	//                 position: 'absolute',
	//                 top: ev.pageY + 'px',
	//                 left: ev.pageX + 'px',
	//                 width: '10px',
	//                 height: '10px',
	//                 background: '#000000'
	//             })              
	//         );               
	//     });

// });



