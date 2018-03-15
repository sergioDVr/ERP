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
    var arrayProductos = db.createObjectStore(DB_STORE_PRODUCTOS, {keyPath: "serialNumber"});
    var arrayCategorias = db.createObjectStore(DB_STORE_CATEGORIAS, {keyPath: "category.title"});
    var arrayTiendas = db.createObjectStore(DB_STORE_TIENDAS, {keyPath: "shop.nif"});
    try {

        arrayTiendas.transaction.oncomplete = function () {
            var init;
            $.ajax({
                url: 'initJSON.json',
                type: 'get',
                async: false,
                success:  function (data) {
                    init = data;
                    var transaction = db.transaction([DB_STORE_PRODUCTOS, DB_STORE_CATEGORIAS, DB_STORE_TIENDAS], "readwrite");

                    var _arrayTiendas = transaction.objectStore(DB_STORE_TIENDAS);
                    for (var i in init[2]) {
                        _arrayTiendas.add(init[2][i]);
                    }
                    var _arrayCategorias = transaction.objectStore(DB_STORE_CATEGORIAS);
                    for (var i in init[0]) {
                        _arrayCategorias.add(init[0][i]);

                    }
                    var _arrayProductos = transaction.objectStore(DB_STORE_PRODUCTOS);
                    for (var i in init[1]) {
                        _arrayProductos.add(init[1][i]);
                    }
                }
            });
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
            tienda.coordenadas = new Coords(cursor.value.shop.coordenadas.latitude, cursor.value.shop.coordenadas.longitude);
            var aMeter = {
                product: cursor.value.product,
                shop: tienda
            }
            instancia.tiendasDB.push(aMeter);
            cursor.continue();
        }else{
            initPopulateTiendas();
        }
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

function addProductDb(producto) {

    var transaction = db.transaction([DB_STORE_PRODUCTOS], "readwrite");

    transaction.onerror = function (event) {
// Don't forget to handle errors!
        alert("Error en transaction: " + event.target.error);
    };

    var objectoProductos = transaction.objectStore(DB_STORE_PRODUCTOS);

    var request2 = objectoProductos.add(producto.getObject());

    request2.onsuccess = function (even) {
        console.log("Producto añadida a la Base");
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



