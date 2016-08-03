// utilizar el patron IIFE (expresion de funcion inmediatamente invocada)
//tambine se puede encontrar como funcion anonima autoejecutable
/*
(function () {
    //codigo
    alert("saludar");

})();// con esto le decimos que se autoejecute
*/
// IIFE sirve para prevenir el hoisting (variable usada antes de ser declarada )
/*
var x;
x=1;
var optenerValor= function () {
    return x;
}
x= 3;
console.log(optenerValor()); // el resultado nos da 3 a pesar que esta despues de la funcion
*/
// de la siguiente manera prevenimos el hoisting
/*
var x ;
x=1;
var obtenerValor = (function (x) {
    return x;
})(x);
x=3;
console.log(obtenerValor);// no hace falta los parentecis ya que la funcion es autoejecutada
*/
// IIFE tambien sirve para protejer los datos
/*
var miFuncion = (function(){
    var x =0 ;
    var objeto={
        getX: function(){
            return x;
        },
        incrementar : function(){
            x++;
        }
    }
    return objeto;
})();

miFuncion.incrementar();
miFuncion.incrementar();
miFuncion.incrementar();

console.log(miFuncion.getX());
// la x esta protegida
miFuncion.x=8;
console.log(miFuncion.getX());
*/
// evitar que la libreria se cargue varias veces

(function(){
    var x =0 ;
    var objeto={
        getX: function(){
            return x;
        },
        incrementar : function(){
            x++;
            // patrón chain (cadena) // objeto.incrementar().incrementar().incrementar();
            return this;
        }
    };
    // evitar que se reinicie la libreria
    if(typeof window.objeto === 'undefined'){
        window.objeto = window.$ = objeto; // acemos que podemos llamar el objeto desde cualquier otra libreria
    }
    else{
        console.log("ya exisite la libreria");
    }
})();



