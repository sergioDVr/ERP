"use strict";
//Variable Global que mantiene todos las ventanas de productos.
var ventanasProductos = [];

//le añadimos el evento al boton que nos cierre todas las ventanas
function cerrarVentanas() {
    for (var i = 0; i < ventanasProductos.length; i++) {
        ventanasProductos[i].close();
    }
    ventanasProductos = [];
}

//Esta funcion crea en la parte central toda la estructura de tiendas de la página.

function initPopulateTiendas() {

    //Actuelizamos la seccion del menú principal
    $("#nomMenu").text("Tiendas ");
    var flecha = $('<span class="caret"></span>');
    $("#nomMenu").append(flecha);

    //Ponemos el titulo de nuestra aplicacion
    $("#titulo").text(window.instancia.nombre);

    //visualizamos ocultamos la partes que nos interesan
    $("#tiendas").css("display", "block");
    $("#tienda-productos").css("display", "none");
    $("#productosGlobales").css("display", "none");
    borrarHijos($("#ulTiendas"));

    //Cogemos todas las tiendas de nuestro ERP.
    var iteraTiendas = window.instancia.getShops;

    //El contenedor principal de la pagina
    var princi = $("#princi");

    //Borramos todos los hijos del contenedor principal en el caso que tenga y del menú.
    borrarHijos(princi);

    //Creamo el boton de añadir tiendas.
    var divBoton = $("<div></div>").addClass("text-center");
    var btneana = $("<button>").text("Añadir nueva tienda").addClass("btn btn-primary validar").attr("data-toggle", "modal").attr("data-target", "#myModalshop").click(AddShop);
    divBoton.append(btneana);
    var icono = $("<span class='glyphicon glyphicon-plus'></span>");
    btneana.append(icono);
    princi.append(divBoton);

    //Recorremos el iterador de tiendas con un bucle.
    //Nos vamos a saltar la tienda por defecto :);
    var epo = iteraTiendas.next();
    var cont = 0;
    var row;
    while (!epo.done) {
        if (epo.value.name != "Shop default") {

            if (cont % 3 == 0) {
                row =$("<div></div>").addClass("row");
                princi.append(row);
            }

            //Creamos un div para dejar una separacion optima en bootstrap;
            var contenedorParaSeparacion = $("<div></div>").addClass("col-sm-4 separacion");
            //Creamos el panel de las tiendas y le añadimos la clase personalizada para tiendas.
            var panel = $("<div></div>").addClass("tienda");

            //Añadimos el titulo con el nombre de la tienda.
            var h2Titulo = $("<h2></h2>").text(epo.value.name);

            //Añadimos una imagen.
            var img = $("<img>").attr("src", epo.value.imagen).css("width", "100%");

            //Creamos los botones de eleminición y modificación y ver de cada tienda.
            var divBotones = $("<div></div>").addClass("botonesAnaElimi");
            var btnelimi = $("<button>").text("Eliminar").addClass("btn btn-info validar").click(getFunctionremoveShop(epo.value));
            var btnmodifi = $("<button>").text("Modificar").addClass("btn btn-danger validar").click(getFunctionModifyShop(epo.value)).attr("data-toggle", "modal").attr("data-target", "#myModalshop");
            var btnEntrar = $("<button>").text("Entrar").addClass("btn btn-success").click(getFunctionShopPopulate(epo.value));

            contenedorParaSeparacion.append(panel);
            row.append(contenedorParaSeparacion);
            panel.append(h2Titulo).append(img).append(divBotones);
            divBotones.append(btnelimi).append(btnEntrar).append(btnmodifi);

            cont++;
        }
        epo = iteraTiendas.next();
        comprobacionLogin();
    }
}

