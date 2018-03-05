"use strict";

if (!window.indexedDB) {
    window.alert("Su navegador no soporta una versión estable de indexedDB.Tal y como las características no serán validas");
}
var db;
const DB_NAME = 'arraysERP';
const DB_VERSION = 1;
const DB_STORE_CATEGORIAS = 'categorias';
const DB_STORE_PRODUCTOS = 'productos';
const DB_STORE_TIENDAS = 'tiendas';

var request = indexedDB.open(DB_NAME, DB_VERSION);
//Objeto para inicializar almacenar en la base de datos todos los objetos si estos no estan creados
request.onupgradeneeded = function (event) {

    db = event.target.result;

    // try {
    var categoriaModa = new Category("Moda");
    var categoriaFemenina = new Category("ModaFemenina");
    var categoriaMasculina = new Category("ModaMasculina");
    var categoriaDeporte = new Category("Deporte");
    var categoriaDepFemenio = new Category("Deporte Femenino");
    var categoriaDepMasculino = new Category("Deporte Masculino");
    var categoriaDepNiño = new Category("Deporte Niños");

    //Les añadimos una descripcion a las categorias
    categoriaModa.description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque beatae consequatur culpa cum dolores eveniet id illo, magni maiores nemo neque odio officia perferendis provident, unde ut voluptate voluptatem. Facilis!";
    categoriaFemenina.description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque beatae consequatur culpa cum dolores eveniet id illo, magni maiores nemo neque odio officia perferendis provident, unde ut voluptate voluptatem. Facilis!";
    categoriaMasculina.description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque beatae consequatur culpa cum dolores eveniet id illo, magni maiores nemo neque odio officia perferendis provident, unde ut voluptate voluptatem. Facilis!";
    categoriaDeporte.description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque beatae consequatur culpa cum dolores eveniet id illo, magni maiores nemo neque odio officia perferendis provident, unde ut voluptate voluptatem. Facilis!";
    categoriaDepFemenio.description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque beatae consequatur culpa cum dolores eveniet id illo, magni maiores nemo neque odio officia perferendis provident, unde ut voluptate voluptatem. Facilis!";
    categoriaDepMasculino.description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque beatae consequatur culpa cum dolores eveniet id illo, magni maiores nemo neque odio officia perferendis provident, unde ut voluptate voluptatem. Facilis!";
    categoriaDepNiño.description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque beatae consequatur culpa cum dolores eveniet id illo, magni maiores nemo neque odio officia perferendis provident, unde ut voluptate voluptatem. Facilis!";

    var Bershka = new Shop("t1", "Bershka");
    var PaB = new Shop("t2", "Pull and Bear");
    var primark = new Shop("t3", "Primark");
    var dutti = new Shop("t4", "Massimo Dutti");
    var decathlon = new Shop("t5", "Decathlon");
    var zara = new Shop("t6", "Zara");
    //Les añadimos las rutas de las fotos.
    Bershka.imagen = "imagenes/tiendas/bershka.jpeg";
    PaB.imagen = "imagenes/tiendas/pull-bear.jpg";
    primark.imagen = "imagenes/tiendas/primark.jpg";
    dutti.imagen = "imagenes/tiendas/dutti.jpg";
    decathlon.imagen = "imagenes/tiendas/decathlon.jpg";
    zara.imagen = "imagenes/tiendas/zara.jpg";
    //añadimos telefono
    Bershka.telefono = "638595030";
    PaB.telefono = "62584952";
    primark.telefono = "666988554";
    dutti.telefono = "658748512";
    decathlon.telefono = "658525254";
    zara.telefono = "632255887";
    //añadimos una direccion.
    Bershka.direccion = "Calle Moreria, Número 34";
    PaB.direccion = "Calle toledo, Número 11";
    primark.direccion = "Calle Real, Número 112";
    dutti.direccion = "Ronda Calatrava, Número 13";
    decathlon.direccion = "Calle Melchor Cano, Número 26";
    zara.direccion = "Calle Fuen Santa, Número 44";
    //añadimos descripcion
    Bershka.descripcion = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dolorem doloribus ducimus, expedita fugit impedit ipsa ipsam maiores maxime nam quaerat quod, recusandae saepe, voluptatem voluptatum. Ducimus ipsam tempora unde.";
    PaB.descripcion = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dolorem doloribus ducimus, expedita fugit impedit ipsa ipsam maiores maxime nam quaerat quod, recusandae saepe, voluptatem voluptatum. Ducimus ipsam tempora unde.";
    primark.descripcion = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dolorem doloribus ducimus, expedita fugit impedit ipsa ipsam maiores maxime nam quaerat quod, recusandae saepe, voluptatem voluptatum. Ducimus ipsam tempora unde.";
    dutti.descripcion = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dolorem doloribus ducimus, expedita fugit impedit ipsa ipsam maiores maxime nam quaerat quod, recusandae saepe, voluptatem voluptatum. Ducimus ipsam tempora unde.";
    decathlon.descripcion = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dolorem doloribus ducimus, expedita fugit impedit ipsa ipsam maiores maxime nam quaerat quod, recusandae saepe, voluptatem voluptatum. Ducimus ipsam tempora unde.";
    zara.descripcion = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dolorem doloribus ducimus, expedita fugit impedit ipsa ipsam maiores maxime nam quaerat quod, recusandae saepe, voluptatem voluptatum. Ducimus ipsam tempora unde.";


    var categorias = [{
        category: categoriaDeporte.getObject(),
        product: [7, 9, 8], tittle: "Deporte"
    },

        {
            category: categoriaDepFemenio.getObject(),
            product: [8]
        },
        {
            category: categoriaDepMasculino.getObject(),
            product: [9]
        },
        {
            category: categoriaDepNiño.getObject(),
            product: [7]
        },
        {
            category: categoriaModa.getObject(),
            product: [1, 3, 2, 4, 5, 6]
        },
        {
            category: categoriaFemenina.getObject(),
            product: [3, 6]
        },
        {
            category: categoriaMasculina.getObject(),
            product: [2, 5]
        }]


    var productos = [new Pants(1, "502", 300, "Lorem ipsum dolor sit amet, consectetur adipisicin…provident, unde ut voluptate voluptatem. Facilis!", "imagenes/productos/pantalonesUnisex.jpg", 34, "Femenino").getObject()
        ,
        new Pants(2, "501", 400, "Lorem ipsum dolor sit amet, consectetur adipisicin…provident, unde ut voluptate voluptatem. Facilis!", "imagenes/productos/pantalonesMasculinos.jpg", 38, "Masculino").getObject()
        ,
        new Pants(3, "500", 500, "Lorem ipsum dolor sit amet, consectetur adipisicin…provident, unde ut voluptate voluptatem. Facilis!", "imagenes/productos/pantalonesFemeninos.jpg", 36, "Femenino").getObject()
        ,
        new Shoes(4, "Mercurial", 80, "Lorem ipsum dolor sit amet, consectetur adipisicin…provident, unde ut voluptate voluptatem. Facilis!", "imagenes/productos/zapatillasUnisex.jpg", 36, "Unisex").getObject()
        ,
        new Shoes(5, "Convers", 40, "Lorem ipsum dolor sit amet, consectetur adipisicin…provident, unde ut voluptate voluptatem. Facilis!", "imagenes/productos/zapatillasMasculinas.jpg", 42, "Masculino").getObject()
        ,
        new Shoes(6, "Shaquille", 20, "Lorem ipsum dolor sit amet, consectetur adipisicin…provident, unde ut voluptate voluptatem. Facilis!", "imagenes/productos/zapatillasFemeninas.jpg", 36, "Femenino").getObject()
        ,
        new Camiseta(7, "Camiseta Roja Niño", 10, "Lorem ipsum dolor sit amet, consectetur adipisicin…provident, unde ut voluptate voluptatem. Facilis!", "imagenes/productos/camisetaDeporteNiño.jpg", 36, "Unisex").getObject()
        ,
        new Camiseta(8, "Mallas Mujer", 15, "Lorem ipsum dolor sit amet, consectetur adipisicin…provident, unde ut voluptate voluptatem. Facilis!", "imagenes/productos/mayasMujer.jpg", 40, "Femenino").getObject()
        ,
        new Camiseta(9, "Mallas Hombre", 12, "Lorem ipsum dolor sit amet, consectetur adipisicin…provident, unde ut voluptate voluptatem. Facilis!", "imagenes/productos/mayasHombre.jpg", 40, "Masculino").getObject()
    ];

    var tiendas = [
        {
            product: [
                {product: 2, stock: 30},
                {product: 4, stock: 20}],
            shop: Bershka.getObject()
        },
        {
            product: [
                {product: 2, stock: 500},
                {product: 3, stock: 100},
                {product: 4, stock: 50},
                {product: 6, stock: 60}],
            shop: PaB.getObject()
        },
        {
            product: [{product: 1, stock: 17},
                {product: 5, stock: 50}],
            shop: primark.getObject()
        },
        {
            product: [],
            shop: dutti.getObject()
        },
        {
            product: [
                {product: 7, stock: 10},
                {product: 8, stock: 30},
                {product: 9, stock: 50}],
            shop: decathlon.getObject()
        },
        {
            product: [],
            shop: zara.getObject()
        }

    ];
    try {
        //Almacenamiento Productos.
        var arrayProductos = db.createObjectStore(DB_STORE_PRODUCTOS, {keyPath: "serialNumber"});
        var arrayCategorias = db.createObjectStore(DB_STORE_CATEGORIAS, {keyPath: "category.title"});
        var arrayTiendas = db.createObjectStore(DB_STORE_TIENDAS, {keyPath: "shop.nif"});

        for (var i in productos) {
            arrayProductos.add(productos[i]);
        }

        for (var i in tiendas) {
            arrayTiendas.add(tiendas[i]);
        }
        for (var i in categorias) {
            arrayCategorias.add(categorias[i]);
        }

    } catch (e) {
        console.log("Exception creating object store: " + e);
    }
};
window.onload = request.onerror = function (event) {
    console.log("Error en la solicitud: " + event.target.error);
};

