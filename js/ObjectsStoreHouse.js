"use strict";
//We define the errors for the Product Object.
function PersonException(){
    this.name = "PersonException";
    this.message = "Error: Person Generic Exception.";
}
PersonException.prototype = new BaseException(); //Heredamos de BaseException.

//We define the Product Object.
var Product = (function() {

    function Product(serial, name, price, description, image) {

    //If the product is not invoked with the new operator, throw a error.
    if (!(this instanceof Product)) throw new InvalidAccessConstructorException();

    //So that the object can not be instantiated, since it is an abstract class.
    if (this.constructor === Product) throw new AbstractClassException("Product");

    //We check that obligatory variables are not empty.
    if (name === "undefined" || name === "") throw new EmptyValueException("name");
    if (price === "undefined" || price === "") throw new EmptyValueException("price");

    //We define the serialNumber variable.
    var _serialNumber = serial;
    //We define the getter for the _serialNumber property, this property does not have the setter method.
    Object.defineProperty(this, "serialNumber", {
        get: function () {
            return _serialNumber;
        }
    });

    //We define the Name property.
    var _name = name;
    //We define the getter and setter for the _name property;
    Object.defineProperty(this, "name", {
        get: function () {
            return _name;
        },
        setter: function (name) {
            if (name === "undefined" || name === "") throw new EmptyValueException("name");
            _name = name;
        }
    });

    //We define the Price property.
    var _price = price;
    //We define the getter and setter for the _price property;
    Object.defineProperty(this, "price", {
        get: function () {
            return _price;
        },
        setter: function (price) {
            if (price === "undefined" || price === "") throw new EmptyValueException("price");
            _price = price;
        }
    });

    //We define the Description property.
    var _description = description;
    //We define the getter and setter for the _description property;
    Object.defineProperty(this, "description", {
        get: function () {
            if (_description === "undefined") throw UninitializedPropertyException("description");
            return _description;
        },
        set: function (description) {
            if (description === "undefined" || description === "") throw new EmptyValueException("description");
            _description = description;
        }
    });
    var _imagen = image;
        //Setter y getter de imagen
        Object.defineProperty(this, 'imagen', {
            get:function(){
                return _imagen;
            },
            set:function(imagen){
                imagen = imagen.trim();
                if (imagen === 'undefined') throw new EmptyValueException("imagen");
                _imagen = imagen;
            }
        });
    }

    return Product;
}());
Product.prototype.toString = function (){
    return this.constructor.name + ": " + this.name;
}
//We define the Ropa Object.
function Clothes(serial, name, price,description, image, gender) {

    //If the Clothes is not invoked with the new operator, throw a error.
    if(!(this instanceof Clothes)) throw new InvalidAccessConstructorException();

    //So that the object can not be instantiated, since it is an abstract class.
    if(this.constructor===Clothes)throw new AbstractClassException("Clothes");

    //We call the super-constructor method.
    Product.call(this,serial, name, price,description, image);

    //We check that obligatory variables are not empty and meet the requirements.
    if(gender==="undefined"||gender==="")throw new EmptyValueException("Gender");

    //We defined the gender property.
    var _gender = gender;
    //We define the getter _size property;
    Object.defineProperty(this, "gender", {
        get: function() {
            return _gender;
        }
    });

}
Clothes.prototype = Object.create(Product.prototype);
Clothes.prototype.constructor=Clothes;
Clothes.prototype.getObject = function(){
    return {
        description: this.description,
        gender: this.gender,
        imagen: this.imagen,
        name: this.name,
        price: this.price,
        serialNumber: this.serialNumber
    };
}
//We define the Pants Object.
function Pants(serial,name, price,description, image, size, gender) {

    //If the Pants is not invoked with the new operator, throw a error.
    if(!(this instanceof Pants)) throw new InvalidAccessConstructorException();

    //We call the super-constructor method.
    Clothes.call(this,serial,name, price,description, image, gender);

    //We check that obligatory variables are not empty and meet the requirements.
    if(size==="undefined"||size==="")throw new EmptyValueException("SerialNumber");
    if(gender==="undefined"||gender==="")throw new EmptyValueException("SerialNumber");
    //We check that the size is valid.
    if(size<32||size>50||size%2!=0)throw new InvalidValueException("size","the size is between 32 and 50 and it must be multiple of 2");

    //We defined the size property.
    var _size = size;
    //We define the getter _size property;
    Object.defineProperty(this, "size", {
        get: function() {
            return _size;
        }
    });

}
Pants.prototype = Object.create(Clothes.prototype);
Pants.prototype.constructor=Pants;

