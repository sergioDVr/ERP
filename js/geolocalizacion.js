"use strict";

function geolocalizar() {

    //Mostramos y ocultamos lo que nos interesa de nuestra parte central
    document.getElementById("tiendas").style.display = "block";
    document.getElementById("tienda-productos").style.display = "none";
    document.getElementById("productosGlobales").style.display = "none";

    //Cogemos todas las tiendas de nuestro ERP.
    var iteraTiendas = window.instancia.getShops;
    //El contenedor principal de la pagina
    var princi = document.getElementById("princi");
    //Borramos todos los hijos del contenedor principal en el caso que tenga y del menú.
    borrarHijos(princi);

    var divMapa = document.createElement("div");

    divMapa.setAttribute("id", "map");

    princi.appendChild(divMapa);


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        divMapa.innerHTML = "Geolocation is not supported by this browser.";
    }


    function showPosition(position) {

        var mapProp = {
            center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            zoom: 13,
        };
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        });
        var map = new google.maps.Map(divMapa, mapProp);
        marker.setMap(map);
        var epo = iteraTiendas.next();
        while (!epo.done) {
            if (epo.value.name != "Shop default") {
                var myCenter = new google.maps.LatLng(epo.value.coordenadas.latitude,epo.value.coordenadas.longitude);
                var marker = new google.maps.Marker({
                    position: myCenter,
                    icon: "imagenes/iconoTienda.png"
                });
                marker.setMap(map);
                google.maps.event.addListener(marker,'click',getFunctionVentana(epo, map, marker));
            }
            epo = iteraTiendas.next();
        }
    }
    function getFunctionVentana(epo, map, marker) {
        return (
            function () {
                ventana(epo, map, marker);
            }
        )
    }
    function ventana(epo, map, marker) {
        console.log(epo.value);
        var infowindow = new google.maps.InfoWindow({
            content:epo.value.name
        });
        infowindow.open(map,marker);
    }

    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                x.innerHTML = "User denied the request for Geolocation."
                break;
            case error.POSITION_UNAVAILABLE:
                x.innerHTML = "Location information is unavailable."
                break;
            case error.TIMEOUT:
                x.innerHTML = "The request to get user location timed out."
                break;
            case error.UNKNOWN_ERROR:
                x.innerHTML = "An unknown error occurred."
                break;
        }
    }
}