request.onsuccess = function (event) {

//Iniciamos nuestro erp.
    var instancia = StoreHouse.getInstance();
    window.instancia = instancia;
// I get a DB to use it in my students form.
    db = event.target.result;
    db.onerror = function (event) {
// Generic error handler for all errors targeted at this database's
// requests!
        console.log("Error en el acceso a la base de datos: " + event.target.error);
    };
    var transaction = db.transaction([DB_STORE_CATEGORIAS, DB_STORE_TIENDAS, DB_STORE_PRODUCTOS]);
    var objectStoreCategorias = transaction.objectStore(DB_STORE_CATEGORIAS);
    objectStoreCategorias.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            var categoria = new Category(cursor.value.category.title);
            categoria.description = cursor.value.category.description;
            var aMeter = {
                category: categoria,
                product: cursor.value.product
            }

            instancia.categoriasDB.push(aMeter);
            cursor.continue();
        }
    }
    var objectStoreTiendas = transaction.objectStore(DB_STORE_TIENDAS);
    objectStoreTiendas.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {

            var tienda = new Shop(cursor.value.shop.nif, cursor.value.shop.name);
            tienda.imagen = cursor.value.shop.imagen;
            tienda.telefono = cursor.value.shop.telefono;
            tienda.direccion = cursor.value.shop.direccion;
            tienda.descripcion = cursor.value.shop.descripcion;
            var aMeter = {
                product: cursor.value.product,
                shop: tienda
            }
            instancia.tiendasDB.push(aMeter);
            cursor.continue();
        }
        initPopulateTiendas();
    }
    var objectStoreProductos = transaction.objectStore(DB_STORE_PRODUCTOS);
    objectStoreProductos.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            instancia.productsDB.push(new Camiseta(cursor.value.serialNumber, cursor.value.name, cursor.value.price, cursor.value.descripcion, cursor.value.imagen, cursor.value.size, cursor.value.gender));
            cursor.continue();
        }
    }
};

