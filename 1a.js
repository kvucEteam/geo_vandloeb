var directionsDisplay = new google.maps.DirectionsRenderer({
	//suppressInfoWindows: true,
	suppressMarkers : true,
	map : map
});
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {

	//directionsDisplay = new google.maps.DirectionsRenderer();
	var centrum = new google.maps.LatLng(55.682166, 12.545357);
	var mapOptions = {
		center : centrum,
		zoom : 10,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	}
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	directionsDisplay.setMap(map);
	calcRoute();

}

function calcRoute() {
	var start = new google.maps.LatLng(55.625065, 12.455311);
	var end = new google.maps.LatLng(55.731042, 12.567441);
	// three points through which the directions pass
	var point1 = new google.maps.LatLng(55.629668, 12.443554);
	var point2 = new google.maps.LatLng(55.648004, 12.472179);
	var point3 = new google.maps.LatLng(55.663644, 12.546551);
	var point4 = new google.maps.LatLng(55.6771, 12.578695);
	var point5 = new google.maps.LatLng(55.704169, 12.577407);
	var point6 = new google.maps.LatLng(55.73175, 12.572343);
	//var point7 = new google.maps.LatLng(55.69152,12.588007);
	//var point8 = new google.maps.LatLng(55.73262,12.575197);

	// build an array of the points
	var wps = [{
		location : point1
	}, {
		location : point2
	}, {
		location : point3
	}, {
		location : point4
	}, {
		location : point5
	}, {
		location : point6
	}];
	var request = {
		origin : start,
		destination : end,
		waypoints : wps,
		travelMode : google.maps.TravelMode.DRIVING,
		provideRouteAlternatives : false
	};
	directionsService.route(request, function(result, status) {

		//var vehicle = new google.maps.VehicleType("BUS");
		//alert (vehicle);
		//alert(result.routes.length);
		//alert(result.routes[2].legs[0].steps[1].transit.line.vehicle.type);
		//var transport = google.maps.TransitVehicle("BUS");
		//alert(google.maps.TransitVehicle);
		if(status == google.maps.DirectionsStatus.OK) {

			directionsDisplay.suppressMarkers = true;
			directionsDisplay.suppressInfoWindows = true;
			directionsDisplay.setDirections(result);
			//alert(result.routes[0].TransitVehicle.type);
			setMarker(map);

		}
	});
}

