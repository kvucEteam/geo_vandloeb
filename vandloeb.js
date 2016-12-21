var map;
var x_pos;
var y_pos;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 55.480221,
            lng: 11.870579
        },
        zoom: 15,
        mapTypeId: 'satellite'
    });


    /*
        var flightPlanCoordinates = [
            { lat: 55.458392, lng: 12.163593 },
            { lat: 55.458273, lng: 12.163640 },
            { lat: 55.458187, lng: 12.163761 },
            { lat: 55.458136, lng: 12.163968 },
            { lat: 55.458096, lng: 12.164206 },
            { lat: 55.458031, lng: 12.164195 },
            { lat: 55.457941, lng: 12.164053 },
            { lat: 55.457883, lng: 12.163894 },
            { lat: 55.457747, lng: 12.163741 },
            { lat: 55.457636, lng: 12.163667 },
            { lat: 55.457554, lng: 12.163564 },
            { lat: 55.457405, lng: 12.163572 },
            { lat: 55.457314, lng: 12.163767 },
            { lat: 55.457243, lng: 12.163972 }
        ];
        var flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: '#56bfc5',
            strokeOpacity: 0.5,
            strokeWeight: 10
        });

        flightPath.setMap(map);

        */

    $(document).ready(function() {

        $("#explanationWrapper").html(explanation(jsonData.userInterface.instruktion));
        $('.instr_container').html(instruction(jsonData.userInterface.explanation));
        $(".marker_popud").hide();

        $(".overlay_container").fadeOut(0);
        $(".btn-kort").click(vis_kort);
        $(".btn-overblik").click(vis_overblik);

        $("body").mousemove(function(event) {
            x_pos = event.pageX; // Get the horizontal coordinate
            y_pos = event.pageY; // Get the vertical coordinate
            $(".marker_popud").css("top", y_pos - 60).css("left", x_pos - $(".marker_popud").width() / 2);
            //console.log("x: " + x_pos + "y_pos: " + y_pos);
        });

        //$(".col-xs-12").eq(0).append("<a href='vandloeb_resurser.html' class='hidden-sm btn btn-info btn_materialer' target='_blank'>Se alle materialer</a>");

        build_markers();

    });

}

function vis_kort() {
    $(".overlay_container").html("").fadeOut(200);
    var laLatLng = new google.maps.LatLng(55.482579129944946, 11.879951136245722);
    map.panTo(laLatLng);
    map.setZoom(18);
}

function vis_overblik() {
    var laLatLng = new google.maps.LatLng(55.480221, 11.870579);
    map.panTo(laLatLng);
    map.setZoom(15);
}

