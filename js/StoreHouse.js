"use strict";

//Error base de StoreHouse
function StoreHouseException() {
    this.name = "StoreHouseException";
    this.message = "Error: Store House Generic Exception.";
}

StoreHouseException.prototype = new BaseException(); //Heredamos de BaseException
StoreHouseException.prototype.constructor = StoreHouseException;

//------Errores de categorias-------

function CategoryStoreHouseException() {
    this.name = "CategoryStoreHouseException";
    this.message = "Error: The method needs a Category parameter.";
}

CategoryStoreHouseException.prototype = new StoreHouseException(); //Heredamos de StoreHouseException
CategoryStoreHouseException.prototype.constructor = CategoryStoreHouseException;

function ProductStoreHouseException() {
    this.name = "ProductStoreHouseException";
    this.message = "Error: The method needs a Product parameter.";
}

ProductStoreHouseException.prototype = new StoreHouseException(); //Heredamos de StoreHouseException
ProductStoreHouseException.prototype.constructor = ProductStoreHouseException;

function CategoryExistStoreHouseException() {
    this.name = "CategoryExistStoreHouseException";
    this.message = "Error: The Category already exist in the StoreHouse.";
}

CategoryExistStoreHouseException.prototype = new StoreHouseException(); //Heredamos de StoreHouseException
CategoryExistStoreHouseException.prototype.constructor = CategoryExistStoreHouseException;

function CategoryNotExistStoreHouseException() {
    this.name = "CategoryNotExistStoreHouseException";
    this.message = "Error: The Category Not exist in the StoreHouse.";
}

CategoryNotExistStoreHouseException.prototype = new StoreHouseException(); //Heredamos de StoreHouseException
CategoryNotExistStoreHouseException.prototype.constructor = CategoryNotExistStoreHouseException;

function DefaultCategoryStoreHouseException() {
    this.name = "DefaultCategoryStoreHouseException";
    this.message = "Error: The deafult category can't be removed.";
}

DefaultCategoryStoreHouseException.prototype = new StoreHouseException(); //Heredamos de ImageManagerException
DefaultCategoryStoreHouseException.prototype.constructor = DefaultCategoryStoreHouseException;

//--- Errores de productos ------------

function ProductExistStoreHouseException() {
    this.name = "ProductExistStoreHouseException";
    this.message = "Error: The Product already exist in the Store house.";
}

ProductExistStoreHouseException.prototype = new StoreHouseException(); //Heredamos de StoreHouseException
ProductExistStoreHouseException.prototype.constructor = ProductExistStoreHouseException;

function ProductExistInShopStoreHouseException() {
    this.name = "ProductExistInShopStoreHouseException";
    this.message = "Error: The Product already exist in the Shop.";
}

ProductExistInShopStoreHouseException.prototype = new StoreHouseException(); //Heredamos de StoreHouseException
ProductExistInShopStoreHouseException.prototype.constructor = ProductExistInShopStoreHouseException;

function ProductNotExistInShopStoreHouseException() {
    this.name = "ProductNotExistInShopStoreHouseException";
    this.message = "Error: The Product Not exist in the Shop.";
}

ProductNotExistInShopStoreHouseException.prototype = new StoreHouseException(); //Heredamos de StoreHouseException
ProductNotExistInShopStoreHouseException.prototype.constructor = ProductNotExistInShopStoreHouseException;

function ProductNotExistStoreHouseException() {
    this.name = "ProductNotExistStoreHouseException";
    this.message = "Error: The Product Not exist in the Store house.";
}

ProductNotExistStoreHouseException.prototype = new StoreHouseException(); //Heredamos de StoreHouseException
ProductNotExistStoreHouseException.prototype.constructor = ProductNotExistStoreHouseException;

//-----Errores de tiendas-----

function ShopStoreHouseException() {
    this.name = "ShopStoreHouseException";
    this.message = "Error: The method needs a Shop parameter.";
}

