

$(document).ready(function() {
	loadThePage();
});


window.addEventListener('hashchange', function() {
    loadThePage();
});

$( window ).resize(function() {
	resizeTheMap();
});

var locationToRegion={
	//Thanalan
	"Central_Thanalan":"Thanalan",
	"Eastern_Thanalan":"Thanalan",
	"Northern_Thanalan":"Thanalan",
	"Southern_Thanalan":"Thanalan",
	"Western_Thanalan":"Thanalan",
	//Gyr_Abania
	"The_Fringes":"Gyr_Abania",
	"The_Lochs":"Gyr_Abania",
	"The_Peaks":"Gyr_Abania",
	//The_Black_Shroud
	"Central_Shroud":"The_Black_Shroud",
	"East_Shroud":"The_Black_Shroud",
	"North_Shroud":"The_Black_Shroud",
	"South_Shroud":"The_Black_Shroud",
	//Coerthas
	"Coerthas_Western_Highlands":"Coerthas",
	"Coerthas_Central_Highlands":"Coerthas",
	//Abalthias_Spine
	"The_Sea_of_Clouds":"Abalthias_Spine",
	"Azys_Lla":"Abalthias_Spine",
	//Dravania
	"The_Dravanian_Forelands":"Dravania",
	"The_Dravanian_Hinterlands":"Dravania",
	"The_Churning_Mists":"Dravania",
	//La_Noscea
	"Eastern_La_Noscea":"La_Noscea",
	"Lower_La_Noscea":"La_Noscea",
	"Middle_La_Noscea":"La_Noscea",
	"Outer_La_Noscea":"La_Noscea",
	"Upper_La_Noscea":"La_Noscea",
	"Western_La_Noscea":"La_Noscea",
	//Mor_Dhona
	"Mor_Dhona":"Mor_Dhona",
	//Othard
	"The_Azim_Steppe":"Othard",
	"The_Ruby_Sea":"Othard",
	"Yanxia":"Othard"
}

function loadThePage(){
	var clicked = false;
	var url = window.location.toString();
	
	var locationStr = url.split("#").pop();
	var locationStrPretty = locationStr.replace("_"," ");
	var region  = locationToRegion[locationStr]

	if (locationStr != "Mor_Dhona"){
		var locationDropDown = "#"+region+"_Dropdown";
		//change navbar active 
   		$(locationDropDown).append('<span class="sr-only">(current)</span>');
   		$(locationDropDown).addClass("active");
	}
	
	//change title
   	document.title = locationStrPretty;

   
   	//change source of map
   	$(".mapPic").remove();

   	$("#mapContainer").append('<img class = "mapPic" id = "'+locationStr+'" src="assets/FFXIVMaps/'+locationStr+'-data.jpg"/>');
   	

   	resizeTheMap();

   	$(".mapPic").on("click", function(event) {

	var locName = event.target.id;
	var locationNamePretty = locName.replace("_"," ");

	var mapHeight  = $(event.target).height();
	var mapWidth  = $(event.target).width();

	var xy = $(event.target).offset();
	var x = event.pageX - xy.left;
	var y = event.pageY - xy.top;

	// console.log("raw")
	// console.log(event.pageX)
	// console.log(event.pageY)

	//something is off here but this seems to be good enough
	//the actual coordinate being relayed to CK is correct
	var theActualRatio  =40.8; 

	var coorX = (x*(theActualRatio/mapWidth))+1;
	var coorY = (y*(theActualRatio/mapHeight))+1;

	// console.log("raw coords")
	// console.log(coorX)
	// console.log(coorY)

	var spXY = findClosestSpPt(coorX,coorY,locName);

	// console.log("calc coords")
	// console.log(spXY[0])
	// console.log(spXY[1])

	newEvX = ((((spXY[0]-1)*mapWidth))/theActualRatio)+(xy.left);
	newEvY = ((((spXY[1]-1)*mapHeight))/theActualRatio+(xy.top));

	// console.log("reversed:")
	// console.log(newEvX)
	// console.log(newEvY)

	if (clicked){
		$("#marker").remove()
	}


	$("body").append(            
		$('<div id="marker"></div>').css({
			top: newEvY-6 + 'px', //half the size of the marker itself
			left: newEvX-6 + 'px'
		})              
	);

	clicked = true;

	copyStringToClipboard(createCharmmyKittyCmd(spXY[0],spXY[1],locationNamePretty));

});	

}