function build_markers() {
    var js = jsonData.zoom_punkter;
    var HTML_array = [];


    for (var i = 0; i < jsonData.zoom_punkter.length; i++) {

        var latitude = js[i].lat;
        var length = js[i].lng;
        var myLatLng = { lat: latitude, lng: length };
        var marker = new google.maps.Marker({
            position: myLatLng,
            icon: jsonData.zoom_punkter[i].marker,
            map: map//,
            //draggable:true
        });
        marker.num = i;

        //var infowindow = new google.maps.InfoWindow({});

        HTML = "<h2>" + js[i].header + "</h2>";


        //HTML += "<img class='img-responsive' src='" + js[i].header_pic + "'>";


        if (js[i].type == "video") {
            HTML += "<div class='embed-responsive embed-responsive-16by9'><iframe class='embed-responsive-item' src='https://www.youtube.com/embed/" + jsonData.zoom_punkter[i].video + "?rel=0'></iframe></div>";
            console.log("lets make video!");

        } else if (js[i].type == "panorama") {
            console.log("mobile browser: " + jQuery.browser.mobile);

            //HTML += '<div class="panorama"><img src="' + jsonData.zoom_punkter[i].panorama_billede + '"></div>'; 
            HTML += "<figure><div class='panorama' data-paver data-start-position='0'><img class='img_paver' src=" + jsonData.zoom_punkter[i].panorama_billede + " /></div></figure>"
                //HTML += '<div class="paver_container col-xs-12">';
                //HTML += '<img src="' + jsonData.zoom_punkter[i].panorama_billede + '" title="Sunset in the heart of Aarhus" alt="A panorama" />';
                //HTML += '</div>';



            console.log("lets make panorama!");


        } else if (js[i].type == "info") {
            HTML += '<div>' + jsonData.zoom_punkter[i].infotekst + '</div>';

        } else if (js[i].type == "data" || js[i].type == "data_info") {
            HTML += '<embed src="data/' + jsonData.zoom_punkter[i].content + '" width="100%" height="600" type="application/pdf"><a class="btn btn-info" href="data/' + jsonData.zoom_punkter[i].content + '"><span class="glyphicons glyphicons-download-alt"></span> Download data</a><br/>';
        } else if (js[i].type == "station") {

            HTML += '<div>' + jsonData.zoom_punkter[i].infotekst + '</div>';
        } else if (js[i].type == "sediment") {

            HTML += '<div>' + jsonData.zoom_punkter[i].infotekst + '</div>';
        } else if (js[i].type == "pdf") {
            HTML += '<p>Download eller åbn pdf opgaverne der hører til vandløbsundersøgelsen</p>';
            for (var u = 0; u < jsonData.zoom_punkter[i].data.length; u++) {
                //console.log(jsonData.zoom_punkter[u].data[i]);
                HTML += '<a target="_blank" href="data/' + jsonData.zoom_punkter[i].data[u] + '"class="btn btn-info"><span class="glyphicons glyphicons-download-alt"></span> ' + jsonData.zoom_punkter[i].pdf_headers[u] + '</a><br/>';
                //<span class='glyphicons glyphicons-download-alt'></span>
            }


        }


        HTML_array.push(HTML);



        //$("body").append(newHTML);

        google.maps.event.addListener(marker, 'click', function() {
            var indeks = this.num;

            console.log("Hej thomas");
            UserMsgBox_xclick("body", HTML_array[this.num]);
            $(".img_paver").css("height", 80 + "%");
            $('.panorama').paver();
            //jsakhdjak

            if (js[indeks].type == "sediment") {
                $("#UserMsgBox").append("<div class='karrusel'></div>");
                var cObj = Object.create(carouselClass);
                cObj.bsColum = "col-12"; // OPTIONS: "col-XX-center", "col-XX". NOTE: XX has to an even number if "center" has to work properly.
                $('.karrusel').html(cObj.init(jsonData.zoom_punkter[indeks].data));
                //HTML += '<div>'+jsonData.zoom_punkter[i].infotekst+'</div>';
                $("#UserMsgBox").append('<div class="col-xs-12 sedimentforklaring"><span class="glyphicon glyphicon-info-sign"></span> Ler: <0,002mm | Silt: 0,002-0,06mm | Sand: 0,06-2mm | Grus: 2-20mm | Sten: 20-200mm | Blokke: >200mm</div>');
            }

       
            /*$(".panorama").panorama_viewer({
                repeat: false, // The image will repeat when the user scroll reach the bounding box. The default value is false.
                direction: "horizontal", // Let you define the direction of the scroll. Acceptable values are "horizontal" and "vertical". The default value is horizontal
                animationTime: 700, // This allows you to set the easing time when the image is being dragged. Set this to 0 to make it instant. The default value is 700.
                easing: "ease-out", // You can define the easing options here. This option accepts CSS easing options. Available options are "ease", "linear", "ease-in", "ease-out", "ease-in-out", and "cubic-bezier(...))". The default value is "ease-out".
                overlay: false // Toggle this to false to hide the initial instruction overlay
            });*/

        });

        google.maps.event.addListener(marker,'dragend',function(event) {
        console.log(this.position.lat()+","+this.position.lng());
        
        
    });

        google.maps.event.addListener(marker, 'mouseover', function(event) {
            var indeks = this.num;

            //this.setOpacity(0.5);

            $(".marker_popud").show().html(jsonData.zoom_punkter[indeks].header);

            //$(".content_container").append("<div class='btn btn-info marker_popud'>"++"</div>")


        });

        google.maps.event.addListener(marker, 'mouseout', function() {
            var indeks = this.num;
            console.log("out");
            this.setOpacity(1);
            $(".marker_popud").hide();
        });
    }
}
