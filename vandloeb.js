var map;

var icon_Array = ["img/cviwhglass.png", "img/lightbllup.png", "img/lightblpin.png", "img/lightwhlup.png", "img/lightwhpin.png", "img/cviwhpin.png", "img/cviwhlup.png"];


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 55.482721,
            lng: 11.880579
        },
        zoom: 18,
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
        $(".btn-data").click(vis_data);

        build_markers();

    });

}

function vis_kort() {
    $(".overlay_container").html("").fadeOut(200);
    var laLatLng = new google.maps.LatLng( 55.482721,11.880579);
    map.panTo(laLatLng);
}


function vis_data() {
    var laLatLng = new google.maps.LatLng(55.476272, 11.863689);
    map.panTo(laLatLng);
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

        var infowindow = new google.maps.InfoWindow({});

        var HTML = "<h2>" + js[i].header + "</h2>";
        HTML += "<img class='img-responsive' src='" + js[i].header_pic + "'>";
        HTML += "<div class='videolink btn btn-sm btn-info'><span class='glyphicon glyphicon-play-circle'></span> Se målingen</div>";
        HTML += "<div class='piclink btn btn-sm btn-info'><span class='glyphicon glyphicon-picture'></span> Se dig omkring på stedet (360<sup>o</sup>)</div>";
        HTML += "<div class='sedimentlink btn btn-sm btn-info'><span class='glyphicon glyphicon-picture'></span> Sedimenter</div>";
        HTML += "<div class='statslink btn btn-sm btn-info'><span class='glyphicon glyphicon-info-sign'></span> Læs om området</div>";

        HTML_array.push(HTML);

        google.maps.event.addListener(marker, 'click', function() {
            var indeks = this.num;

            infowindow.setContent(HTML_array[this.num]);
            infowindow.open(map, this);
            //infowindow.open(map,"marker");
            //marker.openInfoWindow("html");
            $('.videolink').click(function() {
                openVideo(indeks);
            });
            $('.piclink').click(function() {
                openPanorama(indeks);
            });
        });
    }
}

function openVideo(num) {
    var HTML = "<div class='embed-responsive embed-responsive-16by9'><iframe class='embed-responsive-item' src='https://www.youtube.com/embed/" + jsonData.zoom_punkter[num].video + "''></iframe></div>";
    $(".overlay_container").fadeIn();

    $(".overlay_container").html(HTML);
}

function openPanorama(num) {
    var HTML = '<div class="paver_container col-xs-12">';
    HTML += '<div data-paver><img src="' + jsonData.zoom_punkter[0].panorama_billede + '" title="Sunset in the heart of Aarhus" alt="A panorama" />';
    HTML += '</div></div>';

    $(".overlay_container").fadeIn();

    $(".overlay_container").html(HTML);
    $('.paver_container').paver();
}
