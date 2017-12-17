"use strict";

//Instanciamos el objeto StoreHouse.
var instancia = StoreHouse.getInstance();

//Le ponemos un nombre y lo imprimos por pantalla.
instancia.nombre = "Ámazon";
console.log("El nombre de nuestra StoreHouse: " + instancia.nombre);

//Volvemos a instanciarlo para comprobar que hemos programado el singelton correctamente y lo imprimimos por pantalla.
var instancia2 = StoreHouse.getInstance();
console.log("Comprobamos el funcionamiento del singelton imprimendolo desde otra variable: " + instancia2.nombre);

//Creamos tres objetos pantalon uno unisex, otro masculino y otro femenino, tres zapatos.
var pantalonUni = new Pants("502", 300, 42, "Unisex");
var pantalonMascu = new Pants("501", 400, 48, "Masculino");
var pantalonFeme = new Pants("500", 500, 32, "Femenino");

var zapato = new Shoes("mercurial", 80, 38, "Unisex");
var zapato2 = new Shoes("convers", 40, 45, "Masculino");
var zapato3 = new Shoes("shaquille", 20, 40, "Femenino");

//Creamos tres categorias: moda, femenina y masculina.
var categoriaModa = new Category("Moda");
var categoriaFemenina = new Category("ModaFemenina");
var categoriaMasculina = new Category("ModaMasculina");

//Las añadimos a nuestro StoreHouse.
console.log("El número de categorias es: " + instancia.addCategories(categoriaModa, categoriaFemenina, categoriaMasculina));

//Mostramos las categorias

console.log("Mostramos las categorias en StoreHouse una vez introducidas: " + recorrerItera(instancia.getCategorys));

//Borramos unas categoria para probar el metodo removeCategory.

console.log("El número de categorias es: " + instancia.removeCategories(categoriaModa, categoriaFemenina));

//Mostramos las categorias

console.log("Mostramos las categorias en StoreHouse una vez borradas algunas: " + recorrerItera(instancia.getCategorys));

//Añadimos los pantalones y zapatos a sus respectivas categorias, las categorias en caso de no existir se añaden.
instancia.addProduct(pantalonUni, categoriaModa);
instancia.addProduct(pantalonFeme, categoriaModa, categoriaFemenina);
instancia.addProduct(pantalonMascu, categoriaModa, categoriaMasculina);

instancia.addProduct(zapato, categoriaModa);
instancia.addProduct(zapato2, categoriaModa, categoriaFemenina);
instancia.addProduct(zapato3, categoriaModa, categoriaMasculina);

//Mostramos Productos Filtrados por categorias:
console.log("Productos de la categoria Moda: " + recorrerItera(instancia.getCategoryProducts(categoriaModa)));
console.log("Productos de la categoria Moda y que sean pantalones: " + recorrerItera(instancia.getCategoryProducts(categoriaModa, Pants)));
console.log("Productos de la categoria Moda y que sean zapatos: " + recorrerItera(instancia.getCategoryProducts(categoriaModa, Shoes)));
console.log("Productos de la categoria Femenina: " + recorrerItera(instancia.getCategoryProducts(categoriaFemenina)));
console.log("Productos de la categoria Masculina: " + recorrerItera(instancia.getCategoryProducts(categoriaMasculina)));

//Mostramos los productos en nuestra StoreHouse.
console.log("Mostramos los productos en nuestra StoreHouse una vez introducidos: " + recorrerItera(instancia.getProducts));

//Borramos productos para probar el removeProduct

instancia.removeProducts(pantalonFeme, pantalonMascu);

//Mostramos los productos en nuestra StoreHouse.
console.log("Mostramos los productos en nuestra StoreHouse una vez borrados algunos: " + recorrerItera(instancia.getProducts));

//Los volvemos a añadir.

instancia.addProduct(pantalonFeme, categoriaModa, categoriaFemenina);
instancia.addProduct(pantalonMascu, categoriaModa, categoriaFemenina);

console.log("Mostramos los productos en nuestra StoreHouse otra vez introducidos: " + recorrerItera(instancia.getProducts));

//Nos creamos un par de tiendas.

var tienda1 = new Shop("t1", "tienda1");
var tienda2 = new Shop("t2", "tienda2");

//Las añadimos

instancia.addShops(tienda1, tienda2);

//Mostramos las tiendas

console.log("Mostramos las tiendas en StoreHouse una vez introducidas: " + recorrerItera(instancia.getShops));

//Añadimos productos a las tiendas

console.log("La tienda 1 tiene el numero de elementos: " + instancia.addProductInShop(pantalonMascu, tienda1, 30));
console.log("La tienda 2 tiene el numero de elementos: " + instancia.addProductInShop(pantalonMascu, tienda2, 500));
console.log("La tienda 2 tiene el numero de elementos: " + instancia.addProductInShop(pantalonFeme, tienda2, 100));
console.log("La tienda 1 tiene el numero de elementos: " + instancia.addProductInShop(zapato, tienda1, 20));
console.log("La tienda 2 tiene el numero de elementos: " + instancia.addProductInShop(zapato, tienda2, 50));
console.log("La tienda 2 tiene el numero de elementos: " + instancia.addProductInShop(zapato3, tienda2, 60));


//Añadimos stock a los productos de nustras tiendas
console.log("Añadimos 10 pantalones masculinos a la tienda 1: " + instancia.addQuantityProductInShop(pantalonMascu, tienda1, 10));
console.log("Añadimos 50 pantalones masculinos a la tienda 2: " + instancia.addQuantityProductInShop(pantalonMascu, tienda2, 50));
console.log("Añadimos 22 pantalones femeninos a la tienda 2: " + instancia.addQuantityProductInShop(pantalonFeme, tienda2, 22));

//Miramos que productos tenemos en cada tienda.
console.log("En la tienda por defecto deberemos tener todos los objetos alojados: " + recorrerIteraProductosTienda(instancia.getShopProducts(instancia.defaultShop)));
console.log("En la tienda uno tenemos los productos: " + recorrerIteraProductosTienda(instancia.getShopProducts(tienda1)));
console.log("En la tienda uno tenemos los productos: " + recorrerIteraProductosTienda(instancia.getShopProducts(tienda1)));
console.log("En la tienda 2 dos tenemos los productos: " + recorrerIteraProductosTienda(instancia.getShopProducts(tienda2)));
console.log("En la tienda 2 dos tenemos los productos filtrados por zapatos: " + recorrerIteraProductosTienda(instancia.getShopProducts(tienda2, Shoes)));

function recorrerItera(instancia) {
    var epo = instancia.next();
    var cadena = "";

    while (!epo.done) {

        cadena += epo.value + "---";
        epo = instancia.next();
    }
    return cadena;
}

function recorrerIteraProductosTienda(instancia) {
    var epo = instancia.next();
    var cadena = "";

    while (!epo.done) {

        cadena += "Producto: " + epo.value.product + ", Stock " + epo.value.stock + "--";
        epo = instancia.next();
    }
    return cadena;
}