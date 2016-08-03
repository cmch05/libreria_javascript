/**
 * Created by Cristian Guerrero on 8/3/2016.
 */
(function (window, document) {
    'user strict';

    var consecutivo = 0;
    _.controlador('contacto', {
        contacto: {},
        contactos: [],

        crear: function (formulario) {
            this.contacto.nombre = formulario.nombre.value;
            this.contacto.correo = formulario.correo.value;
            this.contacto.edad = parseInt(formulario.edad.value, 10); // tmamos el valor y lo parceamos a decimal
            this.contacto.nacimiento = formulario.nacimiento.value;
            this.contacto.recibir = formulario.recibir.checked; // si esta checked o no
            this.contacto.color = formulario.color.value;
            consecutivo += 1;
            this.contacto.identificador = consecutivo;
            this.contactos.push(this.contacto); // agregamos el contacto al array
            this.contacto = {};// limpiamos el arreglo

            alert('contacto creado con el id: ' + consecutivo);
            formulario.reset();


        },
        eliminar: function (id) {
            var i = 0,
                max = this.contactos.length;

            if (confirm("¿Desea eliminar el contacto?")) {
                for (; i < max; i += 1) {
                    if (parseInt(id, 10) === this.contactos[i].identificador) { // el 10 es buena practica al parsear enteros
                        this.contactos.splice(i, 1);// eliminamos solo 1
                        break;
                    }
                }
                this.listar();
            }
        },
        // 1. confirmar la actualizacion
        confirmarActualizar: function (id) {
            var i = 0,
                max = this.contactos.length;
            if (confirm("¿Desea actualizar este contacto?")) {
                for (; i < max; i += 1) {
                    if (parseInt(id, 10) === this.contactos[i].identificador) {
                        this.contacto = this.contactos[i];
                        break;
                    }
                }
                window.location.hash = '/actualizar-contacto';
            }
        },

        // 2. preprarar laactualización
        preparaActualizacion: function () {
            var formulario = _.get('frmActualizar');
            formulario.identificador.value = this.contacto.identificador;
            formulario.nombre.value = this.contacto.nombre;
            formulario.correo.value = this.contacto.correo;
            formulario.edad.value = this.contacto.edad;
            formulario.nacimiento.value = this.contacto.nacimiento;
            formulario.recibir.value = this.contacto.recibir;
            formulario.color.value = this.contacto.color;
        },

        // 3. cuando el usuario da click en actualizar se actualiza el contacto
        actualizar: function (formulario) {
            var i = 0,
                max = this.contactos.length;
            //***********************************************************************************************
            // refactorizar depsues esta funcion ojo
            this.contacto.nombre = formulario.nombre.value;
            this.contacto.correo = formulario.correo.value;
            this.contacto.edad = parseInt(formulario.edad.value, 10); // tmamos el valor y lo parceamos a decimal
            this.contacto.nacimiento = formulario.nacimiento.value;
            this.contacto.recibir = formulario.recibir.checked; // si esta checked o no
            this.contacto.color = formulario.color.value;

            for (; i < max; i += 1) {
                if (this.contacto.identificador === this.contactos[i].identificador) { // el 10 es buena practica al parsear enteros
                    this.contactos.splice(i, 1);// eliminamos solo 1
                    break;
                }
            }

            this.contactos.push(this.contacto);

            this.contacto ={};
            formulario.reset();
            alert('Contacto de :'+formulario.nombre.value + ' actualizado');
            window.location.hash ='#/listar-contactos';
        },

        listar: function () {
            var cuerpo = _.get('cuerpoTabla'),
                template = _.get('fila'),
                fragmento = document.createDocumentFragment(), // permite ir guardando cada uno de los registros antes de enviarlo al cuerpo (eficiencia)
                i = 0,
                max = this.contactos.length,
                registro,
                clon,
                id,
                nombre,
                correo,
                edad,
                nacimiento,
                acepta,
                color,
                acciones, // guarda el td que contiene los controles de las acciones
                eliminar,
                actualizar,
                self = this; // para guardar una referencia al objeto actual

            cuerpo.innerHTML = ''; //limpiamos la tabla
            for (; i < max; i += 1) {
                registro = self.contactos[i];

                clon = template.content.cloneNode(true); // clonamos el tag template
                id = clon.querySelector('.identificador'); // obtenemos el elemento del clon del template
                correo = clon.querySelector('.correo');
                nombre = clon.querySelector('.nombre');
                edad = clon.querySelector('.edad');
                nacimiento = clon.querySelector('.nacimiento');
                acepta = clon.querySelector('.acepta');
                color = clon.querySelector('.color');

                acciones = clon.querySelector('.acciones');
                eliminar = acciones.querySelector('.eliminar');
                actualizar = acciones.querySelector('.actualizar');

                // guardar el data id (agregar data-id al html resultante)
                eliminar.dataset.id = registro.identificador;
                eliminar.addEventListener('click', function (e) {
                    e.preventDefault(); // prevenimos que se realize la accion por defecto del click
                    self.eliminar(e.target.dataset.id); // target  saber cual es el boton especifico // llamamos a self porque el this en este punto se perdio
                }, false);

                // guardar el data id (agregar data-id al html resultante)
                actualizar.dataset.id = registro.identificador;
                actualizar.addEventListener('click', function (e) {
                    e.preventDefault(); // prevenimos que se realize la accion por defecto del click
                    self.confirmarActualizar(e.target.dataset.id); // target  saber cual es el boton especifico // llamamos a self porque el this en este punto se perdio
                }, false);

                // asignar los valores a los elementos clonados con id
                id.textContent = registro.identificador;
                nombre.textContent = registro.nombre;
                correo.textContent = registro.correo;
                edad.textContent = registro.edad;
                nacimiento.textContent = registro.nacimiento;
                acepta.textContent = registro.recibir ? 'si' : 'no';
                color.textContent = registro.color;

                // agregamos el template al fragmento
                fragmento.appendChild(clon);
            }

            cuerpo.appendChild(fragmento);
        }
    });
})(window, document);