function initPopulateCategorias() {

    //Actuelizamos la seccion del menú principal
    $("#nomMenu").text("Categorias");
    var flecha = $('<span class="caret"></span>');
    $("#nomMenu").append(flecha);

    //visualizamos ocultamos la partes que nos interesan
    $("#tiendas").css("display", "block");
    $("#tienda-productos").css("display", "none");
    $("#productosGlobales").css("display", "none");
    borrarHijos($("#ulTiendas"));

    //Cogemos todas las categorias de nuestro ERP.
    var iteraCategorias = window.instancia.getCategorys;

    //El contenedor principal de la pagina
    var princi = $("#princi");

    //Borramos todos los hijos del contenedor principal en el caso que tenga y del menú.
    borrarHijos(princi);

    //Creamo el boton de añadir categorias.
    var divBoton = $("<div></div>").addClass("text-center");
    var btneana = $("<button>").text("Añadir nueva categoria").addClass("btn btn-primary validar").attr("data-toggle", "modal").attr("data-target", "#myModalcategory").click(AddCategory);
    divBoton.append(btneana);
    var icono = $("<span class='glyphicon glyphicon-plus'></span>");
    btneana.append(icono);
    princi.append(divBoton);

    //Recorremos el iterador de tiendas con un bucle.
    var epo = iteraCategorias.next();
    var cont = 0;
    var row;
    while (!epo.done) {
        if (cont % 3 == 0) {
            row =$("<div></div>").addClass("row");
            princi.append(row);
        }

        //Creamos un div para dejar una separacion optima en bootstrap;
        var contenedorParaSeparacion = $("<div></div>").addClass("col-sm-4 separacion");
        //Creamos el panel de las tiendas y le añadimos la clase personalizada para tiendas.
        var panel = $("<div></div>").addClass("categoria");

        //Añadimos el titulo con el nombre de la categoria.
        var h2Titulo = $("<h2></h2>").text(epo.value.title);

        //Añadimos su descripción.
        var pdescri= $("<p>"+epo.value.description+"</p>");

        var divBotones = $("<div></div>").addClass("botonesAnaElimi");
        var btnelimi = $("<button>").text("Eliminar").addClass("btn btn-info validar").click(getFunctionremoveCategory(epo.value));
        var btnmodifi = $("<button>").text("Modificar").addClass("btn btn-danger validar").click(getFunctionModigyCategory(epo.value)).attr("data-toggle", "modal").attr("data-target", "#myModalcategory");


        contenedorParaSeparacion.append(panel);
        row.append(contenedorParaSeparacion);
        panel.append(h2Titulo);
        panel.append(pdescri);
        divBotones.append(btnelimi);
        divBotones.append(btnmodifi);
        panel.append(divBotones);


        epo = iteraCategorias.next();
        cont++;
    }
    comprobacionLogin();
}

function shopsMenusPopulate() {
    var contenedorItemsMenu = $("#ulTiendas");
    borrarHijos(contenedorItemsMenu);
    var iteraTiendas = window.instancia.getShops;
    var epo = iteraTiendas.next();
    while (!epo.done) {
        if (epo.value.name != "Shop default") {
            //Creamos un li para cada tienda.
            var liTienda = $("<li></li>");
            var aTienda = $("<a>"+epo.value.name+"</a>");
            //Creamos un div donde iran todas las categorias de nuestra tienda
            var divSubseccion = $("<div class='sub-secciones'></div>");
            //Los añadimos a la jeraquia de la pagina.
            liTienda.append(aTienda);
            liTienda.append(divSubseccion);
            contenedorItemsMenu.append(liTienda);

            //Le añadimos el evento click.
            aTienda.click(getFunctionShopPopulate(epo.value));
            aTienda.attr("href", "javascript:;");
            liTienda.mouseenter(getFunctionmenuCategoryShopPopulate(epo.value, divSubseccion));
            liTienda.mouseleave(getFunctionmenuCategoryShopPopulateHidden(divSubseccion));
        }
        epo = iteraTiendas.next();
    }
}

function getFunctionShopPopulate(shop) {
    return (
        function () {
            shopPopulate(shop);
        }
    )
}

function shopPopulate(tienda) {

    //visualizamos ocultamos la partes que nos interesan
    $("#tiendas").css("display", "none");
    $("#tienda-productos").css("display", "block");
    $("#productosGlobales").css("display", "none");

    //Ponemos el menu de tiendas
    shopsMenusPopulate();
    //Ponemos La información de la tienda.
    $("#nombreTienda").text(tienda.name);

    var img = $("#fotoTienda").attr("src", tienda.imagen);

    $("#descripcion").text(tienda.descripcion);
    $("#telefonoTienda").text(tienda.telefono);
    $("#direccion").text(tienda.direccion);

    var productos = $("#productos");

    //En la seccion que estamos:
        $("#seccion").text("Todas las categorias: ");

    //Ponemos todos los productos de la tienda.
    borrarHijos(productos);
    var iteraProductos = window.instancia.getShopProducts(tienda);
    var epo = iteraProductos.next();
    var cont = 0;
    var row;
    while (!epo.done) {
        if (cont % 4 == 0) {
            row =$("<div></div>").addClass("row");
            productos.append(row);
        }
        row.append(productShopPopulate(epo.value));
        var epo = iteraProductos.next();
        cont++;
    }
}