function addProductDb(product) {

    var transaction = db.transaction([DB_STORE_PRODUCTOS], "readwrite");

    transaction.onerror = function (event) {
// Don't forget to handle errors!
        alert("Error en transaction: " + event.target.error);
    };

    var objectoProductos = transaction.objectStore(DB_STORE_PRODUCTOS);

    var request2 = objectoProductos.add(producto.getObject());

    request2.onsuccess = function (even) {
        console.log("Categoria añadida a la Base");
    }
}

function addCategoryDb(category) {

    var transaction = db.transaction([DB_STORE_CATEGORIAS], "readwrite");

    transaction.onerror = function (event) {
// Don't forget to handle errors!
        alert("Error en transaction: " + event.target.error);
    };

    var objectoCategoria = transaction.objectStore("categorias");


    var categoria = {
        category: category.getObject(),
        product: [],
    };
    var request2 = objectoCategoria.add(categoria);

    request2.onsuccess = function (even) {
        console.log("Categoria añadida a la Base");
    }
}

function addShopDb(shop) {

    var transaction = db.transaction([DB_STORE_TIENDAS], "readwrite");

    transaction.onerror = function (event) {
// Don't forget to handle errors!
        alert("Error en transaction: " + event.target.error);
    };

    var objectoCategoria = transaction.objectStore(DB_STORE_TIENDAS);

    var tienda = {
        product: shop.product,
        shop: shop.shop.getObject()
    };
    var request2 = objectoCategoria.add(tienda);

    request2.onsuccess = function (even) {
        console.log("Categoria añadida a la Base");
    }
}