function resizeTheMap(){
	var w = $(window).width();
	var h = $(window).height();
	var s = w;
	if (w>=h){
		s=h-$("#theNavBar").height();
		$(".mapPic").css({"height": s});
		$(".mapPic").css({"width": "auto"});
	}else{
		$(".mapPic").css({"width": s});
		$(".mapPic").css({"height": "auto"});
	}
}


var spawnPointDict = {'The_Churning_Mists':[[6.45, 35.65], [6.85, 20.25], [7.4, 11.7], [7.9, 15.8], [9.5, 8.5], [10.05, 38.7], [11.9, 20.3], [14.0, 23.55], [15.2, 14.5], [15.8, 30.25], [16.9, 28.0], [18.2, 24.35], [22.45, 31.1], [24.9, 20.5], [25.85, 7.95], [26.4, 27.6], [28.25, 10.6], [28.5, 20.35], [31.95, 32.65], [33.5, 20.85], [36.05, 29.05], [37.2, 26.2]]
,'The_Sea_of_Clouds':[[6.5, 19.3], [7.5, 8.35], [9.05, 16.65], [13.75, 29.15], [14.55, 23.5], [15.4, 14.6], [15.55, 7.5], [17.9, 29.85], [18.3, 31.65], [19.25, 9.45], [20.85, 21.5], [21.55, 16.05], [21.75, 7.65], [23.25, 10.0], [24.45, 25.25], [25.05, 13.1], [26.1, 29.1], [26.6, 33.7], [29.35, 6.55], [31.45, 19.05], [31.65, 36.1], [34.05, 31.55], [36.2, 38.5], [36.5, 21.15], [36.9, 8.65], [37.4, 14.65]]
,'The_Ruby_Sea':[[5.05, 22.95], [6.9, 29.8], [7.5, 5.9], [14.45, 13.9], [16.55, 10.6], [18.85, 8.65], [23.95, 33.2], [25.3, 26.2], [25.95, 7.05], [27.25, 31.6], [31.05, 38.75], [32.05, 24.3], [34.95, 21.15], [36.5, 17.95]]
,'Azys_Lla':[[8.25, 34.0], [9.45, 26.5], [11.3, 30.35], [12.85, 38.2], [13.9, 16.9], [16.1, 29.4], [17.3, 8.55], [18.5, 13.25], [27.4, 15.8], [27.65, 11.15], [29.65, 35.05], [29.85, 28.75], [32.7, 5.75], [33.8, 12.85], [34.35, 26.65], [35.9, 30.8], [36.25, 34.15], [36.35, 37.15], [37.7, 7.1], [38.95, 27.6]]
,'Northern_Thanalan':[[15.4, 18.55], [16.05, 14.65], [16.05, 15.95], [16.35, 19.4], [16.85, 16.95], [17.25, 15.7], [18.25, 17.5], [18.75, 18.0], [19.05, 16.75], [20.6, 27.8], [21.05, 25.0], [22.2, 27.0], [23.45, 26.3], [23.6, 25.25], [23.65, 24.15], [23.95, 22.85], [24.3, 23.2]]
,'Lower_La_Noscea':[[16.9, 35.35], [19.2, 35.4], [20.0, 37.5], [20.1, 34.3], [20.25, 32.0], [20.6, 35.6], [22.7, 34.5], [22.9, 38.2], [23.15, 36.0], [24.3, 26.55], [25.1, 22.4], [25.95, 24.85], [26.45, 26.3], [28.55, 18.2], [28.65, 20.5], [29.0, 17.0], [30.05, 14.3], [31.5, 16.45], [33.0, 16.05], [33.5, 17.5]]
,'Coerthas_Central_Highlands':[[4.15, 16.6], [5.25, 16.0], [5.6, 18.05], [6.45, 19.85], [6.6, 28.7], [8.35, 21.0], [8.85, 13.5], [8.85, 14.8], [8.95, 11.9], [9.0, 27.25], [10.5, 18.25], [10.8, 12.85], [11.0, 27.3], [11.05, 28.95], [11.55, 19.65], [11.75, 14.25], [12.65, 28.05], [13.4, 25.25], [14.3, 18.05], [14.3, 19.8], [14.9, 25.6], [15.4, 18.5], [15.5, 28.7], [15.8, 27.45], [16.85, 20.5], [17.5, 18.85], [17.7, 29.35], [19.55, 18.65], [19.8, 29.2], [20.55, 16.25], [21.4, 28.2], [21.55, 18.8], [22.95, 8.05], [23.45, 26.8], [24.15, 21.7], [24.6, 20.0], [24.65, 9.1], [24.65, 23.75], [24.8, 13.5], [25.3, 11.2], [25.65, 25.65], [27.05, 13.45], [27.1, 20.65], [27.4, 22.15], [28.1, 11.45], [28.1, 25.6], [28.4, 14.85], [28.9, 7.75], [29.3, 27.65], [30.15, 10.6], [30.2, 12.6], [30.3, 29.8], [30.75, 31.05], [31.5, 14.3], [31.9, 16.95], [32.05, 7.1], [32.8, 23.6], [34.8, 22.75], [35.05, 15.3], [35.8, 23.05]]
,'East_Shroud':[[13.6, 23.25], [14.35, 25.35], [14.5, 27.65], [15.6, 23.9], [16.85, 21.75], [17.4, 22.9], [19.05, 25.4], [19.95, 28.75], [21.25, 21.8], [22.0, 28.1], [22.1, 29.6], [23.0, 21.75], [23.8, 30.85], [24.0, 16.5], [24.3, 15.2], [24.45, 11.7], [24.8, 17.4], [25.05, 9.8], [25.3, 23.65], [25.7, 20.35], [25.8, 25.2], [25.9, 13.1], [26.5, 11.3], [26.7, 16.05], [27.0, 17.95], [27.6, 22.6], [27.7, 24.6], [27.8, 18.7], [28.1, 12.75], [29.0, 20.5], [29.5, 11.45], [29.9, 13.3], [30.3, 17.45], [31.7, 21.5], [31.9, 15.4]]
,'Yanxia':[[12.3, 30.6], [16.9, 13.8], [17.65, 34.3], [18.25, 16.15], [18.35, 10.5], [21.6, 9.45], [23.6, 27.25], [23.65, 11.5], [24.6, 21.7], [27.1, 10.4], [28.7, 11.35], [29.85, 35.3], [32.35, 18.5], [34.15, 26.6]]
,'North_Shroud':[[15.95, 28.25], [16.65, 25.4], [18.15, 28.95], [18.2, 27.05], [18.65, 20.4], [19.4, 28.6], [21.55, 30.05], [22.15, 23.75], [22.45, 28.15], [22.65, 20.7], [23.45, 19.95], [24.45, 20.2], [24.55, 28.3], [24.8, 25.7], [25.8, 26.05], [25.95, 22.75], [27.05, 27.2], [27.65, 22.25], [27.95, 24.3], [28.6, 21.65]]
,'Central_Thanalan':[[16.3, 12.4], [16.3, 19.55], [16.6, 16.4], [16.95, 23.3], [17.9, 18.9], [18.0, 13.5], [18.1, 17.5], [18.7, 25.25], [19.2, 21.7], [19.45, 23.7], [20.45, 26.1], [20.8, 16.4], [21.6, 21.1], [21.75, 13.65], [21.9, 15.55], [22.4, 31.4], [23.7, 35.0], [23.9, 31.9], [25.4, 17.95], [25.8, 29.85], [27.2, 21.5], [27.75, 18.0], [29.5, 20.9]]
,'The_Dravanian_Hinterlands':[[5.4, 22.15], [8.45, 34.0], [8.6, 28.1], [9.35, 21.35], [12.6, 29.25], [13.1, 16.45], [14.5, 35.65], [15.05, 21.6], [15.1, 25.45], [15.5, 32.05], [16.15, 37.75], [24.0, 23.5], [26.25, 36.9], [26.6, 29.4], [26.65, 16.6], [26.8, 25.45], [26.85, 20.05], [31.8, 20.15], [33.95, 24.1], [34.2, 26.85], [35.95, 21.85], [38.0, 28.4]]
,'The_Peaks':[[5.65, 14.75], [5.85, 34.8], [7.8, 25.85], [8.7, 12.25], [11.2, 8.2], [11.75, 32.85], [12.6, 28.3], [16.65, 23.1], [18.1, 26.7], [23.35, 14.95], [23.65, 36.6], [23.75, 24.25], [25.35, 20.15], [26.25, 12.0], [26.65, 29.85], [26.95, 7.95], [32.05, 8.3], [36.35, 12.45]]
,'Western_La_Noscea':[[12.9, 14.55], [13.95, 35.15], [14.2, 15.85], [14.35, 17.05], [14.55, 14.25], [16.1, 14.5], [16.15, 34.4], [16.95, 36.05], [17.05, 19.4], [19.6, 19.55], [19.85, 21.95], [20.2, 18.4], [23.15, 21.75], [23.3, 24.65], [24.7, 22.7], [26.1, 23.55], [27.65, 24.0], [29.0, 25.2], [30.8, 28.8], [31.25, 27.4], [31.75, 28.7], [33.0, 29.8], [34.05, 28.1]]
,'Southern_Thanalan':[[13.8, 34.85], [14.75, 38.85], [15.95, 20.25], [16.0, 24.45], [16.1, 36.8], [16.65, 23.15], [16.85, 33.05], [17.05, 25.7], [17.2, 11.7], [17.2, 16.95], [18.0, 10.2], [18.25, 11.2], [18.35, 21.2], [18.45, 22.9], [18.85, 30.55], [19.1, 38.4], [19.55, 17.2], [19.7, 19.25], [19.8, 24.7], [20.25, 28.5], [21.05, 22.9], [21.15, 26.35], [21.2, 32.15], [21.25, 10.85], [21.4, 20.75], [21.6, 29.9], [21.8, 34.3], [22.5, 38.65], [23.2, 7.95], [23.45, 33.3], [23.8, 12.45], [23.85, 30.4], [24.15, 21.3], [24.4, 24.85], [24.45, 36.9], [24.65, 9.35], [24.65, 11.45], [25.1, 40.85], [28.5, 20.75], [28.5, 34.7], [31.0, 18.4], [32.9, 19.85]]
,'Upper_La_Noscea':[[10.55, 21.45], [11.6, 22.65], [12.15, 21.75], [12.65, 23.55], [12.7, 25.7], [13.85, 25.9], [27.35, 23.75], [27.7, 19.85], [28.05, 25.6], [28.2, 21.4], [28.75, 22.25], [29.05, 21.2], [29.45, 23.95], [30.45, 25.3], [33.25, 25.8], [33.4, 24.1], [35.2, 23.7]]
,'Coerthas_Western_Highlands':[[6.65, 12.45], [10.0, 13.2], [11.6, 17.3], [15.1, 12.1], [16.7, 29.65], [17.3, 25.8], [18.0, 13.1], [18.1, 18.95], [18.7, 31.2], [21.95, 17.65], [22.1, 20.7], [23.5, 28.1], [24.95, 32.4], [26.1, 11.6], [27.5, 15.9], [28.0, 7.85], [28.15, 21.5], [29.35, 13.0], [29.95, 26.75], [32.5, 17.6], [33.8, 22.5], [34.05, 20.8], [35.6, 9.6], [36.25, 12.5]]
,'The_Dravanian_Forelands':[[10.25, 35.25], [12.35, 27.6], [13.6, 15.05], [14.3, 31.35], [16.9, 11.3], [17.0, 35.8], [17.95, 38.75], [20.05, 30.2], [21.15, 33.8], [21.4, 19.8], [24.9, 32.4], [25.7, 24.85], [26.4, 7.5], [27.4, 37.25], [27.75, 30.8], [28.9, 21.8], [32.5, 18.25], [33.9, 8.55], [34.6, 28.75], [34.85, 13.55], [38.6, 25.6]]
,'The_Fringes':[[8.3, 30.55], [8.7, 25.25], [10.45, 14.55], [12.25, 18.0], [14.35, 12.4], [15.35, 26.25], [16.65, 24.3], [17.5, 21.75], [17.8, 12.75], [18.25, 8.45], [21.2, 10.55], [24.1, 18.15], [25.2, 28.4], [25.35, 11.75], [25.85, 31.9], [27.75, 23.5], [28.95, 30.8], [33.3, 33.35], [33.75, 20.9], [34.65, 17.5]]
,'Central_Shroud':[[9.55, 16.9], [10.05, 18.9], [10.45, 21.7], [11.6, 23.55], [12.1, 19.4], [12.75, 20.75], [14.25, 19.5], [15.8, 19.65], [15.85, 24.0], [16.05, 21.15], [16.65, 17.8], [19.1, 18.3], [21.6, 30.05], [21.75, 16.35], [22.05, 24.5], [23.4, 27.5], [26.75, 20.6], [27.05, 22.6], [28.25, 22.05], [28.75, 14.45], [29.1, 19.45], [29.65, 23.35], [31.1, 18.6]]
,'Eastern_La_Noscea':[[14.75, 28.85], [15.0, 30.6], [16.5, 32.7], [17.0, 33.9], [17.4, 29.95], [17.9, 27.5], [18.3, 26.2], [19.55, 31.35], [20.3, 25.2], [20.5, 33.15], [21.3, 29.6], [21.3, 31.05], [21.45, 28.3], [22.25, 25.2], [25.4, 21.8], [25.55, 20.4], [25.9, 33.8], [26.6, 30.9], [26.7, 33.15], [27.55, 25.0], [28.1, 26.55], [28.35, 28.0], [28.65, 20.65], [28.9, 35.6], [28.95, 19.3], [29.7, 21.4], [30.1, 25.0], [30.4, 19.3], [30.7, 26.7], [31.05, 19.95], [31.75, 36.25], [32.1, 27.2]]
,'Eastern_Thanalan':[[10.4, 19.1], [12.7, 18.9], [12.8, 15.85], [12.9, 29.0], [14.5, 16.25], [14.55, 26.15], [14.65, 18.7], [15.4, 26.9], [15.65, 20.15], [16.6, 25.9], [17.4, 20.0], [17.4, 24.75], [17.45, 28.0], [17.5, 21.4], [17.85, 25.5], [18.95, 22.5], [19.55, 28.45], [19.85, 24.35], [20.35, 28.55], [22.8, 19.65], [23.4, 26.7], [23.45, 22.85], [23.95, 21.25], [24.3, 18.95], [25.0, 23.25], [25.4, 25.55], [25.8, 17.65], [26.7, 19.25], [26.7, 25.05], [27.35, 17.9], [27.9, 25.75], [28.1, 21.3], [29.3, 26.75], [29.6, 17.3]]
,'South_Shroud':[[15.7, 28.55], [15.8, 19.7], [16.15, 27.6], [16.3, 32.05], [16.9, 18.4], [16.9, 23.65], [17.0, 21.45], [17.15, 32.45], [17.25, 30.5], [18.25, 30.9], [18.6, 22.05], [18.8, 18.45], [19.0, 28.65], [19.4, 27.4], [21.4, 21.6], [21.4, 27.65], [22.15, 19.25], [22.65, 22.65], [22.65, 25.65], [23.0, 24.15], [24.35, 18.2], [26.95, 19.9], [27.05, 22.75], [27.75, 17.65], [28.85, 24.65], [30.55, 25.6], [31.7, 23.75], [32.7, 23.95]]
,'Middle_La_Noscea':[[13.9, 11.65], [13.9, 13.6], [15.2, 15.3], [15.95, 10.85], [16.35, 14.0], [16.55, 7.9], [17.15, 11.5], [17.15, 17.15], [18.35, 13.3], [18.45, 18.25], [18.6, 9.45], [18.7, 16.3], [19.25, 20.3], [19.9, 22.4], [20.25, 21.3], [20.4, 13.75], [20.75, 15.6], [21.0, 18.3], [22.9, 22.55], [23.2, 24.2], [23.3, 17.0], [23.9, 19.7], [24.4, 20.95], [25.1, 23.45]]
,'The_Lochs':[[3.1, 34.95], [4.6, 29.3], [6.45, 8.25], [6.95, 31.1], [7.4, 26.3], [7.7, 14.1], [10.45, 33.7], [13.95, 20.55], [18.3, 7.5], [18.8, 25.6], [18.95, 31.75], [22.5, 10.35], [23.45, 25.85], [24.5, 32.8], [25.05, 16.5], [26.4, 34.45], [28.95, 7.85], [30.1, 36.35], [34.95, 11.2]]
,'Outer_La_Noscea':[[13.55, 16.2], [14.1, 14.05], [14.7, 16.85], [15.1, 18.05], [15.25, 14.8], [15.4, 12.65], [15.6, 10.35], [16.45, 17.8], [19.0, 15.1], [21.35, 14.6], [21.5, 6.85], [21.75, 8.35], [21.8, 9.5], [21.9, 10.3], [22.45, 6.85], [22.9, 15.15], [23.0, 13.2], [23.0, 16.2], [23.65, 9.25], [24.55, 7.35], [24.6, 16.15], [27.0, 5.2], [27.4, 7.25]]
,'The_Azim_Steppe':[[9.65, 22.35], [9.75, 25.9], [11.4, 28.35], [12.45, 17.25], [13.5, 10.35], [14.95, 25.5], [15.6, 30.3], [17.4, 18.9], [17.45, 34.35], [19.35, 10.25], [21.85, 34.2], [22.35, 15.95], [24.25, 30.3], [26.7, 34.25], [27.35, 9.0], [27.9, 18.8], [27.9, 25.7], [34.65, 15.05]]
,'Mor_Dhona':[[9.8, 13.9], [10.6, 15.15], [11.9, 11.8], [12.25, 16.85], [12.6, 16.0], [12.7, 13.75], [13.65, 12.15], [14.0, 10.5], [14.2, 13.85], [15.75, 11.8], [16.05, 10.45], [16.4, 15.6], [16.8, 17.4], [19.15, 8.1], [23.2, 10.7], [23.4, 12.2], [24.85, 10.65], [25.2, 12.7], [26.8, 8.5], [26.8, 12.7], [27.15, 8.85], [27.4, 10.6], [28.25, 13.55], [28.95, 14.75], [29.1, 6.5], [29.1, 7.7], [30.15, 15.05], [30.6, 6.4], [31.45, 11.3], [32.3, 6.9], [32.3, 10.2], [32.4, 14.35], [32.45, 8.6], [33.6, 12.05]]
,'Western_Thanalan':[[8.45, 5.5], [10.2, 6.4], [10.35, 5.25], [12.0, 7.5], [12.15, 5.95], [14.05, 7.85], [14.95, 6.0], [16.95, 16.45], [18.3, 15.0], [18.3, 17.4], [18.9, 29.35], [20.3, 29.35], [20.65, 25.6], [21.25, 24.0], [21.3, 27.8], [21.95, 22.05], [22.3, 24.0], [22.75, 24.75], [22.85, 20.1], [26.1, 26.35], [26.2, 19.15], [26.85, 16.95]]
}

