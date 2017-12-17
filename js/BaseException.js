"use strict";
//Excepción base para ir creando el resto de excepciones.
function BaseException() {
}
BaseException.prototype = new Error(); //Herencia del objeto Error.
BaseException.prototype.constructor = BaseException; //Definimos el constructor
//Sobrescribimos el método toString para personalizarlos
BaseException.prototype.toString = function(){
    // note that name and message are properties of Error
    return this.name + ": " + this.message;
};

//Excepciones de validación de parámetros. Reutilizables en todas las clases
function ParameterValidationException() {
    this.name = "ParameterValidationException";
    this.message = "Error: Parameter Validation Exception.";
}
ParameterValidationException.prototype = new BaseException(); //Heredamos de BaseException
ParameterValidationException.prototype.constructor = ParameterValidationException;

//Excepción personalizada para indicar valores vacios.
function EmptyValueException(param) {
    this.name = "EmptyValueException";
    this.message = "Error: The parameter " + param + " can't be empty.";
}
EmptyValueException.prototype = new ParameterValidationException(); //Heredamos de ParameterValidationException
EmptyValueException.prototype.constructor = EmptyValueException;

//Excepción de valor inválido
function InvalidValueException(param, value) {
    this.name = "InvalidValueException_";
    this.message = "Error: The paramenter " + param + " has an invalid value. (" + param + ": " + value + ")";
}
InvalidValueException.prototype = new ParameterValidationException(); //Heredamos de ParameterValidationException
InvalidValueException.prototype.constructor = InvalidValueException;

//Excepción acceso inválido a constructor
function InvalidAccessConstructorException() {
    this.name = "InvalidAccessConstructorException";
    this.message = "Constructor can’t be called as a function.";
}
InvalidAccessConstructorException.prototype = new BaseException();
InvalidAccessConstructorException.prototype.constructor = InvalidAccessConstructorException;

//Excepción acceso inválido a constructor
function UninstantiatedObjectException(param) {
    this.name = "UninstantiatedObjectException";
    this.message = "You can't instantiate a " + param + " object";
}
UninstantiatedObjectException.prototype = new BaseException();
UninstantiatedObjectException.prototype.constructor = UninstantiatedObjectException;

//Excepción intento de instacia clase abstracta
function AbstractClassException(classValue) {
    this.name = "AbstractClassException";
    this.message = classValue + " is a abstract class.";
}
AbstractClassException.prototype = new BaseException();
AbstractClassException.prototype.constructor = AbstractClassException;

//this exception is thrown if a property of a non-mandatory object is not initialized and is called from some method.
function UninitializedPropertyException (property) {
    this.name = "UninitializedProperty";
    this.message = "You can't uninitialized a " + property + " property";
}
UninitializedPropertyException.prototype = new BaseException();
UninitializedPropertyException.prototype.constructor = UninitializedPropertyException;