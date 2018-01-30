//Funcion donde instanciamos todos los objetos de nuestro ERP
function init() {

    //OBJETO STOREHOUSE.
    var instancia = StoreHouse.getInstance();
    //Le ponemos un nombre.
    instancia.nombre = "Store House";

    //PRODUCTOS
    //pantalones
    var pantalonUni = new Pants("502", 300, 42, "Unisex");
    var pantalonMascu = new Pants("501", 400, 48, "Masculino");
    var pantalonFeme = new Pants("500", 500, 32, "Femenino");
    //zapatos
    var zapatoUni = new Shoes("Mercurial", 80, 38, "Unisex");
    var zapatoMascu = new Shoes("Convers", 40, 45, "Masculino");
    var zapatoFeme = new Shoes("Shaquille", 20, 40, "Femenino");
    //camisetas
    var camiNiño = new Camiseta("Camiseta Roja Niño", 10, 20);
    //mayas
    var mayasMujer = new Pants("Mallas Mujer", 15, 36, "Femenino");
    var mayasHombre = new Pants("Mallas Hombre", 12, 38,"Masculino")
    //Les añadimos las fotos
    pantalonUni.imagen ="imagenes/productos/pantalonesUnisex.jpg";
    pantalonMascu.imagen ="imagenes/productos/pantalonesMasculinos.jpg";
    pantalonFeme.imagen ="imagenes/productos/pantalonesFemeninos.jpg";
    zapatoUni.imagen="imagenes/productos/zapatillasUnisex.jpg";
    zapatoMascu.imagen="imagenes/productos/zapatillasMasculinas.jpg";
    zapatoFeme.imagen="imagenes/productos/zapatillasFemeninas.jpg";
    camiNiño.imagen="imagenes/productos/camisetaDeporteNiño.jpg";
    mayasHombre.imagen="imagenes/productos/mayasHombre.jpg";
    mayasMujer.imagen= "imagenes/productos/mayasMujer.jpg";

    //CATEGORIAS
    var categoriaModa = new Category("Moda");
    var categoriaFemenina = new Category("ModaFemenina");
    var categoriaMasculina = new Category("ModaMasculina");
    var categoriaDeporte = new Category("Deporte");
    var categoriaDepFemenio = new Category("Deporte Femenino");
    var categoriaDepMasculino = new Category("Deporte Masculino");
    var categoriaDepNiño = new Category("Deporte Niños");
    //Las añadimos
    instancia.addCategories(categoriaModa, categoriaFemenina, categoriaMasculina, categoriaDeporte, categoriaDepFemenio,categoriaDepMasculino);

    //AÑADIMOS LOS PRODUCTOS A LAS CATEGORIAS
    instancia.addProduct(pantalonUni, categoriaModa);
    instancia.addProduct(pantalonFeme, categoriaModa, categoriaFemenina);
    instancia.addProduct(pantalonMascu, categoriaModa, categoriaMasculina);
    instancia.addProduct(zapatoUni, categoriaModa);
    instancia.addProduct(zapatoMascu, categoriaModa, categoriaMasculina);
    instancia.addProduct(zapatoFeme, categoriaModa, categoriaFemenina);
    instancia.addProduct(camiNiño, categoriaDepNiño, categoriaDeporte);
    instancia.addProduct(mayasHombre, categoriaDepMasculino, categoriaDeporte);
    instancia.addProduct(mayasMujer, categoriaDepFemenio, categoriaDeporte);

    //TIENDAS.
    var Bershka = new Shop("t1", "Bershka");
    var PaB = new Shop("t2", "Pull and Bear");
    var primark = new Shop("t3", "Primark");
    var dutti = new Shop("t4", "Massimo Dutti");
    var decathlon = new Shop("t5", "Decathlon");
    var zara = new Shop("t6", "Zara");
    //Les añadimos las rutas de las fotos.
    Bershka.imagen ="imagenes/tiendas/bershka.jpeg";
    PaB.imagen ="imagenes/tiendas/pull-bear.jpg";
    primark.imagen ="imagenes/tiendas/primark.jpg";
    dutti.imagen="imagenes/tiendas/dutti.jpg";
    decathlon.imagen="imagenes/tiendas/decathlon.jpg";
    zara.imagen="imagenes/tiendas/zara.jpg";
    //añadimos telefono
    Bershka.telefono ="638595030";
    PaB.telefono="62584952";
    primark.telefono="666988554";
    dutti.telefono="658748512";
    decathlon.telefono="658525254";
    zara.telefono="632255887";
    //añadimos una direccion.
    Bershka.direccion="Calle Moreria, Número 34";
    PaB.direccion="Calle toledo, Número 11";
    primark.direccion="Calle Real, Número 112";
    dutti.direccion="Ronda Calatrava, Número 13";
    decathlon.direccion="Calle Melchor Cano, Número 26";
    zara.direccion="Calle Fuen Santa, Número 44";
    //añadimos descripcion
    Bershka.descripcion="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dolorem doloribus ducimus, expedita fugit impedit ipsa ipsam maiores maxime nam quaerat quod, recusandae saepe, voluptatem voluptatum. Ducimus ipsam tempora unde.";
    PaB.descripcion="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dolorem doloribus ducimus, expedita fugit impedit ipsa ipsam maiores maxime nam quaerat quod, recusandae saepe, voluptatem voluptatum. Ducimus ipsam tempora unde.";
    primark.descripcion="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dolorem doloribus ducimus, expedita fugit impedit ipsa ipsam maiores maxime nam quaerat quod, recusandae saepe, voluptatem voluptatum. Ducimus ipsam tempora unde.";
    dutti.descripcion="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dolorem doloribus ducimus, expedita fugit impedit ipsa ipsam maiores maxime nam quaerat quod, recusandae saepe, voluptatem voluptatum. Ducimus ipsam tempora unde.";
    decathlon.descripcion="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dolorem doloribus ducimus, expedita fugit impedit ipsa ipsam maiores maxime nam quaerat quod, recusandae saepe, voluptatem voluptatum. Ducimus ipsam tempora unde.";
    zara.descripcion="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dolorem doloribus ducimus, expedita fugit impedit ipsa ipsam maiores maxime nam quaerat quod, recusandae saepe, voluptatem voluptatum. Ducimus ipsam tempora unde.";

    //Las añadimos
    instancia.addShops(Bershka, PaB, primark, dutti,decathlon, zara);

    //AÑADIMOS PRODUCTOS A LAS TIENDAS
    instancia.addProductInShop(pantalonUni, primark, 17);
    instancia.addProductInShop(zapatoMascu, primark, 50);
    instancia.addProductInShop(pantalonMascu, Bershka, 30);
    instancia.addProductInShop(pantalonMascu, PaB, 500);
    instancia.addProductInShop(pantalonFeme, PaB, 100);
    instancia.addProductInShop(zapatoUni, Bershka, 20);
    instancia.addProductInShop(zapatoUni, PaB, 50);
    instancia.addProductInShop(zapatoFeme, PaB, 60);
    instancia.addProductInShop(camiNiño,decathlon,10);
    instancia.addProductInShop(mayasMujer, decathlon, 30);
    instancia.addProductInShop(mayasHombre,decathlon,50);
    window.instancia =instancia;

}
//Esta funcion se ejecuta cuando es cargada la página.
window.onload=init();