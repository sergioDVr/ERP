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
//window.onload = initPopulateTiendas();

function initPopulateTiendas() {
    var nommenu = document.getElementById("nomMenu")
    nommenu.innerHTML = "Tiendas ";
    var flecha = document.createElement("span");
    flecha.className = "caret";
    nommenu.appendChild(flecha);
    //Ponemos el titulo de nuestra aplicacion
    document.getElementById("titulo").innerHTML = window.instancia.nombre;
    //visualizamos ocultamos la partes que nos interesan
    document.getElementById("tiendas").style.display = "block";
    document.getElementById("tienda-productos").style.display = "none";
    document.getElementById("productosGlobales").style.display = "none";
    //Cogemos todas las tiendas de nuestro ERP.
    var iteraTiendas = window.instancia.getShops;
    //El contenedor principal de la pagina
    var princi = document.getElementById("princi");
    //Borramos todos los hijos del contenedor principal en el caso que tenga y del menú.
    borrarHijos(princi);
    //Creamo el boton de añadir tiendas.
    var divBoton = document.createElement("div");
    var btneana = document.createElement("button");
    btneana.innerHTML = "Añadir nueva tienda ";
    btneana.className = "btn btn-primary validar";
    btneana.setAttribute("data-toggle", "modal");
    btneana.setAttribute("data-target", "#myModalshop");
    btneana.onclick=AddShop;
    divBoton.appendChild(btneana);
    divBoton.className = "text-center";
    var icono = document.createElement("span");
    icono.className = "glyphicon glyphicon-plus";
    btneana.appendChild(icono);
    princi.appendChild(divBoton);
    borrarHijos(document.getElementById("ulTiendas"));
    //Recorremos el iterador de tiendas con un bucle.
    //Nos vamos a saltar la tienda por defecto :);
    var epo = iteraTiendas.next();
    var cont = 0;
    var row;
    while (!epo.done) {
        if (epo.value.name != "Shop default") {

            if (cont % 3 == 0) {
                row = document.createElement("div");
                row.className = "row";
                princi.appendChild(row);
            }

            //Creamos un div para dejar una separacion optima en bootstrap;
            var contenedorParaSeparacion = document.createElement("div");
            //Creamos el panel de las tiendas y le añadimos la clase personalizada para tiendas.
            var panel = document.createElement("div");
            //Le añadimos su clase y le damos posicionamiento con bootstrap
            panel.className = "tienda";
            contenedorParaSeparacion.className = "col-sm-4 separacion";

            //Añadimos el titulo con el nombre de la tienda.
            var h2Titulo = document.createElement("h2");
            h2Titulo.innerHTML = epo.value.name;

            //Añadimos una imagen.
            var img = document.createElement("img");
            img.src = epo.value.imagen;
            img.style.width = "100%";

            //Creamos los botones de eleminición y modificación y ver de cada tienda.
            var divBotones = document.createElement("div");
            divBotones.className = "botonesAnaElimi";
            var btnelimi = document.createElement("button");
            var btnmodifi = document.createElement("button");
            var btnEntrar = document.createElement("button");

            btnEntrar.innerHTML="Entrar";
            btnelimi.innerHTML = "Eliminar";
            btnmodifi.innerHTML = "Modificar";

            btnEntrar.className="btn btn-info"
            btnelimi.className = "btn btn-danger validar";
            btnmodifi.className = "btn btn-success validar";

            //Añadimos los eventos a los botones.
            btnelimi.addEventListener("click", getFunctionremoveShop(epo.value));
            btnmodifi.addEventListener("click", getFunctionModifyShop(epo.value));
            btnEntrar.addEventListener("click", getFunctionShopPopulate(epo.value));

            //Le añadimos los atributos para abrir el modal
            btnmodifi.setAttribute("data-toggle", "modal");
            btnmodifi.setAttribute("data-target", "#myModalshop");

            contenedorParaSeparacion.appendChild(panel);
            row.appendChild(contenedorParaSeparacion);
            panel.appendChild(h2Titulo);
            panel.appendChild(img);
            divBotones.appendChild(btnelimi);
            divBotones.appendChild(btnEntrar);
            divBotones.appendChild(btnmodifi);
            panel.appendChild(divBotones);


            cont++;
        }
        epo = iteraTiendas.next();
        comprobacionLogin();
    }
}

