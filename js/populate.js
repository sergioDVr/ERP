"use strict";
//Esta funcion crea en la parte central toda la estructura de tiendas de la página.
function initPopulate() {
    //Ponemos el titulo de nuestra aplicacion
    document.getElementById("titulo").innerHTML= window.instancia.nombre;
    //visualizamos ocultamos la partes que nos interesan
    document.getElementById("tiendas").style.display="block";
    document.getElementById("tienda-productos").style.display="none";
    document.getElementById("productosGlobales").style.display="none";
    //Cogemos todas las tiendas de nuestro ERP.
    var iteraTiendas = window.instancia.getShops;
    //El contenedor principal de la pagina
    var princi = document.getElementById("princi");
    //Borramos todos los hijos del contenedor principal en el caso que tenga y del menú.
    borrarHijos(princi);
    borrarHijos(document.getElementById("ulTiendas"));
    //Recorremos el iterador de tiendas con un bucle.
    //Nos vamos a saltar la tienda por defecto :);
    var epo = iteraTiendas.next();
    while (!epo.done) {
        if(epo.value.name!="Shop default"){

            //Creamos un div para dejar una separacion optima en bootstrap;
            var contenedorParaSeparacion = document.createElement("div");
            //Creamos el panel de las tiendas y le añadimos la clase personalizada para tiendas.
            var panel = document.createElement("div");
            //Le añadimos su clase y le damos posicionamiento con bootstrap
            panel.className="tienda";
            contenedorParaSeparacion.className = "col-sm-4 separacion";

            //Añadimos el titulo con el nombre de la tienda.
            var h2Titulo = document.createElement("h2");
            h2Titulo.innerHTML = epo.value.name;

            //Añadimos una imagen.
            var img = document.createElement("img");
            img.src = epo.value.imagen;
            img.style.width = "100%";

            contenedorParaSeparacion.appendChild(panel);
            princi.appendChild(contenedorParaSeparacion);
            panel.appendChild(h2Titulo);
            panel.appendChild(img);

            //Le añadimos el evento click.
            panel.addEventListener("click", getFunctionShopPopulate(epo.value));

        }
        epo = iteraTiendas.next();
    }
}

