/**
 * Created by Cristian Guerrero on 8/2/2016.
 */

(function (window, document) {

    _.getID('vista').enrutar()
        .ruta('/', 'vistas/inicio.html', null, null)
        .ruta('/crear-contacto', 'vistas/contactos/crear.html', null, null)
        .ruta('/listar-contactos', 'vistas/contactos/listar.html', null , null)
        .ruta('/actualizar-contacto', 'vistas/contactos/actualizar', null, null);

})(window, document);