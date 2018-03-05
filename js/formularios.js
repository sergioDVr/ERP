"use strict";

function comprobacionLogin() {
    if (getCookie("validacion")) {
        document.getElementById("validacion").style.display = "none";
        var user = document.getElementById("nombre");
        var usuario = getCookie("validacion");
        user.innerHTML = "Hola, " + usuario;
        document.getElementById("validado").style.display = "block";
        var arraActivar = document.getElementsByClassName("validar");
        for (var i = 0; i < arraActivar.length; i++) {
            arraActivar[i].style.display = "inline-block";
        }
    } else {
        document.getElementById("validacion").style.display = "block";
        document.getElementById("validado").style.display = "none";
        var arraActivar = document.getElementsByClassName("validar");
        for (var i = 0; i < arraActivar.length; i++) {
            arraActivar[i].style.display = "none";
        }
    }
}

function validacion() {
    var usuario = document.forms["validar"]["usuario"].value;
    var contra = document.forms["validar"]["contra"].value;
    var error = document.getElementById("errores");

    if (usuario != "prueba") {
        error.innerHTML = "Usuario incorrecto";
    } else if (contra != "prueba") {
        error.innerHTML = "Contraseña incorrecta";
    } else {
        setCookie("validacion", usuario, 1);
        document.getElementById("validacion").style.display = "none";
        var user = document.getElementById("nombre");
        var usuario = usuario;
        user.innerHTML = "Hola, " + usuario;
        document.getElementById("validado").style.display = "block";
        comprobacionLogin();
    }

}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function cerrarSesion() {
    document.cookie = "validacion=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    comprobacionLogin();
}

window.onload = comprobacionLogin;

//METODOS DE ADMINISTRACIÓN

function getFunctionremoveCategory(category) {
    return (
        function () {
            removeCategory(category);
        }
    )
}

//Eliminar Categoria.

function removeCategory(categoria) {

    instancia.removeCategory(categoria);
    initPopulateCategorias();
}

//Modificar Categoria.
function getFunctionModigyCategory(category) {
    return (
        function () {
            modifyCategory(category);
        }
    )
}

function modifyCategory(category) {
    //Cargamos los datos de la categoria en el modal.
    document.getElementById("errorFormCategorias").innerHTML = "";
    document.getElementById("tituloCategory").innerHTML = "Modificar Categoria";
    document.forms.mCategory.nombrec.value = category.title;
    document.forms.mCategory.nombrec.disabled=true;
    document.forms.mCategory.descripcionc.value = category.description;
    document.getElementById("modificarCategory").innerHTML = "Modificar Categoria";
    document.getElementById("modificarCategory").onclick = function () {
        return confirmarModificar(category)
    };
}

function confirmarModificar(category) {
    if (validacionCategorias()) {
        category.description = document.forms.mCategory.descripcionc.value;
        modifyCategoryDb(category);
        initPopulateCategorias();
        document.getElementById("cerrarModalC").click();
    }
}

//Añadir una categoria
function AddCategory() {
    //Cargamos los datos de la categoria en el modal.
    document.getElementById("tituloCategory").innerHTML = "Añadir Categoria";
    document.getElementById("errorFormCategorias").innerHTML = "";
    document.forms.mCategory.nombrec.disabled=false;
    document.forms.mCategory.nombrec.value = "";
    document.forms.mCategory.descripcionc.value = "";
    document.getElementById("modificarCategory").innerHTML = "Añadir Categoria";
    document.getElementById("modificarCategory").onclick = function () {

        if (validacionCategorias()) {
            var category = new Category(document.forms.mCategory.nombrec.value);
            if (document.forms.mCategory.descripcionc.value != "") {
                category.description = document.forms.mCategory.descripcionc.value;
            }
            instancia.addCategory(category);
            initPopulateCategorias();
            document.getElementById("cerrarModalC").click();
        }
    };
}

function validacionCategorias() {

    var compro = true;
    var errores = document.getElementById("errorFormCategorias");
    var titulo = document.forms.mCategory.nombrec.value;

    if (titulo == "") {
        errores.innerHTML = "El Nombre de la categoria no puede estar vacio  <br>";
        compro = false;
    }

    return compro;
}

