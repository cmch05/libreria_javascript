/**
 * Created by Cristian Guerrero on 8/2/2016.
 */

(function (window, document) {

    _.getID('vista').enrutar()
        .ruta('/', 'vistas/inicio.html', null, null)
        .ruta('/crear-contacto', 'vistas/contactos/crear.html', 'contacto', function () {
            // evitar que el formulario haga submit
            _.getID('crearContacto').noSubmit();
        })
        .ruta('/listar-contactos', 'vistas/contactos/listar.html', 'contacto', function () {
            _.getCtrl().listar();
        })
        .ruta('/actualizar-contacto', 'vistas/contactos/actualizar.html', 'contacto', function () {
            _.getID('frmActualizar').noSubmit();
            _.getCtrl().preparaActualizacion();

        });

})(window, document);