
(function (window, document) {
    'use strict';//
    var inicio = function () {
        var elemento = null,
            marco = null,
            rutas = {},
            controladores = {},
            controlador,
            libreria = {
                getID: function (id) {
                    elemento = document.getElementById(id);
                    return this; // patron cadena
                },
                
                noSubmit: function () {
                    elemento.addEventListener('submit', function (e) {
                        e.preventDefault();
                    }, false);
                    return this;
                },
                
                enrutar: function () {
                    marco = elemento;
                    return this;
                },
                
                ruta: function (ruta, plantilla, controlador, carga) {
                    rutas[ruta] = {
                        'plantilla': plantilla,
                        'controlador': controlador,
                        'carga': carga
                    };
                    return this;
                },
                
                manejadorRutas : function () {
                    // obtener el hash que se encuentra el la URL
                    // ej: http://localhost/#/contacto-crear  obtenemos (/contacto-crear ) con el substring
                    var hash = window.location.hash.substr(1) || '/',
                        destino= rutas[hash],
                        xhr = new XMLHttpRequest();

                    if(destino && destino.plantilla){
                        // nivel 2 (load) reemplaza estado 200
                        xhr.addEventListener('load', function () {
                            marco.innerHTML = this.responseText; // reemplazamos html con la repsuesta de la carga de la peticion xhr
                        }, false);
                        xhr.open('get',destino.plantilla, true); // destino.plantilla es la ruta
                        xhr.send(null);// get no se envia nada
                    }else{
                        window.location.hash = '#/'; // ruta de inicio
                    }


                }
            };
        return libreria;
    }
    if (typeof window.libreria === 'undefined') {
        window.libreria = window._ = inicio(); // libreria asignada una unica vez
        // un escucha para cuando se cargue la pagina
        window.addEventListener('load', _.manejadorRutas, false);
       // escuchar cada vez que cambie el hash de nuestra direccion ej: http://localhost:8080/#/
        // el hashchange solo se ejecuta despues de cargada la pagina
        window.addEventListener('hashchange', _.manejadorRutas, false);
    } else {
        console.log("ya se ha llamado la libreria");
    }
})(window, document);