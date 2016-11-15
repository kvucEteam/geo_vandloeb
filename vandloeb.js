var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 55.480221,
            lng: 11.870579
        },
        zoom: 16,
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

        $(".overlay_container").fadeOut(0);
        $(".btn-kort").click(vis_kort);
        $(".btn-overblik").click(vis_overblik);

        build_markers();

    });

}

function vis_kort() {
    $(".overlay_container").html("").fadeOut(200);
    var laLatLng = new google.maps.LatLng(55.482721, 11.880579);
    map.panTo(laLatLng);
    map.setZoom(18);
}

function vis_overblik() {
    var laLatLng = new google.maps.LatLng(55.480221, 11.870579);
    map.panTo(laLatLng);
    map.setZoom(16);
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
            map: map,
        });
        marker.num = i;

        //var infowindow = new google.maps.InfoWindow({});

        HTML = "<h2>" + js[i].header + "</h2>";


        //HTML += "<img class='img-responsive' src='" + js[i].header_pic + "'>";


        if (js[i].type == "video") {
            HTML += "<div class='embed-responsive embed-responsive-16by9'><iframe class='embed-responsive-item' src='https://www.youtube.com/embed/" + jsonData.zoom_punkter[i].video + "'></iframe></div>";
            console.log("lets make video!");

        } else if (js[i].type == "panorama") {
            //HTML += '<div class="panorama"><img src="' + jsonData.zoom_punkter[i].panorama_billede + '"></div>'; 
            HTML += "<figure><div class='panorama' data-paver data-start-position='0'><img src=" + jsonData.zoom_punkter[i].panorama_billede + " /></div></figure>"
                //HTML += '<div class="paver_container col-xs-12">';
                //HTML += '<img src="' + jsonData.zoom_punkter[i].panorama_billede + '" title="Sunset in the heart of Aarhus" alt="A panorama" />';
                //HTML += '</div>';

            console.log("lets make panorama!");


        } else if (js[i].type == "info") {
            HTML += '<div class="col-xs-12">Her kommer til at være en masse info, right?</div>';

        } else if (js[i].type == "data") {
            HTML += '<div class="col-xs-12"><embed src="data/'+jsonData.zoom_punkter[i].content+'" width="100%" height="600" type="application/pdf"><a href="data/'+jsonData.zoom_punkter[i].content+'">Download pdf</a></div>';
        }

        HTML_array.push(HTML);



        //$("body").append(newHTML);

        google.maps.event.addListener(marker, 'click', function() {
            var indeks = this.num;

            console.log("Hej");
            UserMsgBox_xclick("body", HTML_array[this.num]);
            $('.panorama').paver();
            /*$(".panorama").panorama_viewer({
                repeat: false, // The image will repeat when the user scroll reach the bounding box. The default value is false.
                direction: "horizontal", // Let you define the direction of the scroll. Acceptable values are "horizontal" and "vertical". The default value is horizontal
                animationTime: 700, // This allows you to set the easing time when the image is being dragged. Set this to 0 to make it instant. The default value is 700.
                easing: "ease-out", // You can define the easing options here. This option accepts CSS easing options. Available options are "ease", "linear", "ease-in", "ease-out", "ease-in-out", and "cubic-bezier(...))". The default value is "ease-out".
                overlay: false // Toggle this to false to hide the initial instruction overlay
            });*/

        });
    }
}