function initPopulateCategorias() {
    var nommenu = document.getElementById("nomMenu")
    nommenu.innerHTML = "Categorias ";
    var flecha = document.createElement("span");
    flecha.className = "caret";
    nommenu.appendChild(flecha);
    //Ponemos el titulo de nuestra aplicacion
    document.getElementById("titulo").innerHTML = window.instancia.nombre;
    //visualizamos ocultamos la partes que nos interesan
    document.getElementById("tiendas").style.display = "block";
    document.getElementById("tienda-productos").style.display = "none";
    document.getElementById("productosGlobales").style.display = "none";
    //Cogemos todas las categorias de nuestro ERP.
    var iteraCategorias = window.instancia.getCategorys;
    //El contenedor principal de la pagina
    var princi = document.getElementById("princi");
    //Borramos todos los hijos del contenedor principal en el caso que tenga y del menú.
    borrarHijos(princi);
    //Creamo el boton de añadir categorias.
    var divBoton = document.createElement("div");
    var btneana = document.createElement("button");
    btneana.innerHTML = "Añadir nueva Categoria ";
    btneana.className = "btn btn-primary validar";
    btneana.setAttribute("data-toggle", "modal");
    btneana.setAttribute("data-target", "#myModalcategory");
    btneana.onclick=AddCategory;
    divBoton.appendChild(btneana);
    divBoton.className = "text-center";
    var icono = document.createElement("span");
    icono.className = "glyphicon glyphicon-plus";
    btneana.appendChild(icono);
    princi.appendChild(divBoton);
    borrarHijos(document.getElementById("ulTiendas"));
    //Recorremos el iterador de tiendas con un bucle.
    var epo = iteraCategorias.next();
    var cont = 0;
    var row;
    while (!epo.done) {
        if (cont % 3 == 0) {
            row = document.createElement("div");
            row.className = "row";
            princi.appendChild(row);
        }
        //Creamos un div para dejar una separacion optima en bootstrap;
        var contenedorParaSeparacion = document.createElement("div");
        //Creamos el panel de las tiendas y le añadimos la clase personalizada para tiendas.
        var panel = document.createElement("div");
        //Le añadimos su clase y le damos posicionamiento con bootstrap
        panel.className = "categoria";
        contenedorParaSeparacion.className = "col-sm-4 separacion";

        //Añadimos el titulo con el nombre de la tienda.
        var h2Titulo = document.createElement("h2");
        h2Titulo.innerHTML = epo.value.title;

        //Añadimos su descripción.
        var pdescri = document.createElement("p");
        pdescri.innerHTML = epo.value.description;

        //Añadimos los botones de eliminar y modificar.
        var divBotones = document.createElement("div");
        divBotones.className = "botonesAnaElimi";
        var btnelimi = document.createElement("button");
        var btnmodifi = document.createElement("button");

        btnelimi.innerHTML = "Eliminar";
        btnmodifi.innerHTML = "Modificar";

        btnelimi.className = "btn btn-danger validar";
        btnmodifi.className = "btn btn-info validar";

        contenedorParaSeparacion.appendChild(panel);
        row.appendChild(contenedorParaSeparacion);
        panel.appendChild(h2Titulo);
        panel.appendChild(pdescri);
        divBotones.appendChild(btnelimi);
        divBotones.appendChild(btnmodifi);
        panel.appendChild(divBotones);


        //Añadimos los eventos a los botones.
        btnelimi.addEventListener("click", getFunctionremoveCategory(epo.value));
        btnmodifi.addEventListener("click", getFunctionModigyCategory(epo.value));
        //Le añadimos los atributos para abrir el modal
        btnmodifi.setAttribute("data-toggle", "modal");
        btnmodifi.setAttribute("data-target", "#myModalcategory");


        epo = iteraCategorias.next();
        cont++;
    }
    comprobacionLogin();
}