function setMarker(map) {

	var position_Array = [["55.72046", "12.575741"], ["55.6688", "12.551923"], ["55.628044", "12.452703"]];

	var header_Array = new Array("Hellerup", "Vesterbro", "AvedÃ¸re");
	//alert(header_Array[0]);
	var l_images_Array = new Array("images/a_link_kort.png", "images/p_link_kort.png", "images/r_link_kort.png", "images/t_link_kort.png");

	var content_Array = new Array();
	//"<h2>Hellerup</h2>GÃ¥ til siden for <a href='../../Sider/linktest.aspx'>Hellerup</a> <br/> Opgaver: <br/> " + l_images + "<ul><li>Hvordan ser der ud?</li><li>Hvad kÃ¸ber de?</li><li>Hvem er de?</li><li>Hvad har de?</li> </ul>","<h2>Vesterbro</h2> Velkommen til <a href='../../Sider/Vesterbro.aspx'>Vesterbro</a> <br/> Opgaver: <ul><li>Hvordan ser der ud?</li><li>Hvad kÃ¸ber de?</li><li>Hvem er de?</li><li>Hvad har de?</li> </ul>", "<h2>AvedÃ¸re</h2> Velkommen til <a href='../../Sider/AvedÃ¸re.aspx'>AvedÃ¸re</a> <br/> Opgaver: <ul><li>Hvordan ser der ud?</li><li>Hvad kÃ¸ber de?</li><li>Hvem er de?</li><li>Hvad har de?</li> </ul>");

	var image = new google.maps.MarkerImage('image.png', new google.maps.Size(20, 114), new google.maps.Point(0, 0), new google.maps.Point(10, 114));

	var shadow = new google.maps.MarkerImage('shadow.png', new google.maps.Size(80, 114), new google.maps.Point(0, 0), new google.maps.Point(10, 114));

	var shape = {
		coord : [19, 0, 19, 1, 19, 2, 19, 3, 19, 4, 19, 5, 19, 6, 19, 7, 19, 8, 19, 9, 19, 10, 19, 11, 19, 12, 19, 13, 19, 14, 19, 15, 19, 16, 19, 17, 19, 18, 19, 19, 19, 20, 19, 21, 19, 22, 19, 23, 19, 24, 19, 25, 19, 26, 19, 27, 19, 28, 19, 29, 19, 30, 19, 31, 19, 32, 19, 33, 19, 34, 19, 35, 19, 36, 19, 37, 19, 38, 19, 39, 19, 40, 19, 41, 19, 42, 19, 43, 19, 44, 19, 45, 19, 46, 19, 47, 19, 48, 19, 49, 19, 50, 19, 51, 19, 52, 19, 53, 19, 54, 19, 55, 19, 56, 19, 57, 19, 58, 19, 59, 19, 60, 19, 61, 19, 62, 19, 63, 19, 64, 19, 65, 19, 66, 19, 67, 19, 68, 19, 69, 19, 70, 19, 71, 19, 72, 19, 73, 19, 74, 19, 75, 19, 76, 19, 77, 19, 78, 19, 79, 19, 80, 19, 81, 19, 82, 19, 83, 19, 84, 19, 85, 19, 86, 19, 87, 19, 88, 19, 89, 19, 90, 19, 91, 19, 92, 19, 93, 19, 94, 19, 95, 19, 96, 19, 97, 19, 98, 19, 99, 19, 100, 19, 101, 19, 102, 19, 103, 19, 104, 19, 105, 19, 106, 19, 107, 19, 108, 19, 109, 19, 110, 19, 111, 19, 112, 19, 113, 0, 113, 0, 112, 0, 111, 0, 110, 0, 109, 0, 108, 0, 107, 0, 106, 0, 105, 0, 104, 0, 103, 0, 102, 0, 101, 0, 100, 0, 99, 0, 98, 0, 97, 0, 96, 0, 95, 0, 94, 0, 93, 0, 92, 0, 91, 0, 90, 0, 89, 0, 88, 0, 87, 0, 86, 0, 85, 0, 84, 0, 83, 0, 82, 0, 81, 0, 80, 0, 79, 0, 78, 0, 77, 0, 76, 0, 75, 0, 74, 0, 73, 0, 72, 0, 71, 0, 70, 0, 69, 0, 68, 0, 67, 0, 66, 0, 65, 0, 64, 0, 63, 0, 62, 0, 61, 0, 60, 0, 59, 0, 58, 0, 57, 0, 56, 0, 55, 0, 54, 0, 53, 0, 52, 0, 51, 0, 50, 0, 49, 0, 48, 0, 47, 0, 46, 0, 45, 0, 44, 0, 43, 0, 42, 0, 41, 0, 40, 0, 39, 0, 38, 0, 37, 0, 36, 0, 35, 0, 34, 0, 33, 0, 32, 0, 31, 0, 30, 0, 29, 0, 28, 0, 27, 0, 26, 0, 25, 0, 24, 0, 23, 0, 22, 0, 21, 0, 20, 0, 19, 0, 18, 0, 17, 0, 16, 0, 15, 0, 14, 0, 13, 0, 12, 0, 11, 0, 10, 0, 9, 0, 8, 0, 7, 0, 6, 0, 5, 0, 4, 0, 3, 0, 2, 0, 1, 0, 0, 19, 0],
		type : 'poly'
	};

	//infowindow.open(map, "marker1");

	for(var i = 0; i < position_Array.length; i++) {
		content_Array.push("<a href=''><h2>" + header_Array[i] + "</h2><a href ='../../Sider/" + header_Array[i] + ".aspx'> <img src=" + l_images_Array[0] + "></a><br/><a href ='../../Sider/" + header_Array[i] + "-Pragmatikeren.aspx'> <img src=" + l_images_Array[1] + "></a><br/><a href ='../../Sider/" + header_Array[i] + "-Reflektoren.aspx'> <img src=" + l_images_Array[2] + "></a><br/><a href ='../../Sider/" + header_Array[i] + "-Teoretikeren.aspx'> <img src=" + l_images_Array[3] + "></a>");
		var infowindow = new google.maps.InfoWindow({
			content : header_Array[i]
		});

		//alert("inf" + infowindow);
		var marker = new google.maps.Marker({
			draggable : false,
			raiseOnDrag : true,
			icon : image,
			shadow : shadow,
			shape : shape,
			map : map,
			position : new google.maps.LatLng(position_Array[i][0], position_Array[i][1]), //new google.maps.LatLng(55.625065, 12.455311),
			//title : "Hello World!"
		});
		marker.num = i;
		google.maps.event.addListener(marker, 'click', function() {
			//alert("num" + this.num);
			infowindow.setContent(content_Array[this.num]);
			infowindow.open(map, this);
			//infowindow.open(map,"marker");
			//marker.openInfoWindow("html");
		});
		//alert(marker_Array.length);
	}
}