function addProductInCategoryDb(tituloCategoria, arraProductos) {
    var objectStore = db.transaction([DB_STORE_CATEGORIAS], "readwrite").objectStore(DB_STORE_CATEGORIAS);
    var request = objectStore.get(tituloCategoria);

    request.onsuccess = function (event) {
        // Get the old value that we want to update
        var data = request.result;

        // update the value(s) in the object that you want to change
        data.product = arraProductos;

        // Put this updated object back into the database.
        var requestUpdate = objectStore.put(data);
        requestUpdate.onerror = function (event) {
            // Do something with the error
        };
        requestUpdate.onsuccess = function (event) {
            // Success - the data is updated!
        };
    };
}

function addProductInShopDB(nifTienda, arraProductosyStock) {
    var objectStore = db.transaction([DB_STORE_TIENDAS], "readwrite").objectStore(DB_STORE_TIENDAS);
    var request = objectStore.get(nifTienda);

    request.onsuccess = function (event) {
        // Get the old value that we want to update
        var data = request.result;

        // update the value(s) in the object that you want to change
        data.product = arraProductosyStock;

        // Put this updated object back into the database.
        var requestUpdate = objectStore.put(data);
        requestUpdate.onerror = function (event) {
            // Do something with the error
        };
        requestUpdate.onsuccess = function (event) {
            // Success - the data is updated!
        };
    };
}

function addQuantityProductInShopDB(nifTienda, stockt, posicionProducto) {
    var objectStore = db.transaction([DB_STORE_TIENDAS], "readwrite").objectStore(DB_STORE_TIENDAS);
    var request = objectStore.get(nifTienda);

    request.onsuccess = function (event) {
        // Get the old value that we want to update
        var data = request.result;

        // update the value(s) in the object that you want to change
        data.product[posicionProducto].stock = stockt;

        // Put this updated object back into the database.
        var requestUpdate = objectStore.put(data);
        requestUpdate.onerror = function (event) {

        };
        requestUpdate.onsuccess = function (event) {
            // Success - the data is updated!
        };
    };
}

function removeCategoryDB(titulocategory) {
    var request = db.transaction(DB_STORE_CATEGORIAS, "readwrite")
        .objectStore(DB_STORE_CATEGORIAS)
        .delete(titulocategory);

    request.onsuccess = function (event) {
        // It's gone!
    };

    request.onerror = function (event) {
        // It's gone!
    };
}

function removeProductDB(serialProducto) {
    var request = db.transaction(DB_STORE_PRODUCTOS, "readwrite")
        .objectStore(DB_STORE_PRODUCTOS)
        .delete(serialProducto);

    request.onsuccess = function (event) {
        // It's gone!
    };

    request.onerror = function (event) {
        // It's gone!
    };
}

function removeShopDB(nifTienda) {
    var request = db.transaction(DB_STORE_TIENDAS, "readwrite")
        .objectStore(DB_STORE_TIENDAS)
        .delete(nifTienda);

    request.onsuccess = function (event) {
        // It's gone!
    };

    request.onerror = function (event) {
        // It's gone!
    };
}

function modifyShopDb(shop) {
    var objectStore = db.transaction([DB_STORE_TIENDAS], "readwrite").objectStore(DB_STORE_TIENDAS);
    var request = objectStore.get(shop.nif);

    request.onsuccess = function (event) {
        // Get the old value that we want to update
        var data = request.result;


        // update the value(s) in the object that you want to change
        data.shop = shop.getObject();

        // Put this updated object back into the database.
        var requestUpdate = objectStore.put(data);
        requestUpdate.onerror = function (event) {

        };
        requestUpdate.onsuccess = function (event) {
            // Success - the data is updated!
        };
    };
}

function modifyCategoryDb(category) {
    var objectStore = db.transaction([DB_STORE_CATEGORIAS], "readwrite").objectStore(DB_STORE_CATEGORIAS);
    console.log(category);
    var request = objectStore.get(category.title);

    request.onsuccess = function (event) {
        // Get the old value that we want to update
        var data = request.result;


        // update the value(s) in the object that you want to change
        data.category = category.getObject();

        // Put this updated object back into the database.
        var requestUpdate = objectStore.put(data);
        requestUpdate.onerror = function (event) {

        };
        requestUpdate.onsuccess = function (event) {
            // Success - the data is updated!
        };
    };
}



