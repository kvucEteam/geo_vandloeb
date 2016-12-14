 $(document).ready(function() {
     console.log("ready!");
     var js = jsonData.zoom_punkter;
     var HTML_array = [];


     $('.instr_container').html(instruction("Klik på overskrifterne og undersøg materialerne fra vandløbsundersøgelsen."));

     for (var i = 0; i < jsonData.zoom_punkter.length; i++) {

         //var infowindow = new google.maps.InfoWindow({});

         HTML = '<div class="col-xs-12 fold_ud_objekt ' + js[i].type + '"><h3 class="toggle_btn"><span class="toggle_header">' + js[i].resurse_prepend + js[i].header + '</span><div class="glyhicontainer"> <span class = "glyphicon glyphicon-chevron-down"> </span> <span class="glyphicon glyphicon-chevron-up"> </span> </div></h3><div class="toggle_container">';


         //HTML += "<img class='img-responsive' src='" + js[i].header_pic + "'>";


         if (js[i].type == "video") {

             HTML += "<div class='embed-responsive embed-responsive-16by9'><iframe class='embed-responsive-item' src='https://www.youtube.com/embed/" + jsonData.zoom_punkter[i].video + "?rel=0'></iframe></div>";
             console.log("lets make video!");
             
         } else if (js[i].type == "panorama") {
             //HTML += '<div class="panorama"><img src="' + jsonData.zoom_punkter[i].panorama_billede + '"></div>'; 
             //$(".fold_ud_objekt").eq(i).remove();
             HTML += "<figure><div class='panorama' data-paver data-start-position='0'><img src=" + jsonData.zoom_punkter[i].panorama_billede + " /></div></figure>"
                 //HTML += '<div class="paver_container col-xs-12">';
                 //HTML += '<img src="' + jsonData.zoom_punkter[i].panorama_billede + '" title="Sunset in the heart of Aarhus" alt="A panorama" />';
                 //HTML += '</div>';

             console.log("lets make panorama!");


         } else if (js[i].type == "info") {
             HTML += '<div>' + jsonData.zoom_punkter[i].infotekst + '</div>';

         } else if (js[i].type == "data") {

             //HTML += '<embed src="data/' + jsonData.zoom_punkter[i].content + '" width="100%" height="600" type="application/pdf"><a href="data/' + jsonData.zoom_punkter[i].content + '">Download pdf</a><br/>';

             HTML += '<a target="_blank" href="data/' + jsonData.zoom_punkter[i].content + '"class="btn btn-info"><span class="glyphicons glyphicons-download-alt"></span> ' + jsonData.zoom_punkter[i].header + '</a><br/> <br/>';
             HTML += '<a target="_blank" href="data/' + jsonData.zoom_punkter[i+1].content + '"class="btn btn-info"><span class="glyphicons glyphicons-download-alt"></span> ' + jsonData.zoom_punkter[i+1].header + '</a><br/> <br/>';
             HTML += '<a target="_blank" href="data/' + jsonData.zoom_punkter[i+2].content + '"class="btn btn-info"><span class="glyphicons glyphicons-download-alt"></span> ' + jsonData.zoom_punkter[i+2].header + '</a><br/> <br/>';


         } else if (js[i].type == "station") {

             HTML += '<div>' + jsonData.zoom_punkter[i].infotekst + '</div>';
         } else if (js[i].type == "sediment") {

             HTML += '<div>' + jsonData.zoom_punkter[i].infotekst + '</div>';
             HTML += '<div class="karrusel"></div>'
             var cObj = Object.create(carouselClass);
             cObj.bsColum = "col-12"; // OPTIONS: "col-XX-center", "col-XX". NOTE: XX has to an even number if "center" has to work properly.
             $('.karrusel').html(cObj.init(jsonData.zoom_punkter[i].data));
         } else if (js[i].type == "pdf") {
             HTML += '<p>Download eller åbn pdf opgaverne der hører til vandløbsundersøgelsen</p>';
             for (var u = 0; u < jsonData.zoom_punkter[i].data.length; u++) {
                 //console.log(jsonData.zoom_punkter[u].data[i]);
                 HTML += '<a target="_blank" href="data/' + jsonData.zoom_punkter[i].data[u] + '"class="btn btn-info"><span class="glyphicons glyphicons-download-alt"></span> ' + jsonData.zoom_punkter[i].pdf_headers[u] + '</a><br/> <br/>';
                 //<span class='glyphicons glyphicons-download-alt'></span>
             }
         }

         HTML += '</div></div>';
         $(".container-fluid").append(HTML);
     }

     $(".panorama").hide();
     $(".sediment").hide();

     $(".data").eq(1).hide();
     $(".data").eq(2).hide();
     $(".data").eq(0).find(".toggle_header").html("Data fra målingerne")


     $('.panorama').paver();

     $(".toggle_container").slideUp(0);

     $(".glyphicon-chevron-up").hide();

     $(".toggle_btn").click(function() {
         var indeks = $(this).index(".toggle_btn");

         console.log("Indeks: " + indeks)
         if ($(".toggle_container").eq(indeks).is(":hidden")) {
             console.log("hidden");
             $(".toggle_container").eq(indeks).slideDown(400); // do stuff
             $(".glyphicon-chevron-down").eq(indeks).hide();
             $(".glyphicon-chevron-up").eq(indeks).show();
         } else {
             console.log("shown");
             $(".toggle_container").eq(indeks).slideUp(400);
             $(".glyphicon-chevron-up").eq(indeks).hide();
             $(".glyphicon-chevron-down").eq(indeks).show();
         }
     });

     one_line_footer();
 });