function shopsMenusPopulate() {
    var contenedorItemsMenu = document.getElementById("ulTiendas");
    borrarHijos(contenedorItemsMenu);
    var iteraTiendas = window.instancia.getShops;
    var epo = iteraTiendas.next();
    while (!epo.done) {
        if(epo.value.name!="Shop default"){
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
    document.getElementById("tiendas").style.display="none";
    document.getElementById("tienda-productos").style.display="block";
    document.getElementById("productosGlobales").style.display="none";
    //Ponemos el menu de tiendas
    shopsMenusPopulate();
    //Ponemos La información de la tienda.
    document.getElementById("nombreTienda").innerHTML=tienda.name;
    var img = document.getElementById("fotoTienda");
    img.setAttribute("src",tienda.imagen);
    document.getElementById("descripcion").innerHTML=tienda.descripcion;
    document.getElementById("telefonoTienda").innerHTML=tienda.telefono;
    document.getElementById("direccion").innerHTML=tienda.direccion;
    var productos = document.getElementById("productos");

    //En la seccion que estamos:
    document.getElementById("seccion").innerHTML="Todas las categorias:";

    //Ponemos todos los productos de la tienda.
    borrarHijos(productos);
    var iteraProductos = window.instancia.getShopProducts(tienda);
    var epo = iteraProductos.next();
    while (!epo.done) {
        productos.appendChild(productShopPopulate(epo.value));
        var epo = iteraProductos.next();
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
    seccion.style.height="0px";
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
    document.getElementById("nombreTienda").innerHTML=tienda.name;
    var img = document.getElementById("fotoTienda");
    img.setAttribute("src",tienda.imagen);
    document.getElementById("descripcion").innerHTML=tienda.descripcion;
    document.getElementById("telefonoTienda").innerHTML=tienda.telefono;
    document.getElementById("direccion").innerHTML=tienda.direccion;
    var productos = document.getElementById("productos");

    //En la seccion que estamos:
    document.getElementById("seccion").innerHTML= category.title+":";

    //Ponemos todos los productos de la tienda.
    var contenedorProductos = document.getElementById("productos");
    borrarHijos(contenedorProductos);
    var productos = window.instancia.getCategorysProductsShop(tienda, category);
    console.log(productos.length);
    for (var i = 0; i < productos.length; i++) {
        contenedorProductos.appendChild(productShopPopulate(productos[i]));
    }
}

function productShopPopulate(producto) {
    //Creamos un contenedor para darle margenes con bootstrap
    var contenedor = document.createElement("div");
    contenedor.className="col-md-3";
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
    img.className="imagenProduct img-responsive";
    img.src = producto.product.imagen;
    console.log(producto.product.imagen);

    //añadimos el precio
    var precio = document.createElement("p");
    precio.innerHTML=producto.product.price+" €";
    precio.className="precio";

    divHeader.appendChild(h2Titulo)
    panel.appendChild(divHeader);
    panel.appendChild(img);
    panel.appendChild(precio);

    contenedor.appendChild(panel);
    contenedor.addEventListener("click",function(){
        window.open("Producto.html","NuevaVentana","toolbar=yes,scrollbars=yes,resizable=yes,top=25%,left=500,width=400,height=400")
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
    //Ponemos el titulo de nuestra aplicacion
    document.getElementById("titulo").innerHTML= window.instancia.nombre;
    //visualizamos ocultamos la partes que nos interesan
    document.getElementById("tiendas").style.display="none";
    document.getElementById("tienda-productos").style.display="none";
    document.getElementById("productosGlobales").style.display="block";

    //Cogemos el conteenedor donde iran los productos.
    var contenedorPrinci = document.getElementById("productosGlobal");
    //Borramos productos.
    borrarHijos(contenedorPrinci);
    var productosGlobales = window.instancia.globalProduct();

    for(var i=0;i<productosGlobales.length;i++){
        var contenedorSeparacion = document.createElement("div");
        var contenedorProducto = document.createElement("table");
        contenedorProducto.className="table";
        contenedorSeparacion.className="col-md-4 globalProducto";
        contenedorSeparacion.appendChild(contenedorProducto);
        contenedorPrinci.appendChild(contenedorSeparacion);

        //Metemos en la tabla el Producto -->nombre
        var tr1= document.createElement("tr");
        tr1.className="productoTabla";
        var td=document.createElement("td");
        td.innerHTML="Producto";
        tr1.appendChild(td);
        var td2=document.createElement("td");
        td2.innerHTML=productosGlobales[i].product.name;
        tr1.appendChild(td2);
        contenedorProducto.appendChild(tr1);

        //Metemos en la tabla la seccion tienda
        var tr2= document.createElement("tr");
        var td3=document.createElement("td");
        td3.innerHTML="Tiendas";
        td3.className="tiendasTabla";
        td3.setAttribute("colspan","2");
        tr2.appendChild(td3);
        contenedorProducto.appendChild(tr2);

        //Metemos en la tabla tienda --stock
        var tr3 = document.createElement("tr");
        var td4 =document.createElement("th");
        var td5 =document.createElement("th");
        tr3.appendChild(td4);
        tr3.appendChild(td5);
        contenedorProducto.appendChild(tr3);
        td4.innerHTML="Nombre";
        td5.innerHTML="Stock";
        var suma =0;
        for(var j=0;j<productosGlobales[i].tiendas.length;j++){
            if(productosGlobales[i].tiendas[j].shop.name!="Shop default"){
                //Metemos la tienda y su stock.
                var tr4 = document.createElement("tr");
                var td6 =document.createElement("td");
                var td7 =document.createElement("td");
                tr4.appendChild(td6);
                tr4.appendChild(td7);
                contenedorProducto.appendChild(tr4);
                td6.innerHTML=productosGlobales[i].tiendas[j].shop.name;
                td7.innerHTML=productosGlobales[i].tiendas[j].stock;
                suma+=productosGlobales[i].tiendas[j].stock;
            }
        }
        //Mostramos la suma total de stock
        var tr5 = document.createElement("tr");
        tr5.className="totalTabla";
        var td8 =document.createElement("td");
        var td9 =document.createElement("td");
        tr5.appendChild(td8);
        tr5.appendChild(td9);
        contenedorProducto.appendChild(tr5);
        td8.innerHTML="Total Stock:";
        td9.innerHTML=suma;
    }
}