//Eliminar una tienda
function getFunctionremoveShop(shop) {
    return (
        function () {
            removeShop(shop);
        }
    )
}

function removeShop(shop) {
    instancia.removeShop(shop);
    initPopulateTiendas();
}

//Modificar Tienda.
function getFunctionModifyShop(shop) {
    return (
        function () {
            modifyShop(shop);
        }
    )
}

function modifyShop(shop) {
    //Cargamos los datos de la tienda en el modal.
    document.getElementById("tituloShop").innerHTML = "Modificar Tienda";
    document.getElementById("errorFormTiendas").innerHTML = "";
    document.forms.tienda.nif.value = shop.nif;
    document.forms.tienda.nif.disabled=true;
    document.forms.tienda.nombre.value = shop.name;
    document.forms.tienda.descripcion.value = shop.descripcion;
    document.forms.tienda.telefono.value = shop.telefono;
    document.forms.tienda.ruta.value = shop.imagen;
    document.forms.tienda.direccion.value = shop.direccion;
    document.getElementById("botonTiendas").innerHTML = "Modificar";
    document.getElementById("botonTiendas").onclick = function () {

        return confirmarModificar2(shop)
    };
}

function confirmarModificar2(shop) {
    if (validacionTiendas()) {
        shop.name = document.forms.tienda.nombre.value;
        shop.descripcion = document.forms.tienda.descripcion.value;
        shop.telefono = document.forms.tienda.telefono.value;
        shop.imagen = document.forms.tienda.ruta.value;
        shop.direccion = document.forms.tienda.direccion.value;

        modifyShopDb(shop);
        initPopulateTiendas();
        document.getElementById("cerrarModalT").click();
    }
}

//Añadir una tienda
function AddShop() {
    //Cargamos los datos de la Tienda en el modal.
    document.getElementById("tituloShop").innerHTML = "Añadir una Tienda";
    document.getElementById("errorFormTiendas").innerHTML = "";
    document.forms.tienda.nif.disabled = false;
    document.forms.tienda.nif.value = "";
    document.forms.tienda.nombre.value = "";
    document.forms.tienda.descripcion.value = "";
    document.forms.tienda.telefono.value = "";
    document.forms.tienda.ruta.value = "";
    document.forms.tienda.direccion.value = "";
    document.getElementById("botonTiendas").innerHTML = "Añadir Tienda";
    document.getElementById("botonTiendas").onclick = function () {

        if (validacionTiendas()) {
            var tienda = new Shop(document.forms.tienda.nif.value, document.forms.tienda.nombre.value);
            tienda.descripcion = document.forms.tienda.descripcion.value;
            tienda.telefono = document.forms.tienda.telefono.value;
            tienda.ruta = document.forms.tienda.ruta.value;
            tienda.direccion = document.forms.tienda.direccion.value;
            instancia.addShop(tienda);
            initPopulateTiendas();
            document.getElementById("cerrarModalT").click();
        }
    };
}

function validacionTiendas() {

    var compro = true;
    var errores = document.getElementById("errorFormTiendas");
    var nif = document.forms.tienda.nif.value;
    var nombre = document.forms.tienda.nombre.value;
    var descripcion = document.forms.tienda.descripcion.value;
    var telefono = document.forms.tienda.telefono.value;
    var ruta = document.forms.tienda.ruta.value;
    var direccion = document.forms.tienda.direccion.value;

    if (nif == "") {
        errores.innerHTML = "El Nif no puede estar vacio  <br>";
        compro = false;
    }
    if (nombre == "") {
        errores.innerHTML += "El Nombre no puede estar vacio <br>";
        compro = false;
    }

    return compro;
}

