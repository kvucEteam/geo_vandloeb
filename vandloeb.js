var map;


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 55.269447,
            lng: 11.722978
        },
        zoom: 15,
        mapTypeId: 'satellite'
    });

    $(document).ready(function() {

        $("#explanationWrapper").html(explanation(jsonData.userInterface.instruktion));
        $('.instr_container').html(instruction(jsonData.userInterface.explanation));

        build_markers();
    });

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
        });
    }
}

function openVideo(num) {
    var HTML = "<h2>Video</h2><div class='embed-responsive embed-responsive-16by9'><iframe class='embed-responsive-item' src='https://www.youtube.com/embed/" + jsonData.zoom_punkter[num].video + "''></iframe></div>";
    UserMsgBox("body", HTML);
}