function getFunctionmenuCategoryShopPopulateHidden(seccion) {
    return (
        function () {
            menuCategoryShopPopulateHidden(seccion);
        }
    )
}

function menuCategoryShopPopulateHidden(seccion) {
    borrarHijos(seccion);
    seccion.css("display" ,"none");
}

function getFunctionmenuCategoryShopPopulate(shop, seccion) {
    return (
        function () {
            menuCategoryShopPopulate(shop, seccion);
        }
    )
}

function menuCategoryShopPopulate(tienda, seccion) {

    borrarHijos(seccion);
    seccion.css("display" ,"block").css("zIndex","1");

    var categoriasTienda = window.instancia.getCategorysShop(tienda);
    for (var i = 0; i < categoriasTienda.length; i++) {
        //Creamos un li para cada categoria.
        var pCategoria =$("<p></p>");
        //Creamos un link tambien.
        var aCategoria = $("<a>"+categoriasTienda[i].title+"</a>").attr("href", "javascript:;");
        //Le ponemos de id el nif de la tienda
        pCategoria.attr("id", categoriasTienda[i].title);
        //Le añadimos el texto del item.
        //Los añadimos a la jeraquia de la pagina.
        pCategoria.append(aCategoria);
        seccion.append(pCategoria);

        //Le añadimos el evento click.
        aCategoria.click(getFunctionproductsCategoryShopPopulate(tienda, categoriasTienda[i]));
    }

}

function getFunctionproductsCategoryShopPopulate(shop, category) {
    return (
        function () {
            productsCategoryShopPopulate(shop, category);
        }
    )
}

function productsCategoryShopPopulate(tienda, category) {
    //Ponemos La información de la tienda.
    $("#nombreTienda").text(tienda.name);
    $("#fotoTienda").attr("src", tienda.imagen);

    $("#descripcion").text(tienda.descripcion);
    $("#telefonoTienda").text(tienda.telefono);
    $("#direccion").text(tienda.direccion);

    //En la seccion que estamos:
    $("#seccion").text(category.title + ":");

    //Ponemos todos los productos de la tienda.
    var contenedorProductos = $("#productos");
    borrarHijos(contenedorProductos);
    var productos = window.instancia.getCategorysProductsShop(tienda, category);
    var row;
    var cont = 0;
    for (var i = 0; i < productos.length; i++) {
        if (cont % 4 == 0) {
            row =$("<div></div>").addClass("row");
            contenedorProductos.append(row);
        }
        row.append(productShopPopulate(productos[i]));
        cont++;
    }
}

function productShopPopulate(producto) {
    //Creamos un contenedor para darle margenes con bootstrap
    var contenedor = $("<div class='col-md-3'></div>");

    //Creamos el panel de los productos y le damos estilo con bootstrap.
    var panel = $("<div id='"+producto+"' class='claseProduct'></div>");

    //Añadimos un header al panel.
    var divHeader = $("<div class='cabeceraProduct'></div>");

    //Añadimos un titulo.
    var h2Titulo = $("<h4 class='text-center'>"+producto.product.name+"</h4>");

    //Añadimos una imagen.
    var img = $("<img class='imagenProduct img-responsive' src='"+producto.product.imagen+"'/>");

    //añadimos el precio
    var precio = $("<p class='precio'>"+producto.product.price + " €</p>");

    divHeader.append(h2Titulo);
    panel.append(divHeader);
    panel.append(img);
    panel.append(precio);

    contenedor.append(panel);
    contenedor.click(function () {
        var ancho = window.innerWidth;
        var porcion = ancho / 10;
        var left = porcion * 2;
        var widht = porcion * 6;
        var ventana = window.open("Producto.html", producto.product.name, "toolbar=yes,scrollbars=yes,resizable=yes,top=100px,left=" + left + "px,width=" + widht + "px,height=500px");
        ventana.onload = function () {
            ventana.document.getElementById("nombreProducto").innerHTML = producto.product.name;
            ventana.document.getElementById("imagenProducto").setAttribute("src", producto.product.imagen);
            ventana.document.getElementById("precio").innerHTML = producto.product.price + "€";
            ventana.document.getElementById("stock").innerHTML = producto.stock + " Unidades";
            ventana.document.getElementById("descripcion").innerHTML = producto.product.description;
        }
        ventanasProductos.push(ventana);
    });
    return contenedor;
}