//Para añadir un nuevo producto de forma visual a nuestro ERP.
function addProductDom() {

    //vaciamos el contenido del modal.
    document.getElementById("errorFormProducto").innerHTML="";
    var formulario = document.forms.producto;
    formulario.nombre.value="";
    formulario.precio.value="";
    formulario.talla.value="";
    formulario.genero.value="";
    formulario.ruta.value="";
    formulario.descripcion.value="";
    borrarHijos(document.getElementById("tiendasparainsertarproducto"));
    borrarHijos(document.getElementById("categoriasparainsertarproductos"));
    //Cojemos el div donde cargaremos las tiendas y el div donde cargaremos las categiras.
    var tiendas = document.getElementById("tiendasparainsertarproducto");
    var categorias = document.getElementById("categoriasparainsertarproductos");

    //Cogemos las tiendas y las categorias del storehouse.
    var iteraTiendas = window.instancia.getShops;
    var iteraCategorias = window.instancia.getCategorys;

    //Recorremos el iterador y colocamos cada una de las tiendas con su correspondiente campo de texto para intrducir el stock

    var epo = iteraTiendas.next();
    while (!epo.done) {
        if (epo.value.name != "Shop default") {
            var divCheckText = document.createElement("div");
            var div1 = document.createElement("div");
            var div2 = document.createElement("div");
            var nombreTienda= document.createElement("span");
            var check = document.createElement("input");
            var input = document.createElement("input");
            input.style.width="50px";
            var cantidad= document.createElement("span");
            cantidad.innerHTML="Cantidad: ";
            nombreTienda.innerHTML=epo.value.name;
            input.id=epo.value.nif;
            check.setAttribute("type", "checkbox");
            check.className="form-control tiendasChecks";
            check.style.width="15px";
            check.style.height="15px";
            check.style.display="inline";



            input.setAttribute("type", "number");
            input.className="tiendasCantidad";
            div1.appendChild(check);
            div1.appendChild(nombreTienda);
            div2.appendChild(cantidad);
            div2.appendChild(input);
            divCheckText.appendChild(div1);
            divCheckText.appendChild(div2);
            divCheckText.className="flexTiendas";
            tiendas.appendChild(divCheckText);
        }
        epo = iteraTiendas.next();
    }
    var epo = iteraCategorias.next();
    while (!epo.done) {
        var divCheckText = document.createElement("div");
        var nombreCategoria= document.createElement("span");
        nombreCategoria.innerHTML = epo.value.title;
        var check = document.createElement("input");
        check.setAttribute("type", "checkbox");
        check.className="form-control categoriasChecks";
        check.id=epo.value.title;
        check.style.width="15px";
        check.style.height="15px";
        check.style.display="inline";
        divCheckText.appendChild(check);
        divCheckText.appendChild(nombreCategoria);
        divCheckText.style.margin="10px";
        categorias.appendChild(divCheckText);
        epo = iteraCategorias.next();
    }
    document.getElementById("botonInsertarProduct").onclick= function () {
        if(validacionProductos()){
            var formulario = document.forms.producto;
            var tipo = formulario.tipo.value;
            var nombre = formulario.nombre.value;
            var id = formulario.idp.value;
            var precio = formulario.precio.value;
            var talla = formulario.talla.value;
            var genero = formulario.genero.value;
            var ruta =formulario.ruta.value;
            var descripcion = formulario.descripcion.value;

            var producto;
            if(tipo=="Camiseta"){
                producto=new Camiseta(id,nombre,precio,talla,genero);
            }else if(tipo=="Pantalon"){
                producto=new Pants(id, nombre,precio,talla, genero);
            }else if(tipo=="Zapato"){
                producto=new Shoes(id,nombre,precio,talla, genero);
            }
            if(ruta!=""){
                producto.imagen=ruta;
            }
            if(descripcion!=""){
                producto.description=descripcion;
            }
            var categoriasSeleccionadas = document.getElementsByClassName("categoriasChecks");
            var categoriasSi=[];
            for(var i=0; i<categoriasSeleccionadas.length;i++){
                if(categoriasSeleccionadas[i].checked){
                    var idCategoria =categoriasSeleccionadas[i].id;
                    var categoria = instancia.getCategoriId(idCategoria);
                    categoriasSi.push(categoria);
                }
            }
            instancia.addProduct(producto,categoriasSi);
            var tiendasSeleccionadas = document.getElementsByClassName("tiendasChecks");
            var tiendasCantidad = document.getElementsByClassName("tiendasCantidad");
            for(var i=0; i<tiendasSeleccionadas.length;i++){
                if(tiendasSeleccionadas[i].checked){
                    var idTienda =tiendasCantidad[i].id;
                    var cantidad =tiendasCantidad[i].value;
                   instancia.addProductInShop(producto,instancia.getShopId(idTienda), parseInt(cantidad));
                }
            }
            globalProductPopulate();
            document.getElementById("cerrarProductos").click();
        }

    }
}