function findClosestSpPt(x,y,loc){

	var bestDist = Infinity
	var bestCoord = [0,0]

	for (var i in spawnPointDict[loc]){
		var xC = spawnPointDict[loc][i][0];
		var yC = spawnPointDict[loc][i][1];

		var dist = Math.sqrt((xC - x)**2 + (yC - y)**2)

		if (dist < bestDist){
			bestCoord = [xC,yC];
			bestDist = dist;
		}
	}
	return bestCoord;
}


function createCharmmyKittyCmd(x,y,loc){
	//ex cmd !submit 22.3 31.2 Central Thanalan
	return "!submit "+x+" "+y+" "+loc;
}

//shamelessly stolen from https://techoverflow.net/2018/03/30/copying-strings-to-the-clipboard-using-pure-javascript/ 
function copyStringToClipboard (str) {
   // Create new element
   var el = document.createElement('textarea');
   // Set value (string to be copied)
   el.value = str;
   // Set non-editable to avoid focus and move outside of view
   el.setAttribute('readonly', '');
   el.style = {display: 'none', position: 'absolute', left: '-9999px'};
   document.body.appendChild(el);
   // Select text inside element
   el.select();
   // Copy text to clipboard
   document.execCommand('copy');
   // Remove temporary element
   document.body.removeChild(el);
}