function shopsMenusPopulate() {
    var contenedorItemsMenu = document.getElementById("ulTiendas");
    borrarHijos(contenedorItemsMenu);
    var iteraTiendas = window.instancia.getShops;
    var epo = iteraTiendas.next();
    while (!epo.done) {
        if (epo.value.name != "Shop default") {
            //Creamos un li para cada tienda.
            var liTienda = document.createElement("li");
            //Creamos un link tambien.
            var aTienda = document.createElement("a");
            //Creamos un div donde iran todas las categorias de nuestra tienda
            var divSubseccion = document.createElement("div");
            divSubseccion.className = "sub-secciones";
            //Le añadimos el texto del item.
            aTienda.innerHTML = epo.value.name;

            //Los añadimos a la jeraquia de la pagina.
            liTienda.appendChild(aTienda);
            liTienda.appendChild(divSubseccion);
            contenedorItemsMenu.appendChild(liTienda);

            //Le añadimos el evento click.
            liTienda.children[0].addEventListener("click", getFunctionShopPopulate(epo.value));
            liTienda.children[0].setAttribute("href", "javascript:;");
            liTienda.addEventListener("mouseenter", getFunctionmenuCategoryShopPopulate(epo.value, divSubseccion));
            liTienda.addEventListener("mouseleave", getFunctionmenuCategoryShopPopulateHidden(divSubseccion));
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
    document.getElementById("tiendas").style.display = "none";
    document.getElementById("tienda-productos").style.display = "block";
    document.getElementById("productosGlobales").style.display = "none";
    //Ponemos el menu de tiendas
    shopsMenusPopulate();
    //Ponemos La información de la tienda.
    document.getElementById("nombreTienda").innerHTML = tienda.name;
    var img = document.getElementById("fotoTienda");
    img.setAttribute("src", tienda.imagen);
    document.getElementById("descripcion").innerHTML = tienda.descripcion;
    document.getElementById("telefonoTienda").innerHTML = tienda.telefono;
    document.getElementById("direccion").innerHTML = tienda.direccion;
    var productos = document.getElementById("productos");

    //En la seccion que estamos:
    var cabe = document.getElementById("seccion");
    cabe.innerHTML = "Todas las categorias: ";

    //Ponemos todos los productos de la tienda.
    borrarHijos(productos);
    var iteraProductos = window.instancia.getShopProducts(tienda);
    var epo = iteraProductos.next();
    var cont = 0;
    var row;
    while (!epo.done) {
        if (cont % 4 == 0) {
            row = document.createElement("div");
            row.className = "row";
            productos.appendChild(row);
        }
        row.appendChild(productShopPopulate(epo.value));
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
    seccion.style.display = "none";
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
    seccion.style.display = "block";
    seccion.style.zIndex = "1";
    var categoriasTienda = window.instancia.getCategorysShop(tienda);
    for (var i = 0; i < categoriasTienda.length; i++) {
        //Creamos un li para cada categoria.
        var pCategoria = document.createElement("p");
        //Creamos un link tambien.
        var aCategoria = document.createElement("a");
        //Le ponemos de id el nif de la tienda
        pCategoria.setAttribute("id", categoriasTienda[i].title);
        //Le añadimos el texto del item.
        aCategoria.innerHTML = categoriasTienda[i].title;
        aCategoria.setAttribute("href", "javascript:;");
        //Los añadimos a la jeraquia de la pagina.
        pCategoria.appendChild(aCategoria);
        seccion.appendChild(pCategoria);

        //Le añadimos el evento click.
        aCategoria.addEventListener("click", getFunctionproductsCategoryShopPopulate(tienda, categoriasTienda[i]));
    }
    var alturaTotal = seccion.offsetHeight;
    seccion.style.height = "0px";
    var elem = document.getElementById("myBar");
    var altura = 0;
    var id = setInterval(frame, 1);

    function frame() {
        if (altura == alturaTotal) {
            clearInterval(id);
        } else {
            altura++;
            seccion.style.height = altura + 'px';
        }
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
    document.getElementById("nombreTienda").innerHTML = tienda.name;
    var img = document.getElementById("fotoTienda");
    img.setAttribute("src", tienda.imagen);
    document.getElementById("descripcion").innerHTML = tienda.descripcion;
    document.getElementById("telefonoTienda").innerHTML = tienda.telefono;
    document.getElementById("direccion").innerHTML = tienda.direccion;
    var productos = document.getElementById("productos");

    //En la seccion que estamos:
    document.getElementById("seccion").innerHTML = category.title + ":";

    //Ponemos todos los productos de la tienda.
    var contenedorProductos = document.getElementById("productos");
    borrarHijos(contenedorProductos);
    var productos = window.instancia.getCategorysProductsShop(tienda, category);
    var row;
    var cont = 0;
    for (var i = 0; i < productos.length; i++) {
        if (cont % 4 == 0) {
            row = document.createElement("div");
            row.className = "row";
            contenedorProductos.appendChild(row);
        }
        row.appendChild(productShopPopulate(productos[i]));
        cont++;
    }
}

function productShopPopulate(producto) {
    //Creamos un contenedor para darle margenes con bootstrap
    var contenedor = document.createElement("div");
    contenedor.className = "col-md-3";
    //Creamos el panel de los productos y le damos estilo con bootstrap.
    var panel = document.createElement("div");
    panel.setAttribute("id", producto);
    panel.className = "claseProduct";

    //Añadimos un header al panel.
    var divHeader = document.createElement("div");
    divHeader.className = "cabeceraProduct";

    //Añadimos un titulo.
    var h2Titulo = document.createElement("h4");
    h2Titulo.className = "text-center";
    h2Titulo.innerHTML = producto.product.name;

    //Añadimos una imagen.
    var img = document.createElement("img");
    img.className = "imagenProduct img-responsive";
    img.src = producto.product.imagen;

    //añadimos el precio
    var precio = document.createElement("p");
    precio.innerHTML = producto.product.price + " €";
    precio.className = "precio";

    divHeader.appendChild(h2Titulo);
    panel.appendChild(divHeader);
    panel.appendChild(img);
    panel.appendChild(precio);

    contenedor.appendChild(panel);
    contenedor.addEventListener("click", function () {
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

function borrarHijos(cell) {
    if (cell.hasChildNodes()) {
        while (cell.childNodes.length >= 1) {
            cell.removeChild(cell.firstChild);
        }
    }
}

function globalProductPopulate() {
    borrarHijos(document.getElementById("ulTiendas"));
    var nommenu = document.getElementById("nomMenu")
    nommenu.innerHTML = "Productos Globales ";
    var flecha = document.createElement("span");
    flecha.className = "caret";
    nommenu.appendChild(flecha);

    //Ponemos el titulo de nuestra aplicacion
    document.getElementById("titulo").innerHTML = window.instancia.nombre;
    //visualizamos ocultamos la partes que nos interesan
    document.getElementById("tiendas").style.display = "none";
    document.getElementById("tienda-productos").style.display = "none";
    document.getElementById("productosGlobales").style.display = "block";

    //Cogemos el conteenedor donde iran los productos.
    var contenedorPrinci = document.getElementById("productosGlobal");
    //Borramos productos.
    borrarHijos(contenedorPrinci);

    //Creamos el boton para añadir un producto
    var div = document.createElement("div");
    div.className = "text-center divanapro";
    var btneana = document.createElement("button");
    btneana.innerHTML = "Añadir un nuevo producto ";
    btneana.setAttribute("data-toggle", "modal");
    btneana.setAttribute("data-target", "#myModalProduct");
    btneana.className = "btn btn-primary validar";
    div.appendChild(btneana);
    contenedorPrinci.appendChild(div);
    var icono = document.createElement("span");
    icono.className = "glyphicon glyphicon-plus";
    btneana.appendChild(icono);

    //Creamos el icono para borrar productos
    var imagen = document.createElement("img");
    imagen.setAttribute("src", "imagenes/papelera.png");
    div.appendChild(imagen);
    imagen.className="iconoBorrar";
    imagen.setAttribute("ondrop","drop(event)");
    imagen.setAttribute("ondragover","allowDrop(event)");
    imagen.setAttribute("id","div1");
    //Le añadimos el evento click para que cargue todas las categorias y tiendas

    btneana.addEventListener("click", addProductDom);
    var contenedorPrinci2= document.createElement("div");
    contenedorPrinci.appendChild(contenedorPrinci2);

    var productosGlobales = window.instancia.globalProduct();

    var cont=0;
    var row;
    for (var i = 0; i < productosGlobales.length; i++) {

        var contenedorSeparacion = document.createElement("div");
        contenedorSeparacion.setAttribute("id", productosGlobales[i].product.serialNumber);
        contenedorSeparacion.setAttribute("draggable", "true");
        contenedorSeparacion.setAttribute("ondragstart", "drag(event)");

        var contenedorProducto = document.createElement("table");
        contenedorProducto.className = "table";
        contenedorSeparacion.className = "col-md-4 globalProducto";
        contenedorSeparacion.appendChild(contenedorProducto);


        if(cont % 3 ==0){
            row = document.createElement("div");
            row.className="row";
            contenedorPrinci2.appendChild(row);
        }
        cont++;
        row.appendChild(contenedorSeparacion);

        //Metemos en la tabla el Producto -->nombre
        var tr1 = document.createElement("tr");
        tr1.className = "productoTabla";
        var td = document.createElement("td");
        td.innerHTML = "Producto";
        tr1.appendChild(td);
        var td2 = document.createElement("td");
        td2.innerHTML = productosGlobales[i].product.name;
        tr1.appendChild(td2);
        td2.setAttribute("colspan", "2");
        contenedorProducto.appendChild(tr1);

        //Metemos en la tabla la seccion tienda
        var tr2 = document.createElement("tr");
        var td3 = document.createElement("td");
        td3.innerHTML = "Tiendas";
        td3.className = "tiendasTabla";
        td3.setAttribute("colspan", "3");
        tr2.appendChild(td3);
        contenedorProducto.appendChild(tr2);

        //Metemos en la tabla tienda --stock
        var tr3 = document.createElement("tr");
        var td4 = document.createElement("th");
        var td5 = document.createElement("th");
        tr3.appendChild(td4);
        tr3.appendChild(td5);
        contenedorProducto.appendChild(tr3);
        td4.innerHTML = "Nombre";
        td5.innerHTML = "Stock";
        var suma = 0;
        for (var j = 0; j < productosGlobales[i].tiendas.length; j++) {
            if (productosGlobales[i].tiendas[j].shop.name != "Shop default") {
                //Metemos la tienda y su stock.
                var tr4 = document.createElement("tr");
                var td6 = document.createElement("td");
                var td7 = document.createElement("td");

                //Boton para modificar stock de un producto.
                var tdm = document.createElement("td");
                tdm.className="text-center";
                var botonModi = document.createElement("button")
                botonModi.innerHTML="Añadir";
                botonModi.className="btn btn-success validar";

                botonModi.addEventListener("click", getFunctionModifyStockProduct(productosGlobales[i].product,productosGlobales[i].tiendas[j]));

                //Le añadimos los atributos para abrir el modal
                botonModi.setAttribute("data-toggle", "modal");
                botonModi.setAttribute("data-target", "#myModalModifyProduct");


                tdm.appendChild(botonModi);
                tr4.appendChild(td6);
                tr4.appendChild(td7);
                tr4.appendChild(tdm);
                contenedorProducto.appendChild(tr4);
                td6.innerHTML = productosGlobales[i].tiendas[j].shop.name;
                td7.innerHTML = productosGlobales[i].tiendas[j].stock;
                suma += productosGlobales[i].tiendas[j].stock;
            }
        }
        //Mostramos la suma total de stock
        var tr5 = document.createElement("tr");
        tr5.className = "totalTabla";
        var td8 = document.createElement("td");
        var td9 = document.createElement("td");
        tr5.appendChild(td8);
        tr5.appendChild(td9);
        contenedorProducto.appendChild(tr5);
        td8.innerHTML = "Total Stock:";
        td9.innerHTML = suma;
        td9.setAttribute("colspan", "2");
    }
    comprobacionLogin();
}