//We define the shoes Object.
function Shoes(serial,name, price,description, image,size, gender) {

    //If the Pants is not invoked with the new operator, throw a error.
    if(!(this instanceof Shoes)) throw new InvalidAccessConstructorException();

    //We call the super-constructor method.
    Clothes.call(this,serial,name, price,description, image, gender);

    //We check that obligatory variables are not empty and meet the requirements.
    if(size==="undefined"||size==="")throw new EmptyValueException("SerialNumber");
    if(gender==="undefined"||gender==="")throw new EmptyValueException("gender");
    //We check that the size is valid.
    if(size<20||size>48)throw new InvalidValueException("size","the size is between 20 and 48");

    //We defined the size property.
    var _size = size;
    //We define the getter _size property;
    Object.defineProperty(this, "size", {
        get: function() {
            return _size;
        }
    });

}
Shoes.prototype = Object.create(Clothes.prototype);
Shoes.prototype.constructor=Shoes;
//We define the camiseta Object.
function Camiseta(serie,name, price,description, image, size, gender) {

    //If the Pants is not invoked with the new operator, throw a error.
    if(!(this instanceof Camiseta)) throw new InvalidAccessConstructorException();

    //We call the super-constructor method.
    Clothes.call(this,serie,name, price,description, image, "Unisex");

    //We check that obligatory variables are not empty and meet the requirements.
    if(size==="undefined"||size==="")throw new EmptyValueException("SerialNumber");
    //We check that the size is valid.
    if(size<20||size>48)throw new InvalidValueException("size","the size is between 20 and 48");
    if(gender==="undefined"||gender==="")throw new EmptyValueException("gender");
    //We defined the size property.
    var _size = size;
    //We define the getter _size property;
    Object.defineProperty(this, "size", {
        get: function() {
            return _size;
        }
    });

}
Camiseta.prototype = Object.create(Clothes.prototype);
Camiseta.prototype.constructor=Camiseta;