function validacionProductos() {
    document.getElementById("errorFormProducto").innerHTML="";
    var formulario = document.forms.producto;
    var compro = true;
    var errores = document.getElementById("errorFormProducto");
    var nombre = formulario.nombre.value;
    var id = formulario.idp.value;
    var precio = formulario.precio.value;
    var talla = formulario.talla.value;
    var genero = formulario.genero.value;
    var ruta =formulario.ruta.value;
    var descripcion = formulario.descripcion.value;
    if (id == "") {
        errores.innerHTML = "El ID no puede estar vacio  <br>";
        compro = false;
    }
    if (nombre == "") {
        errores.innerHTML = "El Nombre no puede estar vacio  <br>";
        compro = false;
    }
    if (precio == "") {
        errores.innerHTML += "El precio no puede estar vacio <br>";
        compro = false;
    }
    if (genero == "") {
        errores.innerHTML += "El genero no puede estar vacio<br>";
        compro = false;
    }
    if (talla == "") {
        errores.innerHTML += "La talla no puede estar vacia<br>";
        compro = false;
    }
    if (talla<20||talla>48) {
        errores.innerHTML += "La talla debe estar entre 20 y 48<br>";
        compro = false;
    }
    var categoriasSeleccionadas = document.getElementsByClassName("categoriasChecks");
    var categoriasSi=[];
    for(var i=0; i<categoriasSeleccionadas.length;i++){
        if(categoriasSeleccionadas[i].checked){
            var idCategoria =categoriasSeleccionadas[i].id;
            var categoria = instancia.getCategoriId(idCategoria);
            categoriasSi.push(categoria);
        }
    }
    if(categoriasSi.length==0){
        errores.innerHTML += "Debes indicar al menos una categoria<br>";
        compro = false;
    }
    var tiendasSeleccionadas = document.getElementsByClassName("tiendasChecks");
    var tiendasCantidad = document.getElementsByClassName("tiendasCantidad");
    for(var i=0; i<tiendasSeleccionadas.length;i++){
        if(tiendasSeleccionadas[i].checked){
            var cantidad =tiendasCantidad[i].value;
            console.log(cantidad);
            if(cantidad<0||cantidad==""){
                errores.innerHTML += "La Cantidad de stock para no puede ser negativa ni puede estar vacia.<br>";
                compro = false;
            }
        }
    }

    return compro;
}
//Eliminar un producto.
function getFunctionremoveProduct(producto) {
    return (
        function () {
            removeProduct(producto);
        }
    )
}

function removeProduct(producto) {

    instancia.removeProduct(producto);
    globalProductPopulate();
}
//Añadir stock de un producto.
function getFunctionModifyStockProduct(producto, tiendaystock) {
    return (
        function () {
            modifyStock(producto, tiendaystock);
        }
    )
}

function modifyStock(producto, tiendaystock) {
    //Cargamos los datos de la tienda en el modal.
    var formulario = document.forms.anaStock;
    formulario.producto.value=producto.name;
    formulario.nombre.value=tiendaystock.shop.name;
    formulario.stockActual.value=tiendaystock.stock;
    document.getElementById("errorFormStock").innerHTML = "";
    document.forms.anaStock.stockaAna.value="";

    var stock= parseInt(document.forms.anaStock.stockaAna.value);
    document.getElementById("botonStock").onclick = function () {
        return confirmarModificarstock(producto, tiendaystock.shop, stock)
    };
}

function confirmarModificarstock(producto, tienda, stock) {
    if (validacionStock()) {
    var stock= parseInt(document.forms.anaStock.stockaAna.value);
        instancia.addQuantityProductInShop(producto,tienda, stock);
        globalProductPopulate();
        document.getElementById("cerrarModalS").click();
   }
}
function validacionStock() {
    var compro=true;
    var stock= parseInt(document.forms.anaStock.stockaAna.value);

    if(stock<0){
        document.getElementById("errorFormStock").innerHTML = "El Stock no puede ser negativo";
        compro=false;
    }

    return compro;
}