function globalProductPopulate() {

    borrarHijos($("#ulTiendas"));
    var nommenu = $("#nomMenu").text("Productos Globales ");
    var flecha = $('<span class="caret"></span>');
    nommenu.append(flecha);

    //Ponemos el titulo de nuestra aplicacion
    $("#titulo").text(window.instancia.nombre);
    //visualizamos ocultamos la partes que nos interesan
    $("#tiendas").css("display" ,"none");
    $("#tienda-productos").css("display" ,"none");
    $("#productosGlobales").css("display" ,"block");

    //Cogemos el conteenedor donde iran los productos.
    var contenedorPrinci = $("#productosGlobal");
    //Borramos productos.
    borrarHijos(contenedorPrinci);

    //Creamos el boton para añadir un producto
    var div = $("<div class='text-center divanapro'></div>");
    var btneana = $("<button class='btn btn-primary validar'/>").text("Añadir un nuevo producto ").attr("data-toggle", "modal").attr("data-target", "#myModalProduct");
    div.append(btneana);
    contenedorPrinci.append(div);
    btneana.append($("<span class='glyphicon glyphicon-plus'></span>"));

    //Creamos el icono para borrar productos
    var imagen = $("<img src='imagenes/papelera.png' class='validar' ondrop='drop(event)' ondragover='allowDrop(event)' id='div1'/>").addClass("iconoBorrar");
    div.append(imagen);

    //Le añadimos el evento click para que cargue todas las categorias y tiendas
    btneana.click(addProductDom);

    var contenedorPrinci2 = $("<div></div>");
    contenedorPrinci.append(contenedorPrinci2);

    var productosGlobales = window.instancia.globalProduct();

    var cont = 0;
    var row;
    for (var i = 0; i < productosGlobales.length; i++) {

        var contenedorSeparacion = $("<div class='col-md-4 globalProducto'></div>").attr("id", productosGlobales[i].product.serialNumber).attr("draggable", "true").attr("ondragstart", "drag(event)");
        var contenedorProducto =$("<table class='table'></table>");
        contenedorSeparacion.append(contenedorProducto);


        if (cont % 3 == 0) {
            row =$("<div></div>").addClass("row");
            contenedorPrinci2.append(row);
        }
        cont++;
        row.append(contenedorSeparacion);

        //Metemos en la tabla el Producto -->nombre
        contenedorProducto.append($("<tr class='productoTabla'><td>Producto</td><td colspan='2'>"+productosGlobales[i].product.name+"</td></tr>"));

        //Metemos en la tabla la seccion tienda
        contenedorProducto.append($("<tr><td class='tiendasTabla' colspan='3'>Tiendas</td></tr>"));

        //Metemos en la tabla tienda --stock
        contenedorProducto.append($("<tr><th>Nombre</th><th>Stock</th></tr>"));
        var suma = 0;
        for (var j = 0; j < productosGlobales[i].tiendas.length; j++) {
            if (productosGlobales[i].tiendas[j].shop.name != "Shop default") {

                //Boton para modificar stock de un producto.
                var botonModi = $("<button data-toggle='modal' data-target='#myModalModifyProduct'/>").text("Añadir").addClass("btn btn-success validar").click(getFunctionModifyStockProduct(productosGlobales[i].product, productosGlobales[i].tiendas[j]));

                //Metemos la tienda y su stock.
                var tr4 = $("<tr><td>"+productosGlobales[i].tiendas[j].shop.name+"</td><td>"+productosGlobales[i].tiendas[j].stock+"</td></tr>");
                tr4.append($("<td class='text-center'></td>").append(botonModi));
                contenedorProducto.append(tr4);
                suma += productosGlobales[i].tiendas[j].stock;
            }
        }
        //Mostramos la suma total de stock
        contenedorProducto.append($("<tr class='totalTabla'><td>Total Stock:</td><td colspan='2'>"+suma+"</td></tr>"));
    }
    comprobacionLogin();
}


function borrarHijos(cell) {
    cell.empty();
}