//Objeto Categoria donde se almacena un titulo para esta y una descripción.
function Category(title = "Anon"){
    //La función se invoca con el operador new
    if (!(this instanceof Category)) throw new InvalidAccessConstructorException();

    title = title.trim();
    if (title === 'undefined' || title === 'Anon') throw new EmptyValueException("title");

    var _title = title;
    var _description = "";

    Object.defineProperty(this, 'title', {
        get:function(){
            return _title;
        },
        set:function(title = "Anonimous"){
            title = title.trim();
            if (title === 'undefined' || title === 'Anon') throw new EmptyValueException("title");
            _title = title;
        }
    });

    Object.defineProperty(this, 'description', {
        get:function(){
            return _description;
        },
        set:function(value){
            if (value === 'undefined') throw new EmptyValueException("description");
            _description = value;
        }
    });

}
Category.prototype = {};
Category.prototype.constructor = Category;
Category.prototype.toString = function (){
    return "Category: " + this.title + " (" + this.description + ")";
}
Category.prototype.getObject = function(){
    return {
        title: this.title,
        description: this.description
    };
}
//Objeto tienda:
function Shop(nif, name) {

    if (!(this instanceof Shop)) throw new InvalidAccessConstructorException();
    if (nif === 'undefined') throw new EmptyValueException("nif");
    if (name === 'undefined') throw new EmptyValueException("name");

    //Definimos las propiedades de nuestra tienda
    var _nif = nif;
    var _name = name;
    var _telefono;
    var _direccion;
    var _imagen;
    var _coordenadas;
    var _descripcion;

    //Setter y getter de nif
    Object.defineProperty(this, 'descripcion', {
        get:function(){
            return _descripcion;
        },
        set:function(descripcion){
            descripcion = descripcion.trim();
            if (descripcion === 'undefined') throw new EmptyValueException("descripcion");
            _descripcion = descripcion;
        }
    });

    //Setter y getter de nif
    Object.defineProperty(this, 'nif', {
        get:function(){
            return _nif;
        },
        set:function(nif){
            nif = nif.trim();
            if (nif === 'undefined') throw new EmptyValueException("nif");
            _nif = nif;
        }
    });

    //Setter y getter de name
    Object.defineProperty(this, 'name', {
        get:function(){
            return _name;
        },
        set:function(name){
            name = name.trim();
            if (name === 'undefined') throw new EmptyValueException("name");
            _name = name;
        }
    });

    //Setter y getter de telefono
    Object.defineProperty(this, 'telefono', {
        get:function(){
            return _telefono;
        },
        set:function(telefono){
            console.log(typeof telefono);
            //telefono = telefono.trim();
            if (telefono === 'undefined') throw new EmptyValueException("telefono");
            _telefono = telefono;
        }
    });

    //Setter y getter de direccion
    Object.defineProperty(this, 'direccion', {
        get:function(){
            return _direccion;
        },
        set:function(direccion){
            direccion = direccion.trim();
            if (direccion === 'undefined') throw new EmptyValueException("direccion");
            _direccion = direccion;
        }
    });

    //Setter y getter de coordenadas
    Object.defineProperty(this, 'coordenadas', {
        get:function(){
            return _coordenadas;
        },
        set:function(coordenadas){
            if (coordenadas === 'undefined') throw new EmptyValueException("coordenadas");
            _coordenadas = coordenadas;
        }
    });

    //Setter y getter de imagen
    Object.defineProperty(this, 'imagen', {
        get:function(){
            return _imagen;
        },
        set:function(imagen){

            if(imagen != undefined){
                imagen = imagen.trim();
            }
            if (imagen === 'undefined') throw new EmptyValueException("imagen");
            _imagen = imagen;
        }
    });

}
Shop.prototype = {};
Shop.prototype.constructor = Shop;
Shop.prototype.toString = function (){
    return "Shop: " + this.nif + " (" + this.name+ ")";
}
Shop.prototype.getObject = function(){
    return {
        nif: this.nif,
        coordenadas: this.coordenadas.getObject(),
        descripcion: this.descripcion,
        direccion: this.direccion,
        imagen: this.imagen,
        name: this.name
    };
}


// Objeto Coords para definir coordenadas.
function Coords(latitude = 0, longitude = 0){
    //La función se invoca con el operador new
    if (!(this instanceof Coords))
        throw new InvalidAccessConstructorException();

    latitude = typeof latitude !== 'undefined' ? Number(latitude).valueOf() : 0;
    if (Number.isNaN(latitude)  || latitude < -90 || latitude > 90)
        throw new InvalidValueException("latitude", latitude);
    longitude = typeof longitude !== 'undefined' ? Number(longitude).valueOf() : 0;
    if (Number.isNaN(longitude)  || longitude < -180 || longitude > 180)
        throw new InvalidValueException("longitude", longitude);

    var _latitude = latitude;
    var _longitude = longitude;

    Object.defineProperty(this, 'latitude', {
        get:function(){
            return _latitude;
        },
        set:function(value){
            value = typeof value !== 'undefined' ? Number(value).valueOf() : 0;
            if (Number.isNaN(value)  || value < -90 || value > 90)
                throw new InvalidValueException("latitude", value);
            _latitude = value;
        }
    });

    Object.defineProperty(this, 'longitude', {
        get:function(){
            return _longitude;
        },
        set:function(value){
            value = typeof value !== 'undefined' ? Number(value).valueOf() : 0;
            if (Number.isNaN(value)  || value < -180 || value > 180)
                throw new InvalidValueException("latitude", value);
            _longitude = value;
        }
    });
}
Coords.prototype.getObject = function(){
    return {
        latitude: this.latitude,
        longitude: this.longitude
    };
}






