ShopStoreHouseException.prototype = new StoreHouseException(); //Heredamos de StoreHouseException
ShopStoreHouseException.prototype.constructor = ShopStoreHouseException;

function ShopNotExistStoreHouseException() {
    this.name = "ShopNotExistStoreHouseException";
    this.message = "Error: The Shop Not exist in the Store house.";
}

ShopNotExistStoreHouseException.prototype = new StoreHouseException(); //Heredamos de StoreHouseException
ShopNotExistStoreHouseException.prototype.constructor = ShopNotExistStoreHouseException;

function ShopExistInShopStoreHouseException() {
    this.name = "ShopExistInShopStoreHouseException";
    this.message = "Error: The Shop already exist in the StoreHouse.";
}

ShopExistInShopStoreHouseException.prototype = new StoreHouseException(); //Heredamos de StoreHouseException
ShopExistInShopStoreHouseException.prototype.constructor = ShopExistInShopStoreHouseException;

//------Montamos el objeto principal de nuestra Aplicación-----

var StoreHouse = (function () { //La función anónima devuelve un método getInstance que permite obtener el objeto único
    var instantiated; //Atributo privado que permite guardar la única instancia creada.

    function init() { //Este método se ejecuta una única vez y es el utilizado para crear la única instancia del objeto.
        function StoreHouse() {
            //La función se invoca con el operador new
            if (!(this instanceof StoreHouse)) throw new InvalidAccessConstructorException();

            //Definimos la propiedad Nombre del almacen.
            var _nombre = "Nombre no definido.";
            //getter y setter para el nombre.
            Object.defineProperty(this, "nombre", {

                get: function () {
                    return _nombre;
                },
                set: function (nombre = "Nombre no definido") {
                    nombre = nombre.trim();
                    if (nombre === 'undefined' || nombre === "Nombre no definido") throw new EmptyValueException("Nombre");
                    _nombre = nombre;
                }
            });

            //Definimos El array de productos, donde se van alojar todos los productos que tengamos.
            var _productos = [];
            //getter de productos que devuelve un iterador con todos los productos.
            Object.defineProperty(this, "getProducts", {
                get: function () {
                    var nextIndex = 0;
                    return {
                        next: function () {
                            return nextIndex < _productos.length ?
                                {value: _productos[nextIndex++], done: false} :
                                {done: true};
                        }
                    }
                }
            });

            //Definimos el array categorias, donde se alojaran todas las categorias que tengamos asi como los productos asociados a estas categorias.
            var _categories = [];
            //getter de categorias que devuelve un iterador con todos las categorias.
            Object.defineProperty(this, "getCategorys", {
                get: function () {
                    var nextIndex = 0;
                    return {
                        next: function () {
                            return nextIndex < _categories.length ?
                                {value: _categories[nextIndex++].category, done: false} :
                                {done: true};
                        }
                    }
                }

            });

            //Definimos el array de tiendas, donde se alojaran todas las tiendas que tengamos asi como sus productos.
            var _shops = [];
            //getter de tiendas que devuelve un iterador con todos las tiendas.
            Object.defineProperty(this, "getShops", {
                get: function () {
                    var nextIndex = 0;
                    return {
                        next: function () {
                            return nextIndex < _shops.length ?
                                {value: _shops[nextIndex++].shop, done: false} :
                                {done: true};
                        }
                    }
                }
            });

            //-----------------Metodos Categorias---------------------

            //Funcion que nos da la posicion de una categoria, tambien es quien nos lanza la excepcion si esta no existe.
            function positionCategory(category) {
                if (!(category instanceof Category) || (category == null)) throw new CategoryStoreHouseException();
                return _categories.findIndex(function (objeto) {
                    return objeto.category.title == category.title;
                });
            }

            //Metodo para añadir una categoria.
            this.addCategory = function (category) {
                if (!(category instanceof Category) || (category == null)) throw new CategoryStoreHouseException();
                if (positionCategory(category) == -1) {
                    _categories.push(
                        {
                            category: category,
                            product: []
                        }
                    );
                    return _categories.length;
                } else {
                    throw new CategoryExistStoreHouseException();
                }
            }

            //Metodo para añadir mas de una categoria las categorias se añadiran por parametro.
            this.addCategories = function () {
                var numCategorys = arguments.length;
                for (var i = 0; i < numCategorys; i++) {
                    if (!(arguments[i] instanceof Category) || (arguments[i] == null)) throw new CategoryStoreHouseException();
                    this.addCategory(arguments[i]);
                }
                return _categories.length;
            }

            //Elimina una categoría
            this.removeCategory = function (category) {
                if (!(category instanceof Category) || (category == null)) throw new CategoryStoreHouseException();
                var position = positionCategory(category);
                if (position != -1) {
                    if (category.title !== _defaultCategory.title) {
                        _categories.splice(position, 1);
                        return _categories.length;
                    } else {
                        throw new DefaultCategoryStoreHouseException();
                    }
                } else {
                    throw new CategoryNotExistStoreHouseException();
                }
            }

            //Elimina varias categorias
            this.removeCategories = function () {
                var numCategorys = arguments.length;
                for (var i = 0; i < numCategorys; i++) {
                    if (!(arguments[i] instanceof Category) || (arguments[i] == null)) throw new CategoryStoreHouseException();
                    this.removeCategory(arguments[i]);
                }
                return _categories.length;
            }

            //Muestra todos los productos de una categoria y todo su stock si le pasamos un tipo de producto filtra por ese tipo
            this.getCategoryProducts = function (category, product) {
                if (!(category instanceof Category) || (category == null)) throw new CategoryStoreHouseException();
                var product = product || "undefined";
                var posicion = positionCategory(category);
                if (posicion == -1) {
                    throw new CategoryNotExistStoreHouseException();
                } else {
                    var arraProductCategory
                    if (product != "undefined") {
                        var tama = _categories[posicion].product.length;
                        arraProductCategory = _productos.filter(function (producto) {

                            return _categories[posicion].product.findIndex(function (serial) {
                                return (serial == producto.serialNumber) && (producto instanceof product);
                            }) != -1;
                        })
                    } else {
                        arraProductCategory = _productos.filter(function (producto) {
                            return _categories[posicion].product.findIndex(function (serial) {
                                return serial == producto.serialNumber;
                            }) != -1;
                        })
                    }

                    var nextIndex = 0;
                    return {
                        next: function () {
                            return nextIndex < arraProductCategory.length ?
                                {value: arraProductCategory[nextIndex++], done: false} :
                                {done: true};
                        }
                    }
                }
            }

            //Categoría por defecto.
            var _defaultCategory = new Category("Anonymous category"); //Categoría por defecto

            //---------------Metodos Productos---------------------

            //Funcion que nos da la posicion de un producto, tambien es quien nos lanza la excepcion si esta no existe.
            function positionProduct(product) {
                return _productos.findIndex(function (Producto) {
                    if (!product instanceof Product || product == null) throw new ProductStoreHouseException();
                    return Producto == product;
                });
            }

            //Definimos el metodo addProduct para añadir productos lo podemos añadir a mas de una categoria añadiendo parametros.
            this.addProduct = function () {
                //Miramos que la posicion 1 y dos de los parametros minimo sean un producto y una categoria
                if (!arguments[0] instanceof Product || arguments[0] == null) throw new ProductStoreHouseException();
                if (!arguments[1] instanceof Category) throw new CategoryStoreHouseException();

                if (positionProduct(arguments[0]) == -1) {
                    //Si no existe el producto lo añadimos al array y lo añadimos a la tienda por defecto.
                    _productos.push(arguments[0]);
                    this.addProductInShop(arguments[0], _defaultShop, 0);
                    //y añadimos el producto a cada una de las categorias que tengamos si la categoria no existe la añadimos junto con el producto
                    var numCategorys = arguments.length;
                    for (var i = 1; i < numCategorys; i++) {
                        if (!arguments[i] instanceof Category) throw new CategoryStoreHouseException();

                        var position = positionCategory(arguments[i]);
                        if (position == -1) {
                            _categories.push({
                                category: arguments[i],
                                product: [arguments[0].serialNumber]
                            });
                        } else {
                            _categories[position].product.push(arguments[0].serialNumber);
                        }
                    }
                    return _productos.length;
                } else {
                    //si el producto ya existe lanzamos una excepcion.
                    throw new ProductExistStoreHouseException();
                }
            }
            //Definimos el metodo removeProduct para borrar un producto y todas sus depenencias.
            this.removeProduct = function (product) {
                if (!product instanceof Product) throw new ProductStoreHouseException();
                var posicionProducto = positionProduct(product);

                if (posicionProducto == -1) {
                    throw ProductNotExistStoreHouseException();
                } else {
                    _productos.splice(posicionProducto, 1);
                    var serial = product.serialNumber;
                    var numeroCategorias = _categories.length;
                    for (var i = 0; i < numeroCategorias; i++) {
                        var posicionProducto2 = _categories[i].product.findIndex(function (producto) {
                            return producto === serial;
                        });
                        if (posicionProducto2 != -1) _categories[i].product.splice(posicionProducto2, 1);
                    }
                    var numeroTiendas = _shops.length;
                    for (var i = 0; i < numeroTiendas; i++) {
                        var posicionProducto2 = _shops[i].product.findIndex(function (producto) {
                            return producto.product === serial;
                        });
                        if (posicionProducto2 != -1) _shops[i].product.splice(posicionProducto2, 1);
                    }

                    return _productos.length;
                }
            }
            //Metodo para borrar mas de un producto pasandoselo por parametro.
            this.removeProducts = function () {
                var numProducts = arguments.length;
                for (var i = 0; i < numProducts; i++) {
                    this.removeProduct(arguments[i]);
                }
                return _productos.length;
            }

            //funcion que nos diga la posicion de un producto en una tienda
            function positionProductInShop(product, positionShop) {
                if (!product instanceof Product) throw new ProductStoreHouseException();
                if (positionShop > _shops.length || positionShop < 0) throw new InvalidValueException("positionShop", "La posicion de tienda es invalida");
                return _shops[positionShop].product.findIndex(function (objetoProductYStock) {
                    return objetoProductYStock.product == product.serialNumber;
                });
            }

            //--------------Metodos de tiendas ----------------------------------

            //Funcion que nos da la posicion de una tienda, tambien es quien nos lanza la excepcion si esta no existe.
            function positionShop(shop) {
                return _shops.findIndex(function (tienda) {
                    if (!shop instanceof Shop) throw new ShopStoreHouseException();
                    return tienda.shop.name == shop.name;
                })
            }

            //Metodo para añadir una tienda
            this.addShop = function (shop) {
                if (!shop instanceof Shop || shop == null) throw new ShopStoreHouseException();
                var position = positionShop(shop);

                if (position == -1) {
                    _shops.push({
                        shop: shop,
                        product: []
                    });
                    return _shops.length
                } else {
                    throw new ShopExistInShopStoreHouseException();
                }
            }

            //Metodo para borrar una tienda
            this.removeShop = function (shop) {
                if (!shop instanceof Shop || shop == null) throw new ShopStoreHouseException();
                var position = positionShop(shop);
                if (position != -1) {
                    _shops.slice(position, 1);
                    return _shops.length
                } else {
                    throw new ShopNotExistStoreHouseException();
                }
            }
            //Metodo para añadir mas de una tienda
            this.addShops = function () {
                var numeroTiendas = arguments.length;
                for (var i = 0; i < numeroTiendas; i++) {
                    this.addShop(arguments[i]);
                }
            }
            //Definimos el metodo para añadir un producto en una tienda.
            this.addProductInShop = function (product, shop, number) {
                if (!product instanceof Product) throw new ProductStoreHouseException();
                if (!shop instanceof Shop) throw new ShopStoreHouseException();
                if (isNaN(number)) throw new InvalidValueException("Number", number);

                var position = positionShop(shop);
                if (position == -1) {
                    throw new ShopNotExistStoreHouseException();
                } else {
                    var position2 = positionProduct(product);
                    if (position2 == -1) {
                        throw new ProductNotExistStoreHouseException();
                    } else {
                        if (positionProductInShop(product, position) == -1) {
                            _shops[position].product.push({product: product.serialNumber, stock: number});
                            return _shops[position].product.length;
                        } else {
                            throw new ProductExistInShopStoreHouseException();
                        }
                    }
                }
            }

            //Metodo para añadir stock a un producto de una tienda
            this.addQuantityProductInShop = function (product, shop, number) {
                if (!product instanceof Product) throw new ProductStoreHouseException();
                if (!shop instanceof Shop) throw new ShopStoreHouseException();
                var number = number || 1;
                if (number < 0) throw  new InvalidValueException("Stock", "no puede ser negativo");
                var posicionTienda = positionShop(shop);

                if (posicionTienda == -1) {
                    throw new ShopNotExistStoreHouseException();
                } else {
                    if (positionProduct(product) != -1) {
                        var posicionProducto = positionProductInShop(product, posicionTienda);
                        if (posicionProducto == -1) {
                            throw new ProductNotExistInShopStoreHouseException();
                        } else {
                            _shops[posicionTienda].product[posicionProducto].stock += number;
                            return _shops[posicionTienda].product[posicionProducto].stock;
                        }

                    } else {
                        throw ProductNotExistStoreHouseException;
                    }

                }
            }

            //metodo para devolver los productos de una tienda y su stock si tambien le pasamos un producto filtra por ese tipo.
            this.getShopProducts = function (shop, product) {
                if (!shop instanceof Shop || shop == null) throw new ShopStoreHouseException();
                var product = product || "undefined";

                var posicionTienda = positionShop(shop);
                if (posicionTienda == -1) {
                    throw new ShopNotExistStoreHouseException();
                } else {
                    var arraProductShop;

                    if (product != "undefined") {
                        arraProductShop = _shops[posicionTienda].product.filter(function (producto) {
                            return _productos.findIndex(function (objeto2) {
                                return (objeto2.serialNumber == producto.product) && (objeto2 instanceof product);
                            }) != -1;
                        })
                    } else {
                        arraProductShop = _shops[posicionTienda].product.filter(function (producto) {
                            return _productos.findIndex(function (objeto2) {
                                return (objeto2.serialNumber == producto.product);
                            }) != -1;
                        })
                    }
                    var arrayADevolver = [];
                    for (var i = 0; i < arraProductShop.length; i++) {
                        arrayADevolver[i] = {
                            product: _productos[_productos.findIndex(function (producto) {
                                return producto.serialNumber == arraProductShop[i].product;
                            })], stock: arraProductShop[i].product
                        }
                    }
                    var nextIndex = 0;

                    return {
                        next: function () {
                            return nextIndex < arrayADevolver.length ?
                                {value: arrayADevolver[nextIndex++], done: false} :
                                {done: true};
                        }
                    }
                }
            }

            //Tienda por defecto.
            var _defaultShop = new Shop("00A", "Shop default");
            //La añadimos a nustra storeHouse.
            this.addShop(_defaultShop);
            Object.defineProperty(this, "defaultShop", {
                get: function () {
                    return _defaultShop
                }
            });
        }

        return new StoreHouse();
    }

    return {
        // Devuelve un objeto con el método getInstance
        getInstance: function () {
            if (!instantiated) { //Si la variable instantiated es undefined, priemera ejecución, ejecuta init.
                instantiated = init(); //instantiated contiene el objeto único
            }
            return instantiated; //Si ya está asignado devuelve la asignación.
        }
    };
})();